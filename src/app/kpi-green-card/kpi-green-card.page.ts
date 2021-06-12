import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActionSheetController, AlertController  } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-kpi-green-card',
  templateUrl: './kpi-green-card.page.html',
  styleUrls: ['./kpi-green-card.page.scss'],
})
export class KpiGreenCardPage implements OnInit {

  date = new Date().toLocaleDateString();
  myForm: FormGroup;

  loading: any;
  actionSheet: any;
  base64Image = 'assets/img/notselected.png';
  files: any;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder,
    private dataService: DataService,
  ) { 
    this.myForm = this.formBuilder.group({
      name: ['Sandro', Validators.required],
      date: [this.date, Validators.required],
      detail: ['', Validators.required],
      action: ['', Validators.required],
      code: ['', Validators.required],
      image: [''],
      authorization: [''],
      timezone: [''],
    });
  }

  ngOnInit() {
  }

  async presentActionSheet() {
    this.actionSheet = await this.actionSheetCtrl.create({
      header: 'Select image source',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: 'Explore',
          handler: () => {
            document.getElementById('files').click();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await this.actionSheet.present();
  }

  async openCamera() {
    try {
      const selectimage = await Camera.getPhoto({
        quality: 90,
        width: 800,
        correctOrientation: true,
        resultType: CameraResultType.Base64,
        saveToGallery: true,
        source: CameraSource.Camera
      });
  
      const base64string = selectimage.base64String.replace(/(\r\n|\n|\r)/gm, '');
      this.base64Image = 'data:image/jpeg;base64,'+selectimage.base64String.replace(/(\r\n|\n|\r)/gm, '');
      const imageBlob = this.dataURItoBlob(base64string);
      const fileImage = new File(
        [imageBlob],
        'camera.'+selectimage.format,
        { type: 'image/'+selectimage.format }
      );
      this.myForm.controls.image.setValue(fileImage);
      this.actionSheet.dismiss();
    } catch (e) {
      await this.dataService.presentToast('Tidak dapat membuka kamera');
    }
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
  }

  getBase64(obj: any) {
    const reader = new FileReader();
    reader.onloadend = function() {
      const blob = reader.result;
      const base64Image = blob.toString().split(',')[1];
      const imageBlob = obj.dataURItoBlob(base64Image);
      const fileImage = new File(
        [imageBlob], 
        obj.files[0].name,
        { type: obj.files[0].type }
      );
      obj.base64Image = 'data:image/jpeg;base64,'+base64Image;
      obj.myForm.controls.image.setValue(fileImage);
    };
    reader.readAsDataURL(this.files[0]);
  }

  onChange(event: any) {
    const temp = this.files;
    this.files = event.srcElement.files;
    if (this.files.length > 0) {
      if (this.files[0].name.match(/.(jpg|jpeg|png|webp)$/i)) {
        if (this.files[0].size < (4000 * 1024)) {
          this.getBase64(this);
        } else {
          this.dataService.presentAlert('File terlalu besar', 'Maksimal 4 MB.');
          this.files = temp;
        }
      } else {
        this.dataService.presentAlert('', 'Bukan file foto');
        this.files = temp;
      }
    } else {
      this.files = temp;
    }
  }
}
