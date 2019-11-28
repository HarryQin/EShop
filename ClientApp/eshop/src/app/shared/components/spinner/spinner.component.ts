import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {InterFormsService} from '../../services/inter-forms.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  protected currentTimeout: Subscription;
  public isDelayedRunning = false;
  spinnerSubscription: Subscription;
  spinnerText = 'Loading...';
  runingReasons: Array<string> = [];
  @Input() public delay = 300;
  public text = '';

  constructor(private interForm: InterFormsService) {
    const self = this;
    self.spinnerSubscription = self.interForm.spinnerEmitter.subscribe(data => {
      self.spinnerText = data.spinnerText ? data.spinnerText : self.spinnerText;
      if (data.actionType === 'START') {
        self.isDelayedRunning = true;
        self.runingReasons.push(data.actionName);
      } else {
        if (data.actionName === 'ALL') {
          self.isDelayedRunning = false;
          self.runingReasons = [];
        } else {
          self.runingReasons = self.runingReasons.filter(
            x => x !== data.actionName
          );
        }
      }
      // console.log('Running processes are: ' + self.runingReasons.toString());
    });
  }

  ngOnInit() {}

  private set isRunning(value: boolean) {
    if (!value) {
      this.cancelTimeout();
      this.isDelayedRunning = false;
    }
    if (this.currentTimeout) {
      return;
    }
    const myTimer = timer(5, this.delay);
    const self = this;
    this.currentTimeout = myTimer.subscribe(t => {
      self.isDelayedRunning = value;
      self.cancelTimeout();
    });
  }

  private cancelTimeout(): void {
    if (this.currentTimeout) {
      this.currentTimeout.unsubscribe();
    }
    this.currentTimeout = undefined;
  }
  ngOnDestroy(): any {
    if (this.spinnerSubscription) {
      this.spinnerSubscription.unsubscribe();
    }
  }
}
