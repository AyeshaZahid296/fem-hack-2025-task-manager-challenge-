import React from "react";

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <div className="bg-gradient-to-r from-pink-100 to-indigo-100 p-4 rounded-xl mb-4 shadow hover:shadow-lg transition">
            {/* Task Title */}
            <h3 className="text-lg font-bold text-gray-700">{task.title}</h3>

            {/* Task Description */}
            <p className="text-sm text-gray-500">{task.description}</p>

            {/* Assigned User */}
            {task.assignedTo && (
                <p className="mt-2 text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
            )}

            {/* Task Status */}
            <div className="mt-2">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-white text-sm ${task.status === 'todo' ? 'bg-gray-400' :
                            task.status === 'inProgress' ? 'bg-yellow-500' :
                                'bg-green-500'
                        }`}
                >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
            </div>

            {/* Due Date */}
            {task.dueDate && (
                <p className="mt-2 text-sm text-gray-600">Due: {task.dueDate}</p>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between">
                {/* Edit Button */}
                <button
                    onClick={() => onEdit(task.id)} // Trigger onEdit function
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Edit
                </button>

                {/* Delete Button */}
                <button
                    onClick={() => onDelete(task.id)} // Trigger onDelete function
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
