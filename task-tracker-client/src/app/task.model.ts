export interface Task {
  _id?: string; // MongoDB _id (optional because it won't exist when creating a task)
  title: string; // Required
  description?: string; // Optional
  status: 'Pending' | 'Completed'; // Enum for task status
  dueDate: Date | null; // Can be null for tasks without a due date
  createdAt?: Date; // Optional timestamps from the backend
  updatedAt?: Date; // Optional timestamps from the backend
}
