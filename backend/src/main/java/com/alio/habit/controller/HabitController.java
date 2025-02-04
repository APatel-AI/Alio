package com.alio.habit.controller;

import com.alio.habit.model.Habit;
import com.alio.habit.service.HabitService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "http://localhost:3000")
public class HabitController {
    @Autowired
    private HabitService habitService;
    
    @PostMapping
    public ResponseEntity<Habit> createHabit(@Valid @RequestBody Habit habit) {
        return ResponseEntity.ok(habitService.createHabit(habit));
    }
    
    @GetMapping
    public ResponseEntity<List<Habit>> getAllHabits() {
        return ResponseEntity.ok(habitService.getAllHabits());
    }
    
    @PostMapping("/{id}/toggle")
    public ResponseEntity<Void> toggleHabit(
        @PathVariable Long id,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        habitService.toggleHabitCompletion(id, date);
        return ResponseEntity.ok().build();
    }
}