import { paymentRouter } from '@braintree-react-express/payment/router';
import { Express } from 'express';

export class ApiRouters {
  constructor(private app: Express) {}

  make() {
    this.app.use('/api/payment', paymentRouter);
  }
}
