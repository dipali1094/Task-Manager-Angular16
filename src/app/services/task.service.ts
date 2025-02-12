import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  addTask(title: string): Observable<Task> {
    const newTask: Task = {
      id: this.nextId++,
      title,
      completed: false,
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    return of(newTask);
  }

  toggleTask(task: Task): Observable<Task> {
    const taskToUpdate = this.tasks.find(t => t.id === task.id);
    if (taskToUpdate) {
      taskToUpdate.completed = !taskToUpdate.completed;
    }
    return of(taskToUpdate || task);
  }

  deleteTask(task: Task): Observable<void> {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    return of(void 0);
  }
} 