// src/components/HabitCard.jsx
import React from 'react';
import { format, isToday } from 'date-fns';
import { Check, X, Flame, Clock, Tag, BarChart } from 'lucide-react';

const HabitCard = ({ habit, onToggle }) => {
  const getDatesForLastWeek = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(format(date, 'yyyy-MM-dd'));
    }
    return dates;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-medium">{habit.name}</h3>
          {habit.description && (
            <p className="text-gray-400 mt-1">{habit.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {habit.currentStreak > 0 && (
            <div className="flex items-center space-x-1">
              <Flame className="text-orange-500" size={20} />
              <span>{habit.currentStreak}</span>
            </div>
          )}
          {habit.category && (
            <div className="bg-gray-700 px-2 py-1 rounded text-sm">
              {habit.category}
            </div>
          )}
          {habit.reminderTime && (
            <div className="flex items-center space-x-1 text-gray-400">
              <Clock size={16} />
              <span>{habit.reminderTime}</span>
            </div>
          )}
        </div>
      </div>

      {habit.tags && habit.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {habit.tags.map(tag => (
            <div key={tag} className="flex items-center space-x-1 text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
              <Tag size={14} />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-7 gap-2">
        {getDatesForLastWeek().map(date => {
          const isCompleted = habit.completedDates?.includes(date);
          return (
            <button
              key={date}
              onClick={() => onToggle(habit.id, date)}
              className={`p-3 rounded flex flex-col items-center justify-center transition-colors
                ${isCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}
                ${isToday(new Date(date)) ? 'ring-2 ring-blue-500' : ''}`}
            >
              <span className="text-xs mb-1">{format(new Date(date), 'EEE')}</span>
              {isCompleted ? <Check size={16} /> : <X size={16} />}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
        {habit.longestStreak > 0 && (
          <div className="flex items-center">
            <BarChart size={14} className="mr-1" />
            Longest streak: {habit.longestStreak} days
          </div>
        )}
        
        {habit.triggerHabit && (
          <div className="flex items-center">
            <span className="mr-1">→</span>
            Triggered by: {habit.triggerHabit.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitCard;