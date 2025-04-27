// src/components/TaskCard.jsx

import React from 'react';

const TaskCard = ({ task }) => {
    return (
        <div className="bg-gradient-to-r from-pink-100 to-indigo-100 p-4 rounded-xl mb-4 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-gray-700">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.description}</p>
        </div>
    );
};

export default TaskCard;
