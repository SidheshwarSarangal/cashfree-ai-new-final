import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import axios from 'axios';
import { Router } from '@angular/router';



@Component({
  selector: 'app-refund',
  imports: [CommonModule],
  templateUrl: './refund.component.html',
  styleUrl: './refund.component.css'
})
export class RefundComponent {

  userInfo: any = null;
  userName: string = '';
  email: string = '';
  subscriptionStartsAt: string | null = null;
  subscriptionExpiresAt: string | null = null;
  subscriptionType: string | null = null;
  cfPaymentId: string | null = null;
  paymentId: string | null = null;
  subscriptionId: string | null = null;
  refundAmount: any;
  _id: string = '';
  resultgood=false;
  resultbad=false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private ngZone: NgZone,
    private router: Router
  ) { }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      this.fetchUserInfo(); // still inside Angular zone, updates component state
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
        this.subscriptionExpiresAt = this.userInfo.subscriptionExpiresAt;
        this.subscriptionStartsAt = this.userInfo.subscriptionStartsAt;
        this.subscriptionType = this.userInfo.subscriptionType;
        this.cfPaymentId = this.userInfo.cfPaymentId;
        this.paymentId = this.userInfo.paymentId;
        this.subscriptionId = this.userInfo.subscriptionId;
        this._id = this.userInfo._id;

        // home.component.ts
        console.log('User info:', this.userInfo);


      }

      try {

        if (this.subscriptionStartsAt && this.subscriptionExpiresAt && this.subscriptionType) {
          console.log("yyyyyyyyyyyyyyyyy");

          const st = new Date(this.subscriptionStartsAt).getTime();
          const ep = new Date(this.subscriptionExpiresAt).getTime();
          const now = Date.now();

          console.log("st", st);
          console.log("ep", ep);
          console.log("Subscription amount:", Number(this.subscriptionType));

          const duration = ep - st;

          if (duration > 0) {
            const used = now - st;
            const partial = duration - (used % duration); // 👈 % part
            const progressFraction = partial / parseFloat(duration.toString()); // 👈 force float

            const refundRaw = Math.floor(progressFraction * Number(this.subscriptionType));
            this.refundAmount = +refundRaw.toFixed(2);

            console.log("✅ Refund amount calculated:", this.refundAmount);
          } else {
            console.warn("⚠️ Invalid subscription dates: start >= end");
          }
        }


      } catch (calcErr) {
        console.error('❌ Error calculating refund amount:', calcErr);
      }
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  }

  async unsubscribeUser(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }

    try {
     /* const response = await axios.post(
        `http://localhost:5000/api/auth/unsubscribe/${this._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        console.log("User unsubscribed successfully:", response.data);
        // Optionally, you can navigate the user or update the UI after successful unsubscribe
        this.router.navigate(['/']);  // Redirect to homepage or another route
      } else {
        console.error('Unsubscribe failed:', response.data.message);
      }*/
      this.resultgood=true;
    } catch (err) {
      this.resultbad=true;
      console.error('Error unsubscribing user:', err);
    }
  }

}
