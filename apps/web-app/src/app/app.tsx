import { Message } from '@braintree-react-express/api-interfaces';
import { PaymentDropIn } from '@braintree-react-express/payment/component';
import React, { useEffect, useState } from 'react';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to web-app!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
        />
      </div>
      <div>{m.message}</div>
      <PaymentDropIn />
    </>
  );
};

export default App;
