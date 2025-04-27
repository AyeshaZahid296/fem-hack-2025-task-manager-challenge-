// src/components/TaskBoard.jsx

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';

const initialTasks = {
    todo: [],
    inProgress: [],
    done: []
};

const TaskBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceCol = source.droppableId;
        const destCol = destination.droppableId;

        const sourceTasks = [...tasks[sourceCol]];
        const destTasks = [...tasks[destCol]];
        const [movedTask] = sourceTasks.splice(source.index, 1);

        destTasks.splice(destination.index, 0, movedTask);

        setTasks(prev => ({
            ...prev,
            [sourceCol]: sourceTasks,
            [destCol]: destTasks
        }));
    };

    const handleAddTask = (newTask) => {
        const id = Date.now().toString();
        const taskWithId = { id, ...newTask };
        setTasks(prev => ({
            ...prev,
            todo: [...prev.todo, taskWithId]
        }));
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
                    {['todo', 'inProgress', 'done'].map((columnId) => (
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="bg-white rounded-2xl p-4 shadow-md min-h-[500px] flex flex-col"
                                >
                                    <h2 className="text-xl font-semibold text-gray-600 mb-4 capitalize">
                                        {columnId === 'todo' ? 'To Do' : columnId === 'inProgress' ? 'In Progress' : 'Done'}
                                    </h2>
                                    {tasks[columnId].map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <TaskCard task={task} />
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

            {/* Modal for adding new task */}
            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddTask}
            />
        </div>
    );
};

export default TaskBoard;
