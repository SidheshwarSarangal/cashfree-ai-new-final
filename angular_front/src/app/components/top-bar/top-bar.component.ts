import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoginModalComponent } from '../login/login.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  imports: [CommonModule, LoginModalComponent],
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit { 
  isMenuOpen = false;
  isLoginOpen = false;
  isLoggedIn = false;  // ✅ Track login state

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    // ✅ Check token only in browser (Avoid SSR errors)
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openLogin() {
    this.isLoginOpen = true;
  }

  closeLogin() {
    this.isLoginOpen = false;

    // ✅ Recheck login status after closing login modal
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }

  handleLoginSuccess() {
    this.isLoggedIn = true;
  }
  

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token'); // ✅ Remove token on logout
    }
    this.isLoggedIn = false;  // ✅ Update UI
  }
}
