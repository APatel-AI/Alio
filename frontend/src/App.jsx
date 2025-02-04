import React from 'react';
import HabitList from './components/HabitList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Habit Tracker</h1>
        </div>
      </header>
      <main>
        <HabitList />
      </main>
    </div>
  );
}

export default App; 