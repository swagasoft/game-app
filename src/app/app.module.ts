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
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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

  SettingsComponent,
  AdminUploadComponent,
  LeaderboardComponent,
  AccountComponent,
  PayoutsComponent,
  ManageQuestionsComponent,
  AdminAccountComponent,
  ProfileComponent,
  GameComponent,
  WelcomepageComponent],
  schemas: [ NO_ERRORS_SCHEMA],

  entryComponents: [],
  imports: [BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    HttpClientModule,
     AppRoutingModule],
     

  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    StatusBar,
    UserService,
    NativeAudio,
    SplashScreen,
    AuthguardGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
