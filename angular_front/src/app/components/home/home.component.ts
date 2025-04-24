import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import axios from 'axios';
import { MonthlySubscriptionPayComponent } from '../monthly-subscription-pay/monthly-subscription-pay.component';
import { QuarternarySubscriptionPayComponent } from '../quarternary-subscription-pay/quarternary-subscription-pay.component';
import { YearlySubscriptionPayComponent } from '../yearly-subscription-pay/yearly-subscription-pay.component';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { RefundComponent } from '../refund/refund.component';



@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, MonthlySubscriptionPayComponent, QuarternarySubscriptionPayComponent, YearlySubscriptionPayComponent, RefundComponent]
})
export class HomeComponent implements OnInit, OnDestroy {
  // home.component.ts
  @Output() subscribedStatus = new EventEmitter<boolean>();  // 👈 Emit subscription status


  userInfo: any = null;
  userName: string = '';
  email: string = '';
  isSubscribed: boolean = false;
  subscriptionExpiresAt: string | null = null;
  _id: string = '';

  phrases: string[] = [
    'Speech recognition',
    'Learn how AI can help',
    'AI is the future',
    'Speech-to-text',
    'Embrace the power of AI'
  ];
  phraseIndex: number = 0;
  charIndex: number = 0;
  typingInterval: any;
  isDeleting = false;
  delayBetweenWords = 2000;
  showPopup: boolean = false;
  typingText: string = '';

  cards = [
    {
      title: 'Image Generation',
      description: 'Type text or speak to create your favorite image.',
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhv5_RokxzslQf-LEB_8ZO76IziRqkrJnWBJBC03BvcNgIDTn9_ypSwQ-EboYOVRSCQKaNyOLTwFYVy2NfasMm16qozIfeqP0a-FdgyJThwWkvEAbXUi-r-KEPlnQ1zpo-yt_e1Id557rjwcgYg79z669P6lHtqo2GK_g6Snu4BrGvT1F5n-JeDpKFAEA/s1600-rw/WHALE-SKY-AI-1102023TB.png'
    },
    {
      title: 'Speech Translation',
      description: 'Convert speech to text and speech-to-speech translation.',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?fm=jpg&q=60&w=3000'
    },
    {
      title: 'Text Translation',
      description: 'Translate text to text and convert text to speech.',
      imageUrl: 'https://img.freepik.com/premium-photo/ai-technology-wallpaper-art_1106493-22379.jpg'
    }
  ];
  currentCardIndex = 0;
  cardInterval: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        this.startTypingEffect();
        this.startCardRotation();
      });

      this.fetchUserInfo(); // still inside Angular zone, updates component state
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      clearInterval(this.typingInterval);
      clearInterval(this.cardInterval);
    }
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
        this._id = this.userInfo._id;

        // home.component.ts
        this.subscribedStatus.emit(this.isSubscribed);  // 👈 Emit status when user info is fetched
        console.log('User info:', this.userInfo);
      }
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  }

  startTypingEffect(): void {
    const typeAndDelete = () => {
      if (!this.isDeleting) {
        if (this.charIndex < this.phrases[this.phraseIndex].length) {
          // update UI inside Angular zone
          this.ngZone.run(() => {
            this.typingText += this.phrases[this.phraseIndex][this.charIndex];
          });
          this.charIndex++;
        } else {
          this.isDeleting = true;
          setTimeout(typeAndDelete, this.delayBetweenWords);
          return;
        }
      } else {
        if (this.charIndex > 0) {
          this.charIndex--;
          this.ngZone.run(() => {
            this.typingText = this.phrases[this.phraseIndex].substring(0, this.charIndex);
          });
        } else {
          this.isDeleting = false;
          this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        }
      }
      this.typingInterval = setTimeout(typeAndDelete, this.isDeleting ? 10 : 100);
    };
    typeAndDelete();
  }

  startCardRotation(): void {
    this.cardInterval = setInterval(() => {
      this.ngZone.run(() => {
        this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
      });
    }, 5000);
  }

  selectedPlanText = '';

  month = false;
  quarter = false;
  year = false;

  subscribe(plan: 'monthly' | 'quarterly' | 'yearly') {
    // Reset all flags
    this.month = false;
    this.quarter = false;
    this.year = false;

    // Set plan-specific flag and text
    if (plan === 'monthly') {
      this.month = true;
      this.selectedPlanText = 'Monthly - Rs 200/month';
    } else if (plan === 'quarterly') {
      this.quarter = true;
      this.selectedPlanText = 'Quarterly - Rs 500/3 months';
    } else if (plan === 'yearly') {
      this.year = true;
      this.selectedPlanText = 'Yearly - Rs 1500/year';
    }

    this.showPopup = true;
  }

  refund(){
    this.showPopup=true;
  }

  closePopup() {
    this.showPopup = false;
    this.month = false;
    this.quarter = false;
    this.year = false;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        location.reload();
      }, 100); // slight delay to allow UI updates
    });
  }

}
