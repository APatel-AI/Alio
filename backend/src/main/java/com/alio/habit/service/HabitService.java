package com.alio.habit.service;

import com.alio.habit.model.Habit;
import com.alio.habit.repository.HabitRepository;
import com.alio.habit.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

@Service
public class HabitService {
    @Autowired
    private HabitRepository habitRepository;
    
    public Habit createHabit(Habit habit) {
        habit.setCreatedAt(LocalDateTime.now());
        habit.setCurrentStreak(0);
        habit.setLongestStreak(0);
        return habitRepository.save(habit);
    }
    
    public List<Habit> getAllHabits() {
        return habitRepository.findByOrderByPriorityDescCreatedAtDesc();
    }
    
    public void toggleHabitCompletion(Long habitId, LocalDate date) {
        Habit habit = habitRepository.findById(habitId)
            .orElseThrow(() -> new ResourceNotFoundException("Habit not found"));
        
        List<LocalDate> completedDates = habit.getCompletedDates();
        if (completedDates.contains(date)) {
            completedDates.remove(date);
            updateStreakOnRemoval(habit, date);
        } else {
            completedDates.add(date);
            updateStreakOnCompletion(habit, date);
        }
        
        habitRepository.save(habit);
    }
    
    private void updateStreakOnCompletion(Habit habit, LocalDate date) {
        LocalDate lastCompleted = habit.getLastCompletedDate();
        if (lastCompleted == null || date.minusDays(1).equals(lastCompleted)) {
            habit.setCurrentStreak(habit.getCurrentStreak() + 1);
        } else if (date.isAfter(lastCompleted)) {
            habit.setCurrentStreak(1);
        }
        
        if (habit.getCurrentStreak() > habit.getLongestStreak()) {
            habit.setLongestStreak(habit.getCurrentStreak());
        }
        
        habit.setLastCompletedDate(date);
    }
    
    private void updateStreakOnRemoval(Habit habit, LocalDate date) {
        if (date.equals(habit.getLastCompletedDate())) {
            LocalDate newLastCompleted = habit.getCompletedDates().stream()
                .filter(d -> d.isBefore(date))
                .max(LocalDate::compareTo)
                .orElse(null);
            
            habit.setLastCompletedDate(newLastCompleted);
            if (newLastCompleted == null) {
                habit.setCurrentStreak(0);
            } else {
                calculateCurrentStreak(habit);
            }
        }
    }
    
    private void calculateCurrentStreak(Habit habit) {
        LocalDate lastDate = habit.getLastCompletedDate();
        if (lastDate == null) {
            habit.setCurrentStreak(0);
            return;
        }
        
        int streak = 1;
        LocalDate currentDate = lastDate.minusDays(1);
        
        while (habit.getCompletedDates().contains(currentDate)) {
            streak++;
            currentDate = currentDate.minusDays(1);
        }
        
        habit.setCurrentStreak(streak);
    }
}