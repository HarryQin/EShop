import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  active = true;

  constructor(public alertSvc: AlertService) {
  }

  ngOnInit() {
  }

  closeAlerts(i) {
    const self = this;
    self.alertSvc.alerts.splice(i, 1);

  }

  clickOK() {
    const self = this;
    self.closeAll();
    self.alertSvc.requestConfirmationAnswer$.emit('OK');
  }

  clickCancel() {
    const self = this;
    self.closeAll();
    self.alertSvc.requestConfirmationAnswer$.emit('CANCEL');

  }

  closeAll() {
    const self = this;
    self.alertSvc.askConfirmation = false;
    self.alertSvc.alerts = [];
  }

}

