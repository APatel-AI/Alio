import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Plus, Check, X } from 'lucide-react';

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const response = await axios.get('http://localhost:8080/api/habits');
    setHabits(response.data);
  };

  const createHabit = async (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    
    await axios.post('http://localhost:8080/api/habits', {
      name: newHabit,
      createdAt: new Date().toISOString()
    });
    
    setNewHabit('');
    fetchHabits();
  };

  const toggleHabit = async (habitId, date) => {
    await axios.post(`http://localhost:8080/api/habits/${habitId}/toggle?date=${date}`);
    fetchHabits();
  };

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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Alio</h1>
        
        <form onSubmit={createHabit} className="mb-8 flex gap-4">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="New habit..."
            className="flex-1 bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-500 rounded px-4 py-2 hover:bg-blue-600">
            <Plus size={20} />
          </button>
        </form>

        <div className="space-y-4">
          {habits.map(habit => (
            <div key={habit.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">{habit.name}</h3>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {getDatesForLastWeek().map(date => {
                  const isCompleted = habit.completedDates?.some(d => d === date);
                  return (
                    <button
                      key={date}
                      onClick={() => toggleHabit(habit.id, date)}
                      className={`p-2 rounded flex items-center justify-center
                        ${isCompleted ? 'bg-green-500' : 'bg-gray-700'}`}
                    >
                      {isCompleted ? <Check size={16} /> : <X size={16} />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitList;