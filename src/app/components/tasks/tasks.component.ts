import { Component } from '@angular/core';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  date: Date;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [
    { id: 1, title: 'Complete project documentation', completed: false, date: new Date() },
    { id: 2, title: 'Review pull requests', completed: true, date: new Date() },
    { id: 3, title: 'Fix bug in login flow', completed: false, date: new Date() }
  ];

  newTask: string = '';

  addTask() {
    if (this.newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        title: this.newTask,
        completed: false,
        date: new Date()
      };
      this.tasks.unshift(task);
      this.newTask = '';
    }
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }
} 