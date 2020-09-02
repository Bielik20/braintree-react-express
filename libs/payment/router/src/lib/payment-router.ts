import { PaymentGateway } from '@braintree-react-express/payment/gateway';
import { Router } from 'express';

export const paymentRouter = Router();

paymentRouter.get('/', (req, res) => {
  res.redirect('/checkouts/new');
});

paymentRouter.get('/checkouts/new', async (req, res) => {
  const gateway = PaymentGateway.getInstance();
  const token = await gateway.generateClientToken('TODO');

  res.send(token);
});

paymentRouter.get('/checkouts/:id', async (req, res) => {
  const transactionId = req.params.id;
  const gateway = PaymentGateway.getInstance();
  const result = await gateway.find(transactionId);

  res.send(result);
});

paymentRouter.post('/checkouts', async (req, res) => {
  // In production you should not take amounts directly from clients
  const { amount, paymentMethodNonce } = req.body;
  const gateway = PaymentGateway.getInstance();
  const result = await gateway.sale(amount, paymentMethodNonce);

  res.send(result);
});
