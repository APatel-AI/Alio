package com.alio.habit.repository;

import com.alio.habit.model.Habit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HabitRepository extends JpaRepository<Habit, Long> {
    List<Habit> findByOrderByPriorityDescCreatedAtDesc();
    List<Habit> findByTriggerHabitId(Long triggerId);
    List<Habit> findByCategory(String category);
}