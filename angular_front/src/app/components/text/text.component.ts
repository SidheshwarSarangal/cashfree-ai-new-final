import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add CommonModule here
  templateUrl: './text.component.html'
})
export class TextComponent implements OnInit {
  isSubscribed: boolean = false;
  userInfo: any = null;
  userName: string = '';
  email: string = '';
  subscriptionExpiresAt: string = '';
  audio: HTMLAudioElement | null = null;
  loggedIn: boolean = false;


  // 👇 Add these lines
  inputLang: string = 'English';
  outputLang: string = 'Hindi';
  inputText: string = '';
  translatedText = '';

  async ngOnInit(): Promise<void> {
    await this.fetchUserInfo();
  }

  async fetchUserInfo(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }
    this.loggedIn=true;

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

  async handleSubmit() {
    try {
      const response = await axios.post('http://localhost:5000/api/ai/text-text', {
        inputLang: this.inputLang,
        outputLang: this.outputLang,
        inputText: this.inputText,
      });
      console.log(response);

      this.translatedText = response.data;
    } catch (error) {
      console.error('Translation failed:', error);
      alert('Translation failed.');
    }
  }

  async playAudio() {
    if (!this.inputText.trim()) {
      alert('Please enter text to play audio.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/ai/text-speech',
        { text: this.translatedText },
        { responseType: 'blob' }
      );

      const audioUrl = URL.createObjectURL(response.data);
      if (this.audio) {
        this.audio.pause();
        URL.revokeObjectURL(this.audio.src);
      }
      this.audio = new Audio(audioUrl);
      this.audio.play();
    } catch (err) {
      console.error('Audio error:', err);
      alert('Failed to play audio');
    }
  }
}
