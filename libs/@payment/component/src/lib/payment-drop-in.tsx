import { PaymentService } from '@braintree-react-express/@payment/service';
import React from 'react';
import { BraintreeDropIn } from './braintree-drop-in';

interface PaymentDropInState {
  clientToken?: string;
}

export class PaymentDropIn extends React.Component<{}, PaymentDropInState> {
  state = { clientToken: undefined };
  private service: PaymentService;

  async componentDidMount() {
    const clientToken = await PaymentService.createClientToken();

    this.setState({ clientToken });
  }

  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    } else {
      return (
        <div>
          <BraintreeDropIn
            options={{ authorization: this.state.clientToken }}
            onInstance={(instance) =>
              (this.service = new PaymentService(instance))
            }
          />
          <button onClick={() => this.service.pay('10.00')}>Buy</button>
        </div>
      );
    }
  }
}
