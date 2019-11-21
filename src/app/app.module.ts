import { AccountService } from './shared/account.service';
import { RecordComponent } from './components/record/record.component';
import { GameServiceService } from './shared/game-service.service';
import { StartGameComponent } from './components/start-game/start-game.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FaqComponent } from './components/faq/faq.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminAccountComponent } from './components/admin-account/admin-account.component';
import { PayoutsComponent } from './components/payouts/payouts.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AdminUploadComponent } from './components/admin-upload/admin-upload.component';
import { GameComponent } from './components/game/game.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountComponent } from './components/account/account.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthguardGuard } from './auths/authguard.guard';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './shared/user.service';
import { Angular4PaystackModule } from 'angular4-paystack';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auths/auth-interceptor';
import { ManageQuestionsComponent } from './components/manage-questions/manage-questions.component';


@NgModule({
  declarations: [AppComponent, 
  LoginComponent,
  RegisterComponent,
  MenuComponent,
  AdminMenuComponent,
  ManageUsersComponent,
  FaqComponent,
  HowItWorksComponent,
  SettingsComponent,
  AdminUploadComponent,
  LeaderboardComponent,
  AccountComponent,
  PayoutsComponent,
  ManageQuestionsComponent,
  AdminAccountComponent,
  FooterComponent,
  RecordComponent,
  ContactComponent,
  StartGameComponent,
  PrivacyComponent,
  ProfileComponent,
  GameComponent,
  WelcomepageComponent],
  schemas: [ NO_ERRORS_SCHEMA],

  entryComponents: [],
  imports:
   [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Angular4PaystackModule,
    IonicModule.forRoot(),
    HttpClientModule,
     AppRoutingModule],
     

  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    StatusBar,
    UserService,
    Network,
    NativeAudio,
    Angular4PaystackModule,
    SplashScreen,
    AuthguardGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,AccountService, AuthguardGuard, GameServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
