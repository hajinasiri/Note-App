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

//To get the token from header and verify it
//The response {user} will be the data we passed in resolver meaninig user: _.pick(user, ['id', 'username'])
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
app.use(addUser);

const SECRET = SEC.SECRET;

const app = express();

app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *


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