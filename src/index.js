import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider} from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';

import Routes from './routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';





// const link = new HttpLink( {uri:'http://localhost:4000/graphql'} );

// link.use([{
//   applyMiddleware(req, next) {
//     if (!req.options.headers) {
//       req.options.headers = {};
//     }
//     req.options.headers['x-token'] = localStorage.getItem('token');
//     next();
//   }
// }]);

// const client = new ApolloClient({
//   link: link,
//   cache: new InMemoryCache()
// })




const httpLink = new HttpLink( {uri:'http://localhost:4000/graphql'} );

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      token: localStorage.getItem('token') || null,
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});






 const App = () => (
  <ApolloProvider client = {client}>
    <Routes />
  </ApolloProvider>
 );

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
