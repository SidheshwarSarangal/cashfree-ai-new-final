import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoginModalComponent } from '../login/login.component';
import { Input } from '@angular/core';


@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  imports: [CommonModule, LoginModalComponent],
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isMenuOpen = false;
  userInfo: any = null;
  isLoginOpen = false;
  isLoggedIn = false;
  // top-bar.component.ts
  @Input() isSubscribed!: boolean;  // 👈 Receive the status here

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
    console.log("isSubscribedxxxxxxxxxxx", this.isSubscribed);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openLogin() {
    this.isLoginOpen = true;
  }

  closeLogin() {
    this.isLoginOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }

  handleLoginSuccess() {
    this.isLoggedIn = true;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.isLoggedIn = false;
  }
}
