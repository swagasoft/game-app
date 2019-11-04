import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin-upload',
  templateUrl: './admin-upload.component.html',
  styleUrls: ['./admin-upload.component.scss'],
})
export class AdminUploadComponent implements OnInit {
  public catType: any[];

  
  constructor(private userService: UserService,
              public toastController: ToastController,
              public alertController: AlertController) { }

  questionModel = {
    question: '',
    option1: '',
    category: '',
    option2: '',
    option3: '',
    option4: '',
      tip  : '',
    answer: ''
  }

  model = {
    mlistOptions : [
    ]
  }

  

  ngOnInit() {}


  submit(form: NgForm){
      console.log(form.value);
      this.questionModel.question = form.value.question;
      this.questionModel.answer = form.value.answer;
      this.questionModel.option1 = form.value.option1;
      this.questionModel.option2 = form.value.option2;
      this.questionModel.option3 = form.value.option3;
      this.questionModel.option4 = form.value.option4;
      this.questionModel.tip = form.value.tip;
      this.userService.postQuestion(this.questionModel).subscribe(
        response => {
          console.log(response);
          this.resetForm();
          this.presentToast();
        },
        err => {
          console.log(err);
          console.log(err.error.message);
          this.presentFail(err.error.message);
        }
      );

  }
  selectChange( $event) {
    this.questionModel.category = $event;
      }

      resetForm(){
        this.questionModel.category = '';
        this.questionModel.question = '';
        this.questionModel.answer = '';
        this.questionModel.option1 = '';
        this.questionModel.option2 =  '';
        this.questionModel.option3 = '';
        this.questionModel.option4 = '';
        this.questionModel.tip = '';
      }

      async presentFail(msg) {
        const alert = await this.alertController.create({
          header: 'Ooops!',
          message: ` <strong class="font-weight-bold text-danger text-center"> ${msg}</strong>`,
          buttons: [ {
              text: 'Retry',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });
        await alert.present();
      }

      async presentToast() {
        const toast = await this.toastController.create({
          message: 'Question have been saved.',
          duration: 2000,
          position:"middle"
        });
        toast.present();
      }

}
