// src/components/HabitList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, isToday } from 'date-fns';
import { Plus} from 'lucide-react';
import HabitForm from './HabitForm';
import HabitCard from './HabitCard';
import { toast } from 'react-hot-toast';

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8080/api/habits');
      setHabits(response.data);
    } catch (error) {
      toast.error('Failed to fetch habits');
      console.error('Error fetching habits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleHabit = async (habitId, date) => {
    try {
      await axios.post(`http://localhost:8080/api/habits/${habitId}/toggle?date=${date}`);
      fetchHabits();
      toast.success('Habit updated');
    } catch (error) {
      toast.error('Failed to update habit');
      console.error('Error toggling habit:', error);
    }
  };

  const handleCreateHabit = async (habitData) => {
    try {
      await axios.post('http://localhost:8080/api/habits', {
        ...habitData,
        createdAt: new Date().toISOString()
      });
      setShowForm(false);
      fetchHabits();
      toast.success('Habit created successfully');
    } catch (error) {
      toast.error('Failed to create habit');
      console.error('Error creating habit:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Alio</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 rounded-full p-2 hover:bg-blue-600 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        {showForm && (
          <HabitForm
            onSubmit={handleCreateHabit}
            onCancel={() => setShowForm(false)}
            existingHabits={habits}
          />
        )}

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : habits.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No habits yet. Click the + button to create one!
          </div>
        ) : (
          <div className="space-y-4">
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={toggleHabit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitList;