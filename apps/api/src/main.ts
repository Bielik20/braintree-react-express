import { Message } from '@braintree-react-express/api-interfaces';
import { ApiConfig } from '@braintree-react-express/api/config';
import * as express from 'express';
import { environment } from './environments/environment';

const app = express();

new ApiConfig(app, environment).make();

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
