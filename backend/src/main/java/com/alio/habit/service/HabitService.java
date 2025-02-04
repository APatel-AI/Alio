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
        return habitRepository.save(habit);
    }
    
    public List<Habit> getAllHabits() {
        return habitRepository.findByOrderByCreatedAtDesc();
    }
    
    public void toggleHabitCompletion(Long habitId, LocalDate date) {
        Habit habit = habitRepository.findById(habitId)
            .orElseThrow(() -> new ResourceNotFoundException("Habit not found"));
        
        List<LocalDate> completedDates = habit.getCompletedDates();
        if (completedDates.contains(date)) {
            completedDates.remove(date);
        } else {
            completedDates.add(date);
        }
        
        habitRepository.save(habit);
    }
}
