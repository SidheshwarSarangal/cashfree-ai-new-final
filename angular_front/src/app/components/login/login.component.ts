import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // ✅ Required for [(ngModel)]
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Required for *ngIf, ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginModalComponent {
  @Output() close = new EventEmitter<void>(); // ✅ Event to close modal
  @Output() loggedIn = new EventEmitter<boolean>(); // ✅ Notify TopBarComponent on login success

  isSignup = false;
  otpSent = false;
  email = '';
  name = '';
  password = '';
  confirmPassword = '';
  otp = '';
  otpVerified = false;


  constructor(private http: HttpClient) { }

  toggleForm() {
    this.isSignup = !this.isSignup;

    // Reset all variables to initial state
    this.otpSent = false;
    this.otpVerified = false;
    this.email = '';
    this.name = '';
    this.password = '';
    this.confirmPassword = '';
    this.otp = '';
  }


  closeModal() {
    this.isSignup = false;
    this.otpSent = false;
    this.close.emit(); // ✅ Ensures the parent component closes the modal
  }



  sendOtp() {
    if (!this.email) {
      alert("Please enter your email.");
      return;
    }

    this.http.post('http://localhost:5000/api/otp/request-otp', { email: this.email }).subscribe(
      (response: any) => {
        if (response.success) {
          alert("OTP sent successfully!");
          this.otpSent = true;
        } else {
          alert("Failed to send OTP.");
        }
      },
      error => {
        alert("Error sending OTP.");
      }
    );
  }

  verifyOtp() {
    if (!this.otp) {
      alert("Please enter the OTP.");
      return;
    }
  
    this.http.post('http://localhost:5000/api/otp/verify-otp', { email: this.email, otp: this.otp }).subscribe(
      (response: any) => {
        if (response.success) {
          alert("OTP verified. You can now set your password.");
          this.otpVerified = true;
          this.otpSent = false;
        }
      },
      (error) => {
        // Check if the server sent a specific error message
        if (error.status === 400 && error.error && error.error.error) {
          alert(error.error.error);  // Display backend error message (e.g., "Invalid OTP")
        } else {
          alert("Error verifying OTP. Please try again.");
        }
      }
    );
  }
  

  async signup() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert("All fields are required.");
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (!passwordRegex.test(this.password)) {
      alert("Password must contain at least one letter and one digit.");
      return;
    }
  
    try {
      const response: any = await lastValueFrom(this.http.post('http://localhost:5000/api/auth/signup', {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }));
  
      if (response.success) {
        alert("Signup successful! You can now log in.");
        this.toggleForm(); // Reset form & switch to login
      } else {
        alert(response.message || "Signup failed.");
      }
    } catch (error: any) {
      if (error.status === 400 && error.error && error.error.message) {
        alert(error.error.message); // Show backend error message
      } else {
        alert("Error during signup.");
      }
    }
  }

  async login() {
    if (!this.email || !this.password) {
      alert("Please enter your email and password.");
      return;
    }
  
    try {
      const response: any = await lastValueFrom(this.http.post('http://localhost:5000/api/auth/login', {
        email: this.email,
        password: this.password
      }));
  
      if (response.success) {
        localStorage.setItem('token', response.token); // ✅ Store token
        alert("Login successful!");
        this.loggedIn.emit(true); // ✅ Notify TopBarComponent
        this.closeModal(); // ✅ Close modal
      } else {
        alert(response.message || "Login failed.");
      }
    } catch (error: any) {
      alert(error.error?.message || "Error during login.");
    }
  }
  

}
