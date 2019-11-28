import {EventEmitter, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppNotificationsMSG} from '../configuration/commonSettings';

export class Alert {
  constructor(public text: string, public type: string) {
  }
}


@Injectable({
  providedIn: 'root'
})

export class AlertService {
  public requestConfirmationAnswer$: EventEmitter<any>;
  public sendSectionForDelete$: EventEmitter<any>;
  public askConfirmation = false;
  public notificationTitle: string = AppNotificationsMSG.notificationTitle;
  public actionType = 'DELETE';
  alerts: Array<any> = new Array<any>();

  constructor(private translateSvc: TranslateService) {
    this.requestConfirmationAnswer$ = new EventEmitter();
    this.sendSectionForDelete$ = new EventEmitter();
  }

  ok(text: string = 'N/A') {
    this.addAlert(text, 'success');
  }

  warn(text: string = 'N/A', title?: string) {
    const self = this;
    self.askConfirmation = false;
    self.addAlert(text, 'warning');
    self.notificationTitle = title ? title : self.translateSvc.instant(
      'ALERT_MSG.WARNING'
    );
  }

  error(text: string = 'N/A') {
    this.addAlert(text, 'danger');
    this.notificationTitle = 'Error';
  }

  addAlert(text: string = 'N/A', type: string = 'success') {
    const self = this;
    self.askConfirmation = false;
    const alert = new Alert(text, type);
    self.notificationTitle = self.translateSvc.instant(
      'ALERT_MSG.NOTIFICATION'
    );
    if (
      self.alerts.find( (o) => {
        return o.text === text && o.type === type;
      }) === undefined
    ) {
      self.alerts.push(alert);
    }
  }

  addAlertAndRequestAnswer(
    text: string = 'N/A',
    type: string = 'inputRequired',
    title?: string,
    actionType?: string
  ) {
    const self = this;
    self.askConfirmation = true;
    self.notificationTitle = title;
    if (actionType) {
      self.actionType = actionType;
    }
    const alert = new Alert(text, type);
    if (
      self.alerts.find( (o) => {
        return o.text === text && o.type === type;
      }) === undefined
    ) {
      self.alerts.push(alert);
    }
  }

  addNavgigateAwayAlert(): void {
    this.addAlertAndRequestAnswer(
      this.translateSvc.instant('ALERT_MSG.NAVIGATE_AWAY_DATA_UNSAVED'),
      'warning',
      this.translateSvc.instant('ALERT_MSG.NAVIGATE_AWAY_TITLE'),
      'NAVIGATE'
    );
  }
}
