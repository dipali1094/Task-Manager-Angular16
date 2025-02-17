import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Manager';
  tasks: Task[] = [];
  newTask: string = '';

  constructor(public authService: AuthService) {}

  addTask() {
    if (this.newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        title: this.newTask,
        completed: false
      };
      this.tasks.push(task);
      this.newTask = '';
    }
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  logout() {
    this.authService.logout();
  }
}
