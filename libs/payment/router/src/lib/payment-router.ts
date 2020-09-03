import { PaymentGateway } from '@braintree-react-express/payment/gateway';
import { Router } from 'express';

export const paymentRouter = Router();

paymentRouter.get('/new', async (req, res) => {
  const gateway = PaymentGateway.getInstance();
  const token = await gateway.generateClientToken();

  res.send(token);
});

paymentRouter.get('/:id', async (req, res) => {
  const transactionId = req.params.id;
  const gateway = PaymentGateway.getInstance();
  const result = await gateway.find(transactionId);

  res.send(result);
});

paymentRouter.post('/', async (req, res) => {
  // In production you should not take amounts directly from clients
  const { amount, paymentMethodNonce } = req.body;
  console.log(req.body);
  const gateway = PaymentGateway.getInstance();
  const result = await gateway.sale(amount, paymentMethodNonce);

  res.send(result);
});
