import {
  PaymentGateway,
  PaymentGatewayEnv,
} from '@braintree-react-express/@payment/gateway';
import * as bodyParser from 'body-parser';
import { Express, static as expressStatic } from 'express';
import * as session from 'express-session';
import * as lusca from 'lusca';
import * as morgan from 'morgan';
import * as path from 'path';

type ApiConfigEnv = {
  production: boolean;
  sessionSecret: string;
} & PaymentGatewayEnv;

export class ApiConfig {
  constructor(private app: Express, private env: ApiConfigEnv) {}

  make() {
    this.session();
    this.bodyParser();
    this.lusca();
    this.assets();
    this.errorHandler();
    this.logger();
    PaymentGateway.config(this.env);
  }

  private session() {
    try {
      this.app.use(
        session({
          resave: true,
          saveUninitialized: true,
          secret: this.env.sessionSecret,
        }),
      );
    } catch (err) {
      console.error('Session connection error.');
    }
  }

  private bodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private lusca() {
    this.app.use(lusca.xframe('SAMEORIGIN'));
    this.app.use(lusca.xssProtection(true));
  }

  private assets() {
    this.app.use(
      expressStatic(path.join(__dirname, 'assets'), { maxAge: 31557600000 }),
    );
  }

  /**
   * Error Handler. Provides full stack - disabled for production
   */
  private errorHandler() {
    if (this.env.production === false) {
      this.app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err,
        });
      });
    }
  }

  private logger() {
    morgan.token('local-date', () => this.formatDateWithTime(new Date()));
    morgan.token('remote-user', (req: any) =>
      req.user ? req.user.email : undefined,
    );
    morgan.token('error', (req: any) => req.error);

    this.app.use(
      morgan(
        ':local-date | :remote-user | :method :url | :response-time ms | :status :error',
        {
          skip: (req) => req.url.includes('favicon.ico'),
        },
      ),
    );
  }

  private formatDateWithTime(date: Date): string {
    const dateWithTimeOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };

    return new Intl.DateTimeFormat('default', dateWithTimeOptions).format(date);
  }
}
