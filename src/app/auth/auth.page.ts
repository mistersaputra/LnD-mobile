import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  myForm: FormGroup;
  type = 'password';
  submitAttempt = false;
  public unsubscribeBackEvent: any;
  counter = 0;

  constructor(
    public platform: Platform,
    private router: Router,
    public formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.myForm = this.formBuilder.group({
      nrp: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  ngOnInit() {}

  ionViewWillEnter() {
    if (localStorage.getItem('lms_token')) {
      this.router.navigate(['/home']);
    }
    this.initializeBackButtonCustomHandler();
  }
  
  revealPassword() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  next() {
    this.router.navigate(['home']);
  }

  async login() {
    this.submitAttempt = true;
    if (this.myForm.valid) {
      const body = JSON.stringify(this.myForm.value);
      const url = 'api/login';
      this.dataService.httpPost(body, url, true)
      .then(
        async data => {
          if (data['status_code'] === 200) {
            localStorage.setItem('lms_token', data['access_token']);
          } else {
            await this.dataService.presentAlert('', data['message']);
          }
        }
      );
    } else {
      await this.dataService.presentAlert('', 'Lengkapi semua data!');
    }
  }

  ionViewWillLeave() {
    this.unsubscribeBackEvent.unsubscribe();
  }
  
  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(1,  () => {
      if (this.counter === 0) {
        this.counter++;
        this.dataService.presentToast('Tekan lagi untuk menutup aplikasi', 'bottom');
        setTimeout(() => { this.counter = 0; }, 3000);
      } else {
        navigator['app'].exitApp();
      }
    });
  }

  whatsApp(phone) {
    window.open('https://wa.me/'+phone);
  }
}