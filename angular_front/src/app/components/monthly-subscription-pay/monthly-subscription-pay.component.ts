import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-monthly-subscription-pay',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './monthly-subscription-pay.component.html',
  styleUrls: ['./monthly-subscription-pay.component.css']
})
export class MonthlySubscriptionPayComponent {

  @Input() email!: string;  // Input property to receive email
  @Input() name!: string;   // Input property to receive name

  subscriptionForm: FormGroup;
  initiated = true;
  paymentMethod = false;
  result = false;
  finalResultSuccess = false;
  finalResultFailed = false;
  selectedBankName = 'HDFC Bank'; // this should come from previous step
  subscriptionIdCreated = '';
  payment_method: any;
  amount = 200;


  enachForm: FormGroup;
  cardForm: FormGroup;
  upiForm: FormGroup;


  debug = {
    phone: '',
    accountHolder: '',
    accountNumber: '',
    ifsc: '',
    bankCode: '',
    accountType: ''
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private cd: ChangeDetectorRef) {
    this.subscriptionForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      accountHolder: ['', [Validators.required]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^\d{8,}$/)]],
      ifsc: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/) // IFSC pattern
      ]],
      bankCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}$/)]], // Updated bank code validation pattern
      accountType: ['', [Validators.required]],

    });
    this.enachForm = this.fb.group({
      enach: ['', [Validators.required]] // Required validator for enach
    });
    this.cardForm = this.fb.group({
      cardHolderName: ['', Validators.required],
      //cardNetwork: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expirationMonth: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      expirationYear: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      //cardType: ['', Validators.required], // <- Added this
    });
    this.upiForm = this.fb.group({
      upiId: ['', [Validators.required, Validators.pattern(/^[\w.\-]+@[\w]+$/)]],
      paymentChannel: ['', Validators.required],
    });

  }

  initiateManually() {
    if (this.subscriptionForm.valid) {
      const payload = this.subscriptionForm.value;
      this.onInitiateSubmit();
      console.log('✅ Initiating manually with:', payload);
      this.selectedBankName = payload.bankCode;


    } else {
      this.subscriptionForm.markAllAsTouched();
      console.warn('❌ Form is invalid', this.subscriptionForm.value);
    }
  }

  goBack1() {
    this.paymentMethod = false;
    this.initiated = true;
  }

  selectedMethod: 'upi' | 'enach' | 'card' | null = null;

  selectMethod(method: 'upi' | 'enach' | 'card') {
    this.selectedMethod = method;
    this.cd.detectChanges();
    this.result = true;
    this.paymentMethod = false;
  }


  createPaymentPayload(payment_method: any) {
    const payload = {
      subscription_id: this.subscriptionIdCreated,
      payment_amount: this.amount,
      payment_schedule_date: new Date().toISOString(),
      payment_remarks: 'Payment process undergoing',
      payment_type: 'AUTH',
      payment_method: payment_method
    };

    console.log("Generated Payload:", payload);

    axios.post('http://localhost:5000/api/subscription/pay', payload)
      .then((response) => {
        console.log('✅ Payment success:', response.data);
        this.result=false;
        this.finalResultSuccess=true;
      })
      .catch((error) => {
        console.error('❌ Payment failed:', error.response?.data || error.message);
        this.result=false;
        this.finalResultFailed=true;
      });
  }

  goBack2() {
    this.result = false;
    this.paymentMethod = true;
  }

  generateUniqueSubscriptionId(): string {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SUB${timestamp}_${randomStr}`;
  }

  onInitiateSubmit() {
    console.log("name", this.name);
    if (this.subscriptionForm.valid) {
      const subscriptionId = this.generateUniqueSubscriptionId();
      this.subscriptionIdCreated = subscriptionId;
      const payload = {
        subscription_id: subscriptionId,
        customer_details: {
          customer_name: this.name,
          customer_email: this.email,
          customer_phone: this.subscriptionForm.value.phone,
          customer_bank_account_holder_name: this.subscriptionForm.value.accountHolder,
          customer_bank_account_number: this.subscriptionForm.value.accountNumber,
          customer_bank_ifsc: this.subscriptionForm.value.ifsc,
          customer_bank_code: this.subscriptionForm.value.bankCode,
          customer_bank_account_type: this.subscriptionForm.value.accountType
        },
        plan_details: {
          plan_id: 'plan_200_monthly',
          plan_name: 'Premium Monthly Plan',
          plan_type: 'PERIODIC',
          plan_max_cycles: 12,
          plan_recurring_amount: 200,
          plan_max_amount: 6000,
          plan_interval_type: 'MONTH',
          plan_intervals: 1,
          plan_currency: 'INR',
          plan_note: 'Premium subscription with Rs 200 monthly billing for up to 12 months',
          plan_status: 'ACTIVE'
        },
        authorization_details: {
          authorization_amount: 200,
          authorization_amount_refund: false,
          authorization_reference: null,
          authorization_time: new Date().toISOString(),
          authorization_status: 'INITIALIZED',
          payment_id: 'PAYMENT12345',
          payment_method: 'NPCI_SBC'
        },
        subscription_meta: {
          return_url: 'https://yourwebsite.com/payment-success'
        },
        subscription_expiry_time: '2100-01-01T05:29:59+05:30',
        subscription_first_charge_time: null,
        subscription_tags: {
          subscription_note: 'Premium Monthly Plan subscription'
        },
        subscription_payment_splits: null
      };

      axios.post('http://localhost:5000/api/subscription/create', payload)
        .then((response) => {
          const res = response.data;
          if (res?.authorization_details) {
            this.initiated = false;
            this.paymentMethod = true;
            console.log('✅ Subscription created:', res);
          } else {
            console.error(res.message);
          }
        })
        .catch((error) => {
          console.error('❌ Error creating subscription:', error.response?.data || error.message);
        });

    } else {
      this.subscriptionForm.markAllAsTouched();
      console.warn('❌ Form is invalid', this.subscriptionForm.value);
    }
  }
  onProceedToENach() {

    console.log('Proceeding with UPI Payment...');

    if (this.enachForm.invalid) {
      console.log('UPI Form is invalid');
      return;
    }

    const payment_method = {
      enach: {
        account_bank_code: this.subscriptionForm.value.bankCode,
        account_holder_name: this.subscriptionForm.value.accountHolder,
        account_ifsc: this.subscriptionForm.value.ifsc,
        account_number: this.subscriptionForm.value.accountNumber,
        account_type: this.subscriptionForm.value.accountType,
        auth_mode: this.enachForm.value.enach,
        channel: "link"
      }
    };

    this.createPaymentPayload(payment_method);
  }

  onProceedToCard() {
    console.log('Proceeding with UPI Payment...');

    if (this.cardForm.invalid) {
      console.log('UPI Form is invalid');
      return;
    }

    /* const payment_method = {
       card: {
         card_cvv: this.cardForm.value.cvv,
         card_expiry_mm: this.cardForm.value.expirationMonth,
         card_expiry_yy: this.cardForm.value.expirationYear,
         card_holder_name: this.cardForm.value.cardHolderName,
         card_network: this.cardForm.value.cardNetwork,
         card_number: this.cardForm.value.cardNumber,
         card_type: this.cardForm.value.cardType,
         channel: "link"
       }
     };
 
     this.createPaymentPayload(payment_method);*/
    const payment_method = {
      enach: {
        account_bank_code: this.subscriptionForm.value.bankCode,
        account_holder_name: this.subscriptionForm.value.accountHolder,
        account_ifsc: this.subscriptionForm.value.ifsc,
        account_number: this.subscriptionForm.value.accountNumber,
        account_type: this.subscriptionForm.value.accountType,
        auth_mode: 'debit_card',
        channel: "link"
      }
    };

    this.createPaymentPayload(payment_method);


  }

  onProceedToUpi() {
    console.log('Proceeding with UPI Payment...');

    if (this.upiForm.invalid) {
      console.log('UPI Form is invalid');
      console.log(this.upiForm.value); // For debugging
      return;
    }

    const payment_method = {
      upi: {
        channel: this.upiForm.value.paymentChannel,
        upi_id: this.upiForm.value.upiId
      }
    };

    console.log('Form Data (Valid):', this.upiForm.value);
    this.createPaymentPayload(payment_method);
  }


}