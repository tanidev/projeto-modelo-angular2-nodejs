import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { MessageListComponent } from './message/message-list.component';
import { MessageInputComponent } from './message/message-input.component';
import { MessagesComponent } from './message/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { LogoutComponent } from './auth/logout.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';

import { AuthService } from './auth/auth.service';

import { APP_ROUTES } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    MessageListComponent,
    MessageInputComponent,
    MessagesComponent,
    AuthenticationComponent,
    HeaderComponent,
    LogoutComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
