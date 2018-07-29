import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider} from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';


import Routes from './routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

//const httpLink = createHttpLink ({uri:'http://localhost:4000/graphql',});
const httpLink = new HttpLink({uri:'http://localhost:4000/graphql',});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await localStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  let result = {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    }
  };

  console.log('result:', result);
  console.log('link:', result.concat(httpLink));

  return result;
});




const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});





 const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
 );

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();





