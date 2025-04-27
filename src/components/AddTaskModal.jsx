// src/components/AddTaskModal.jsx

import React, { useState } from 'react';

const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onAdd({ title, description });
            setTitle('');
            setDescription('');
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
                        placeholder="Title"
                        className="p-2 border rounded-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="p-2 border rounded-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 py-1 px-4 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded-lg">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
