// src/components/HabitForm.jsx
import React, { useState } from 'react';

const initialFormState = {
  name: '',
  description: '',
  category: '',
  priority: 1,
  tags: '',
  reminderTime: '',
  triggerHabitId: ''
};

const HabitForm = ({ onSubmit, onCancel, existingHabits }) => {
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      triggerHabitId: formData.triggerHabitId || null
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Habit name"
          className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          rows="2"
        />

        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Priority</label>
            <input
              type="number"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              min="1"
              max="5"
              className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Reminder Time</label>
            <input
              type="time"
              name="reminderTime"
              value={formData.reminderTime}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-400 mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="health, morning, important"
            className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {existingHabits.length > 0 && (
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Trigger Habit</label>
            <select
              name="triggerHabitId"
              value={formData.triggerHabitId}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">None</option>
              {existingHabits.map(habit => (
                <option key={habit.id} value={habit.id}>{habit.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create Habit
        </button>
      </div>
    </form>
  );
};

export default HabitForm;