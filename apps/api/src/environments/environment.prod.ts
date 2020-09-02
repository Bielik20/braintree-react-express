require('./json-env');

export const environment = {
  production: true,
  sessionSecret: '2390jf84c',
  payment: {
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  },
};
