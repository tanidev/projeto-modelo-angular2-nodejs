import { RouterModule, Routes } from '@angular/router';

import { MessagesComponent } from './message/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { AuthModule } from './auth/auth.module'

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full'},
  { path: 'messages', component: MessagesComponent },
  // { path: 'auth', component: AuthenticationComponent, 
  //       loadChildren: () => new Promise(resolve => {
  //           (require as any).ensure([], require => {
  //               resolve(require('./auth/auth.module').AuthModule);
  //       })})
  // }
  { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule'}
];
