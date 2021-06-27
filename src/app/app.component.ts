import { Component } from '@angular/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { DataService } from '../services/data/data.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  counter = 0;
  selectedPath = '';

  constructor(
    private platform: Platform,
    private dataService: DataService,
    private router: Router,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url !== undefined && event.url !== this.selectedPath) {
        this.selectedPath = event.url;
      }
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(1, () => {
        if (this.selectedPath == 'auth' || this.selectedPath == 'home') {
          if (this.counter == 0) {
            this.counter++;
            this.dataService.presentToast('Tekan lagi untuk menutup aplikasi', 'bottom');
            setTimeout(() => { this.counter = 0; }, 3000);
          } else {
            navigator['app'].exitApp();
          }
        }
      });
    });
  }
}
