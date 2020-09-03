import React, { ReactInstance } from 'react';
import ReactDOM from 'react-dom';
import BraintreeWebDropIn, { Dropin, Options } from 'braintree-web-drop-in';

export interface BraintreeDropInProps {
  options: Omit<Options, 'container'>;
  preselectVaultedPaymentMethod?: boolean;
  onInstance?: (instance: Dropin) => void;
  onNoPaymentMethodRequestable?: () => void;
  onPaymentMethodRequestable?: () => void;
  onPaymentOptionSelected?: () => void;
}

export class BraintreeDropIn extends React.Component<
  BraintreeDropInProps
> {
  static defaultProps = {
    preselectVaultedPaymentMethod: true,
    onInstance: () => undefined,
    onNoPaymentMethodRequestable: () => undefined,
    onPaymentMethodRequestable: () => undefined,
    onPaymentOptionSelected: () => undefined,
  };

  private wrapper: ReactInstance | undefined;
  private instance: Dropin;

  async componentDidMount() {
    this.instance = await BraintreeWebDropIn.create({
      container: ReactDOM.findDOMNode(this.wrapper),
      preselectVaultedPaymentMethod: this.props.preselectVaultedPaymentMethod,
      ...this.props.options,
    });

    this.instance.on(
      'noPaymentMethodRequestable',
      this.props.onNoPaymentMethodRequestable,
    );

    this.instance.on(
      'paymentMethodRequestable',
      this.props.onPaymentMethodRequestable,
    );

    this.instance.on(
      'paymentOptionSelected',
      this.props.onPaymentOptionSelected,
    );

    this.props.onInstance(this.instance);
  }

  async componentWillUnmount() {
    if (this.instance) {
      await this.instance.teardown();
    }
  }

  shouldComponentUpdate() {
    // Static
    return false;
  }

  render() {
    return <div ref={(ref) => (this.wrapper = ref)} />;
  }
}
