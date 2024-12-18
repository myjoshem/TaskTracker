import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the BehaviorSubject for real-time updates
    this.taskService.tasks.subscribe((data: Task[]) => {
      this.tasks = data;
    });

    // Trigger an initial load of tasks from the server
    this.taskService.getTasks().subscribe({
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }

  navigateToAddTask(): void {
    this.router.navigate(['/task/new']).then((success) => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation failed');
      }
    });
  }

  /* addTask(): void {
    this.router.navigate(['/task/new']);
  } */

  editTask(id: string): void {
    this.router.navigate(['/task/edit', id]);
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => console.log(`Task with id ${id} deleted successfully.`),
      error: (err) => console.error('Error deleting task:', err),
    });
  }
}
