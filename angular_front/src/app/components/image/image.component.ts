import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import axios from 'axios';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image.component.html',
})
export class ImageComponent implements OnInit {
  isSubscribed: boolean = true; // for testing
  userInfo: any = null;
  userName: string = '';
  email: string = '';
  subscriptionExpiresAt: string = '';
  translatedText: string = '';
  imagePreviewUrl: string | null = null;
  imagePreviewUrlScreen: string | null = null;

  constructor(private cdr: ChangeDetectorRef) {
    // Firebase init (runs only once)

  }

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

    const reader = new FileReader();

    // Once the image is loaded, update the imagePreviewUrl to display it
    reader.onload = (e: any) => {
      this.imagePreviewUrlScreen = e.target.result;  // Set the base64 image data as the preview
      this.cdr.detectChanges();  // Detect changes to refresh the UI
      console.log('Local image preview:', this.imagePreviewUrlScreen);
    };

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        this.imagePreviewUrl = response.data.originalUrl;
        this.cdr.detectChanges();

        console.log('Image uploaded:', response.data.originalUrl);
        console.log('Public ID:', response.data.publicId);

        // 🔥 Analyze the uploaded image using Groq controller
        const analysisRes = await axios.post('http://localhost:5000/api/ai/analyse-image', {
          imageUrl: this.imagePreviewUrl
        });

        if (analysisRes.data.success) {
          console.log('Groq Analysis Result:', analysisRes.data.result);
        } else {
          console.error('Analysis failed:', analysisRes.data.message);
        }

      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload or Analysis failed:', error);
      alert('Upload or analysis failed');
    }
  }

}
