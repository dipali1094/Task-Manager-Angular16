import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <div class="logo-container">
        <img 
          [src]="currentLogoUrl" 
          alt="Task Manager Logo"
          class="logo"
          (error)="handleImageError()"
        >
      </div>
      
      <h1>Welcome to Task Manager</h1>
      
      <div *ngIf="!authService.isAuthenticated()" class="auth-buttons">
        <button routerLink="/login">Login</button>
        <button routerLink="/register">Register</button>
      </div>

      <div *ngIf="authService.isAuthenticated()" class="user-info">
        <p>Welcome back!</p>
        <button routerLink="/tasks" class="primary-button">Manage Tasks</button>
        <button (click)="authService.logout()" class="logout-button">Logout</button>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
      text-align: center;
    }
    .logo-container {
      margin-bottom: 2rem;
    }
    .logo {
      max-width: 200px;
      height: auto;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .logo:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    .auth-buttons {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .user-info {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .primary-button {
      background-color: #28a745;
    }
    .primary-button:hover {
      background-color: #218838;
    }
    .logout-button {
      background-color: #dc3545;
    }
    .logout-button:hover {
      background-color: #c82333;
    }
  `]
})
export class HomeComponent implements OnInit {
  private logos = [
    'https://picsum.photos/200',
    'https://picsum.photos/200/200',
    'https://source.unsplash.com/random/200x200',
    'https://placehold.co/200x200'
  ];
  currentLogoUrl = '';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.setRandomLogo();
  }

  setRandomLogo() {
    const randomIndex = Math.floor(Math.random() * this.logos.length);
    this.currentLogoUrl = this.logos[randomIndex];
  }

  handleImageError() {
    // If current image fails, try another random one
    const currentIndex = this.logos.indexOf(this.currentLogoUrl);
    const remainingLogos = this.logos.filter((_, index) => index !== currentIndex);
    
    if (remainingLogos.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingLogos.length);
      this.currentLogoUrl = remainingLogos[randomIndex];
    } else {
      // If all images fail, use a reliable placeholder
      this.currentLogoUrl = 'https://placehold.co/200x200/007bff/ffffff?text=TM';
    }
  }
} 