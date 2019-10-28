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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
