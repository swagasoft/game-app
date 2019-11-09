import { StartGameComponent } from './components/start-game/start-game.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { FaqComponent } from './components/faq/faq.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminAccountComponent } from './components/admin-account/admin-account.component';
import { PayoutsComponent } from './components/payouts/payouts.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AdminUploadComponent } from './components/admin-upload/admin-upload.component';
import { GameComponent } from './components/game/game.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountComponent } from './components/account/account.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { AuthguardGuard } from './auths/authguard.guard';
import { RegisterComponent } from './components/register/register.component';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { ManageQuestionsComponent } from './components/manage-questions/manage-questions.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {path : 'login', component: LoginComponent},
  {path : 'welcome', component: WelcomepageComponent, canActivate:[AuthguardGuard]},
  {path : 'register', component: RegisterComponent},
  {path : 'leaderboard', component: LeaderboardComponent, canActivate:[AuthguardGuard]},
  {path : 'settings', component: SettingsComponent, canActivate:[AuthguardGuard]},
  {path : 'account', component: AccountComponent, canActivate:[AuthguardGuard]},
  {path : 'game', component: GameComponent, canActivate:[AuthguardGuard]} ,
  {path : 'profile', component: ProfileComponent, canActivate:[AuthguardGuard]},
  {path : 'account', component: AccountComponent, canActivate:[AuthguardGuard]},
  {path : 'start-game', component: StartGameComponent, canActivate:[AuthguardGuard]},

  {path : 'contact-us', component: ContactComponent},
  {path : 'how-it-works', component: HowItWorksComponent},
  {path : 'faq-section', component: FaqComponent},
  {path : 'privacy-section', component: PrivacyComponent},

  // admin routes
  {path : 'admin-upload', component: AdminUploadComponent, canActivate:[AuthguardGuard]},
  {path : 'manage-users', component: ManageUsersComponent, canActivate:[AuthguardGuard]},
  {path : 'payouts', component: PayoutsComponent, canActivate:[AuthguardGuard]},
  {path : 'manage-questions', component: ManageQuestionsComponent, canActivate:[AuthguardGuard]},
  {path : 'admin-account', component: AdminAccountComponent, canActivate:[AuthguardGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
