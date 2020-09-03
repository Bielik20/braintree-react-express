import { PaymentDropIn } from '@braintree-react-express/@payment/component';
import React from 'react';

export const App = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to Braintree React Express!</h1>
      <PaymentDropIn />
    </div>
  );
};

export default App;
