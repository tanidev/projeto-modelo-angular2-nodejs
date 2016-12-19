import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { Message } from './message.model';
import { ErrorService } from './../errors/error.service';

import { environment } from './../../environments/environment';

@Injectable()
export class MessageService {

  private messages: Message[] = [];
  messageIsEdit = new EventEmitter<Message>();

  constructor(private http:Http, private errorService:ErrorService) {}

  private getToken() {
    const token = localStorage.getItem('token') 
      ? '?token=' + localStorage.getItem('token') 
      : '';
    return token;
  }

  addMessage(message: Message) {

    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(environment.api + environment.messageService + this.getToken(), body, {headers: headers})
      .map((response:Response) => {
        const result  = response.json();
        const message = new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
        this.messages.push(message);
        return message;
      })
      .catch((error:Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getMessages() {
    return this.http.get(environment.api + environment.messageService + this.getToken())
      .map((response:Response) => {
        const messages = response.json().obj;
        const transformedMessages: Message[] = [];

        for(let message of messages) {
          transformedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id));
        }

        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error:Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  editMessage(message:Message) {
    this.messageIsEdit.emit(message);
  }

  updateMessage(message:Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'})
    return this.http.patch(environment.api + environment.messageService + message.messageId + this.getToken(), body, {headers: headers})
      .map((response:Response) => response.json())
      .catch((error:Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    return this.http.delete(environment.api + environment.messageService + message.messageId + this.getToken())
      .map((response:Response) => response.json())
      .catch((error:Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
}
