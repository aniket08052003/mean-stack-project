import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';

  showPassword = false;
  errorMessage = '';

  constructor(
    private router: Router
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {

    this.errorMessage = '';

    // Admin credentials
    const adminUsername = 'admin';
    const adminPassword = '12345678';

    if (
      this.username.trim() === adminUsername &&
      this.password === adminPassword
    ) {

      // Login successful
      localStorage.setItem('adminLoggedIn', 'true');

      // Redirect to admin page
      this.router.navigate(['/admin']);

    } else {

      // Login failed
      this.errorMessage = 'Invalid username or password.';
    }
  }
}
