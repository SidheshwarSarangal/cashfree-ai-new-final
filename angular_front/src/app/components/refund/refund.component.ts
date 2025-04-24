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
  resultgood = false;
  resultbad = false;

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
  async processRefund(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    let cfPaymentIdInt64: BigInt;

    // Check if cfPaymentId is valid
    if (this.cfPaymentId) {
      // If cfPaymentId is available, process it as a UUID
      const uuidHex = this.cfPaymentId.replace(/-/g, ''); // Remove dashes from the UUID

      // Convert the first 16 characters (8 bytes) of the UUID to a 64-bit integer
      const first8BytesHex = uuidHex.substring(0, 16);
      cfPaymentIdInt64 = BigInt("0x" + first8BytesHex); // Convert to BigInt
    } else {
      // If cfPaymentId is null or undefined, generate a random 64-bit number
      cfPaymentIdInt64 = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)); // Generate a random 64-bit number
      console.log('Generated random 64-bit number:', cfPaymentIdInt64.toString());
    }

    console.log('Resulting 64-bit cf_payment_id:', cfPaymentIdInt64.toString()); // Output the final 64-bit number
    let zeroFloat64 = 0.0;
    // Prepare payload for refund request
    const payload = {
      subscriptionId: this.subscriptionId,
      paymentId: this.paymentId, // Convert BigInt to string for JSON serialization
      refundId: `refund_${Date.now()}`, // example format
      refundAmount: 0,
      refundNote: 'Auto refund on unsubscribe',
      refundSpeed: 'INSTANT',
      //cfPaymentId: 1234235 // Ensure it's passed as string for JSON serialization
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/subscription/refund',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        console.log('✅ Refund processed successfully:', response.data);
        this.resultgood = true;
      } else {
        console.error('❌ Refund failed:', response.data.message);
        this.resultbad = true;
      }
    } catch (err) {
      console.error('❌ Error processing refund:', err);
      this.resultbad = true;
    }
  }



  async unsubscribeUser(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }

    try {
      const response = await axios.post(
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
       }

      //this.processRefund();

      this.resultgood = true;
    } catch (err) {
      this.resultbad = true;
      console.error('Error unsubscribing user:', err);
    }
  }

}
