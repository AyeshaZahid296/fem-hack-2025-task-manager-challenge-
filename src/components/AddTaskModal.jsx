import React, { useState } from 'react';

const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onAdd({ title, description, assignedTo });  // Pass assignedTo along with title and description
            setTitle('');
            setDescription('');
            setAssignedTo('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-80 shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Add New Task</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Task Title"
                        className="p-2 border rounded-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Task Description"
                        className="p-2 border rounded-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Assigned To"
                        className="p-2 border rounded-lg"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                    />
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Task</button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
