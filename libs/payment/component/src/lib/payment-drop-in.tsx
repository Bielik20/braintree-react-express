import { Dropin } from 'braintree-web-drop-in';
import React from 'react';
import { BraintreeDropIn } from './braintree-drop-in';

interface PaymentDropInState {
  clientToken?: string;
}

export class PaymentDropIn extends React.Component<{}, PaymentDropInState> {
  state = {
    clientToken: undefined,
  };
  private instance: Dropin;

  async componentDidMount() {
    // Get a client token for authorization from your server
    const response = await fetch('/api/payment/new');
    const clientToken = await response.text();

    console.log('componentDidMount', response);

    this.setState({ clientToken });
  }

  async buy() {
    // Send the nonce to your server
    const { nonce } = await this.instance.requestPaymentMethod();

    const response = await fetch(`/api/payment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodNonce: nonce,
        amount: '10.00',
      }),
    });

    console.log('buy', response);

  }

  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div>
          <BraintreeDropIn
            options={{ authorization: this.state.clientToken }}
            onInstance={(instance) => (this.instance = instance)}
          />
          <button onClick={this.buy.bind(this)}>Buy</button>
        </div>
      );
    }
  }
}
