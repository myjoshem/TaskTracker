import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks'; // Adjust to your backend
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks = this.tasksSubject.asObservable(); // Observable for components to subscribe to

  constructor(private http: HttpClient) {}

  // Fetch all tasks and update the BehaviorSubject
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap((tasks) => this.tasksSubject.next(tasks)),
      catchError((error) => {
        console.error('Error fetching tasks:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  // Get a single task by ID
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  // Add a task and refresh the BehaviorSubject
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(() => this.refreshTasks()) // Refresh tasks after adding
    );
  }

  // Update a task and refresh the BehaviorSubject
  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(
      tap(() => this.refreshTasks()) // Refresh tasks after updating
    );
  }

  // Delete a task and refresh the BehaviorSubject
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.refreshTasks()) // Refresh tasks after deleting
    );
  }

  // Helper method to refresh the tasks
  private refreshTasks(): void {
    this.getTasks().subscribe();
  }
}
