import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from "firebase/firestore";

const TaskBoard = () => {
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch tasks from Firestore
    useEffect(() => {
        const fetchTasks = async () => {
            const querySnapshot = await getDocs(collection(db, "Tasks"));
            let newTasks = { todo: [], inProgress: [], done: [] };
            querySnapshot.forEach((doc) => {
                const task = doc.data();
                newTasks[task.status].push({ id: doc.id, ...task });
            });
            setTasks(newTasks);
        };
        fetchTasks();
    }, []);

    // Handle task movement between columns
    const handleDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceCol = source.droppableId;
        const destCol = destination.droppableId;

        const sourceTasks = [...tasks[sourceCol]];
        const destTasks = [...tasks[destCol]];
        const [movedTask] = sourceTasks.splice(source.index, 1);

        destTasks.splice(destination.index, 0, movedTask);

        setTasks((prev) => ({
            ...prev,
            [sourceCol]: sourceTasks,
            [destCol]: destTasks,
        }));

        // Update Firestore with the new task status
        const taskRef = doc(db, "Tasks", movedTask.id);
        await updateDoc(taskRef, { status: destCol });
    };

    // Add new task to Firestore
    const handleAddTask = async (newTask) => {
        try {
            const taskWithStatus = { ...newTask, status: "todo", assignedTo: newTask.assignedTo || "Unassigned" }; // Added assignedTo

            // Add task to Firestore
            const docRef = await addDoc(collection(db, "Tasks"), taskWithStatus);

            // After adding the task, update the state to reflect the new task
            setTasks((prev) => ({
                ...prev,
                todo: [...prev.todo, { id: docRef.id, ...taskWithStatus }],
            }));
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Edit task logic
    const handleEditTask = async (taskId) => {
        const updatedTitle = prompt("Enter new title:");
        const updatedDescription = prompt("Enter new description:");

        if (updatedTitle && updatedDescription) {
            const taskRef = doc(db, "Tasks", taskId);
            await updateDoc(taskRef, {
                title: updatedTitle,
                description: updatedDescription,
            });

            // Update task in state
            setTasks((prev) => {
                const updatedTasks = { ...prev };
                Object.keys(updatedTasks).forEach((status) => {
                    updatedTasks[status] = updatedTasks[status].map((task) =>
                        task.id === taskId
                            ? { ...task, title: updatedTitle, description: updatedDescription }
                            : task
                    );
                });
                return updatedTasks;
            });
        }
    };

    // Delete task logic
    const handleDeleteTask = async (taskId) => {
        const taskRef = doc(db, "Tasks", taskId);
        await deleteDoc(taskRef);

        setTasks((prev) => {
            const updatedTasks = { ...prev };
            Object.keys(updatedTasks).forEach((status) => {
                updatedTasks[status] = updatedTasks[status].filter(
                    (task) => task.id !== taskId
                );
            });
            return updatedTasks;
        });
    };

    return (
        <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-700">Task Tracker</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
                >
                    + Add Task
                </button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["todo", "inProgress", "done"].map((columnId) => (
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="bg-white rounded-2xl p-4 shadow-md min-h-[500px] flex flex-col"
                                >
                                    <h2 className="text-xl font-semibold text-gray-600 mb-4 capitalize">
                                        {columnId === "todo"
                                            ? "To Do"
                                            : columnId === "inProgress"
                                                ? "In Progress"
                                                : "Done"}
                                    </h2>
                                    {tasks[columnId].map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TaskCard
                                                        task={task}
                                                        onEdit={handleEditTask}
                                                        onDelete={handleDeleteTask}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddTask}
            />
        </div>
    );
};

export default TaskBoard;
