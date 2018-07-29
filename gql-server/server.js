import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';
import SEC from '../secret.json';


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const SECRET = SEC.SECRET;

//To get the token from header and verify it
//The response {user} will be the data we passed in resolver meaninig user: _.pick(user, ['id', 'username'])
//and we will pass it to the graphql request down in this file
const addUser = async (req) => {
  const token = req.headers.authorization;
  try {
    const { user } = await jwt.verify(token, SECRET);
    req.user = user;
  } catch (err) {
    console.log(err);
  }
  req.next();
};


// enable cors for authentication
var corsOptions = {
  origin: '<http://localhost:3002/>',
  credentials: true // <-- REQUIRED backend setting
};
const app = express();

app.use(cors('*'));

app.use(addUser);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      SECRET,
      user: req.user,
    },
  })),
);

models.sequelize.sync().then(() => app.listen(4000));

