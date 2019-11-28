import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MessageDTO} from '../DTO/MessageDTO';

@Injectable({
  providedIn: 'root'
})
export class InterFormsService {
  public spinnerEmitter: Subject<any>;
  public loginActionEmitter: Subject<any>;
  public msgForMessagesColetor$: Subject<MessageDTO[] | MessageDTO | boolean>;
  public canNavigateAwayFromApp = true;
  private timeOutBypass = false;

  constructor() {
    this.spinnerEmitter = new Subject();
    this.loginActionEmitter = new Subject();
    this.msgForMessagesColetor$ = new Subject();

  }

  public startSpinner(actionName?: string, text?: string) {
    const spinner = {
      actionType: 'START',
      spinnerText: text,
      actionName
    };
    this.spinnerEmitter.next(spinner);
  }

  public stopSpinner(actionName?: string) {
    const spinner = {
      actionType: 'STOP',
      actionName
    };
    this.spinnerEmitter.next(spinner);
  }

  public getTimeOutBypass(): boolean {
    return this.timeOutBypass;
  }

  public setTimeOutBypass() {
    this.canNavigateAwayFromApp = true;
    this.timeOutBypass = true;
  }

  languageChange(code: string) {
    // this.translateService.use(code);
  }
}
