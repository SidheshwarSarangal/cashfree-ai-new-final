import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audio.component.html'
})
export class AudioComponent implements OnInit {
  isSubscribed: boolean = false;
  userInfo: any = null;
  userName: string = '';
  email: string = '';
  subscriptionExpiresAt: string = '';
  translatedText: string = '';
  audio: HTMLAudioElement | null = null;

  constructor(private cdr: ChangeDetectorRef) {}


  recording: boolean = false;
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];

  async ngOnInit(): Promise<void> {
    await this.fetchUserInfo();
  }

  async fetchUserInfo(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('http://localhost:5000/api/auth/user-info', {
        headers: { Authorization: `Bearer ${token}` }
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

  async startRecording() {
    this.translatedText = '';
    this.audioChunks = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = event => {
        this.audioChunks.push(event.data);
      };
      this.mediaRecorder.onstop = () => this.uploadAudio();
      this.mediaRecorder.start();
      this.recording = true;
      //alert('Recording started!');
    } catch (err) {
      alert('Microphone access denied or error occurred.');
      console.error(err);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.recording) {
      this.mediaRecorder.stop();
      this.recording = false;
      alert('Recording stopped!');
    }
    else{
      alert('No recording in progress.');
    }
  }

  toggleRecording() {
    if (this.recording) {
      this.stopRecording();  // Stop recording
    } else {
      this.startRecording(); // Start recording
    }
  }
  

  async uploadAudio() {
    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('file', audioBlob, 'voice.webm');

    try {
      const res = await axios.post('http://localhost:5000/api/ai/audio-translate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      this.translatedText = res.data.translatedText;
      this.cdr.detectChanges();  // <-- Add this line
      console.log(this.translatedText);
    } catch (err) {
      console.error('Translation failed:', err);
      alert('Translation failed.');
    }
  }

  async playAudio() {
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
