import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import for *ngIf, *ngFor
import { Task } from '../task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import necessary modules
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup; // Reactive form
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form group
    this.taskForm = this.fb.group({
      _id: [null], // Hidden ID field for edit mode
      title: ['', Validators.required],
      description: [''],
      status: ['Pending'],
      dueDate: [null],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadTask(id); // Use loadTask() for consistency
    }
  }

  loadTask(id: string): void {
    this.taskService.getTaskById(id).subscribe({
      next: (data: Task) => {
        this.taskForm.patchValue({
          _id: data._id,
          title: data.title,
          description: data.description,
          status: data.status,
          dueDate: data.dueDate
            ? new Date(data.dueDate).toISOString().split('T')[0]
            : null,
        });
      },
      error: (err) => console.error('Error fetching task:', err),
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const taskData = this.taskForm.value;
    if (this.isEdit && taskData._id) {
      // Update task
      this.taskService.updateTask(taskData._id, taskData).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      // Add new task
      this.taskService.addTask(taskData).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']); // Navigate back to the task list
  }
}
