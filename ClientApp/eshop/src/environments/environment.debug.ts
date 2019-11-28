import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: false,

  gateway: {
    url: 'http://localhost:5000'
  },
  appInsights: {
    instrumentationKey: '869f7b88-cf28-49e5-a3db-eb258c37dc8b'
  },
  configLog: {
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.ERROR
  }
};
