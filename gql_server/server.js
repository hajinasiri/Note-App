import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

import cors from 'cors';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const SECRET = 'sdjfkdlkj453958ekjlk468094kj09';

const app = express();

app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *


app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    SECRET,
  }),
);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, context:{models}}),
);

models.sequelize.sync().then(() => app.listen(4000));