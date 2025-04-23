import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image.component.html',
})
export class ImageComponent implements OnInit {
  isSubscribed: boolean = true; // for testing, set to true
  userInfo: any = null;
  userName: string = '';
  email: string = '';
  subscriptionExpiresAt: string = '';
  translatedText: string = '';
  imagePreviewUrl: string | null = null;

  constructor(private cdr: ChangeDetectorRef) { }

  async ngOnInit(): Promise<void> {
    await this.fetchUserInfo();
  }

  async fetchUserInfo(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('http://localhost:5000/api/auth/user-info', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        this.userInfo = res.data.user;
        this.userName = this.userInfo.name;
        this.email = this.userInfo.email;
        this.isSubscribed = this.userInfo.subscribed;
        this.subscriptionExpiresAt = this.userInfo.subscriptionExpiresAt;
      }
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  }

  async onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://file.io/?expires=5m', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        this.imagePreviewUrl = data.link;
        console.log('Temporary Image URL:', this.imagePreviewUrl);
        this.cdr.detectChanges();
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Image upload error');
    }
  }
}
