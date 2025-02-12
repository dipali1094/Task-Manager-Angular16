import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private router: Router) {
    // Check if user was previously logged in
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  login(email: string, password: string): boolean {
    // This is a mock login - in real app, you'd validate against a backend
    if (email && password) {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  register(email: string, password: string): boolean {
    // This is a mock registration - in real app, you'd call a backend API
    if (email && password) {
      return true;
    }
    return false;
  }
} 