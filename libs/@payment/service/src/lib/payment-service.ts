import { Dropin } from 'braintree-web-drop-in';

export class PaymentService {
  /**
   * Get a client token for authorization from your server
   */
  static async createClientToken(): Promise<string> {
    const response = await fetch('/api/payment/new');
    const clientToken = await response.text();

    console.log('createClientToken', response);

    return clientToken;
  }

  constructor(private instance: Dropin) {}

  /**
   * Send the nonce to your server
   */
  async pay(amount: string): Promise<void> {
    const { nonce } = await this.instance.requestPaymentMethod();
    const response = await fetch(`/api/payment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodNonce: nonce,
        amount,
      }),
    });

    console.log('pay', response);
  }
}
