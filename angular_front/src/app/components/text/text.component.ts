import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import axios from 'axios';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule], // ✅ Add CommonModule here
  templateUrl: './text.component.html'
})
export class TextComponent implements OnInit {
  isSubscribed: boolean = false;
  userInfo: any = null;
  userName: string = '';
  email: string = '';
  subscriptionExpiresAt: string = '';

  async ngOnInit(): Promise<void> {
    await this.fetchUserInfo();
  }

  async fetchUserInfo(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/auth/user-info', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        this.userInfo = response.data.user;
        this.userName = this.userInfo.name;
        this.email = this.userInfo.email;
        this.isSubscribed = this.userInfo.subscribed;
        this.subscriptionExpiresAt = this.userInfo.subscriptionExpiresAt;
        console.log('User info:', this.userInfo);
      }
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  }
}
