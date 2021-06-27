import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActionSheetController, AlertController  } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DataService } from '../../../../services/data/data.service';

@Component({
  selector: 'app-inspection1',
  templateUrl: './inspection1.page.html',
  styleUrls: ['./inspection1.page.scss'],
})
export class Inspection1Page implements OnInit {

  date = new Date().toISOString().slice(0, 10)
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
      date: [this.date, Validators.required],
      nameSite: ['', Validators.required],
      department: ['', Validators.required],
      location: ['', Validators.required],
      percentage: ['', Validators.required],
      total_actual: ['', Validators.required],
      q1_actual: ['', Validators.required],
      q1_code: ['', Validators.required],
      q2_actual: ['', Validators.required],
      q2_code: ['', Validators.required],
      q3_actual: ['', Validators.required],
      q3_code: ['', Validators.required],
      q4_actual: ['', Validators.required],
      q4_code: ['', Validators.required],
      q5_actual: ['', Validators.required],
      q5_code: ['', Validators.required],
      q6_actual: ['', Validators.required],
      q6_code: ['', Validators.required],
      q7_actual: ['', Validators.required],
      q7_code: ['', Validators.required],
      q8_actual: ['', Validators.required],
      q8_code: ['', Validators.required],
      q9_actual: ['', Validators.required],
      q9_code: ['', Validators.required],
      q10_actual: ['', Validators.required],
      q10_code: ['', Validators.required],
      q11_actual: ['', Validators.required],
      q11_code: ['', Validators.required],
      q12_actual: ['', Validators.required],
      q12_code: ['', Validators.required],
      q13_actual: ['', Validators.required],
      q13_code: ['', Validators.required],
      q14_actual: ['', Validators.required],
      q14_code: ['', Validators.required],
      q15_actual: ['', Validators.required],
      q15_code: ['', Validators.required],
      q16_actual: ['', Validators.required],
      q16_code: ['', Validators.required],
      q17_actual: ['', Validators.required],
      q17_code: ['', Validators.required],
      q18_actual: ['', Validators.required],
      q18_code: ['', Validators.required],
      q19_actual: ['', Validators.required],
      q19_code: ['', Validators.required],
      q20_actual: ['', Validators.required],
      q20_code: ['', Validators.required],
      q21_actual: ['', Validators.required],
      q21_code: ['', Validators.required],
      q22_actual: ['', Validators.required],
      q22_code: ['', Validators.required],
      q23_actual: ['', Validators.required],
      q23_code: ['', Validators.required],
      q24_actual: ['', Validators.required],
      q24_code: ['', Validators.required],
      q25_actual: ['', Validators.required],
      q25_code: ['', Validators.required],
      q26_actual: ['', Validators.required],
      q26_code: ['', Validators.required],
      q27_actual: ['', Validators.required],
      q27_code: ['', Validators.required],
      q28_actual: ['', Validators.required],
      q28_code: ['', Validators.required],
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
