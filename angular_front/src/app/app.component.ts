import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common'; // ⬅️ This is important
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { TextComponent } from './components/text/text.component';
import { ImageComponent } from './components/image/image.component';
import { AudioComponent } from './components/audio/audio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,               // ✅ Add this
    RouterOutlet,
    TopBarComponent,
    LeftSidebarComponent,
    HomeComponent,
    TextComponent,
    ImageComponent,
    AudioComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular_front';
  currentComponent: 'text' | 'image' | 'audio' | 'home' = 'home';
  isUserSubscribed = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const lastSegment = event.urlAfterRedirects.split('/#').pop();
        if (lastSegment === 'text') {
          this.currentComponent = 'text';
        } else if (lastSegment === 'image') {
          this.currentComponent = 'image';
        } else if (lastSegment === 'audio') {
          this.currentComponent = 'audio';
        } else {
          this.currentComponent = 'home';
        }
      }
    });
  }

  // app.component.ts
  handleSubscribedStatus(status: boolean) {
    this.isUserSubscribed = status;  // 👈 Store the subscription status
    console.log("app",this.isUserSubscribed)
  }

}

