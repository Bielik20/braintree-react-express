import * as braintree from 'braintree';
import { BraintreeGateway, Transaction, ValidatedResponse } from 'braintree';

export interface PaymentGatewayEnv {
  production: boolean;
  payment: {
    merchantId: string;
    publicKey: string;
    privateKey: string;
  };
}

export class PaymentGateway {
  private static instance: PaymentGateway;

  static getInstance(): PaymentGateway {
    if (!PaymentGateway.instance) {
      throw new Error(
        'You must call PaymentGateway.config before getting instance',
      );
    }

    return PaymentGateway.instance;
  }

  static config(env: PaymentGatewayEnv) {
    const gateway = braintree.connect({
      environment: env.production
        ? braintree.Environment.Sandbox // TODO: add prod
        : braintree.Environment.Sandbox,
      merchantId: env.payment.merchantId,
      publicKey: env.payment.publicKey,
      privateKey: env.payment.privateKey,
    });

    PaymentGateway.instance = new PaymentGateway(gateway);
  }

  private constructor(private gateway: BraintreeGateway) {}

  async generateClientToken(customerId?: string): Promise<string> {
    const response = await this.gateway.clientToken.generate({
      customerId,
    });

    console.log('generateClientToken', response);

    return response.clientToken;
  }

  async sale(
    amount: string,
    paymentMethodNonce: string,
    deviceData?: string,
  ): Promise<ValidatedResponse<Transaction>> {
    const response = await this.gateway.transaction.sale({
      amount,
      paymentMethodNonce,
      deviceData,
      options: { submitForSettlement: true },
    });

    console.log('sale', response);

    return response;
  }

  async find(transactionId: string): Promise<Transaction> {
    const transaction = await this.gateway.transaction.find(transactionId);

    console.log('find', transaction);

    return transaction;
  }
}
