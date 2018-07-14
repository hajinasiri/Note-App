import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default {
  Query: {
    allUsers: (parent, args, { models }) => models.User.findAll(),
    getUser: (parent, { username }, { models }) =>
      models.User.findOne({
        where: {
          username,
        },
      }),
  },

  Mutation: {
    updateUser: (parent, { username, newUsername }, { models }) =>
      models.User.update({ username: newUsername }, { where: { username } }),
    deleteUser: (parent, args, { models }) =>
      models.User.destroy({ where: args }),
    register: async (parent, args, { models }) => {
      const user = args;
      user.password = await bcrypt.hash(user.password, 12);
      return models.User.create(user);
    },

    login: async (parent, { email, password }, { models, SECRET }) => {
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Not user with that email');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Incorrect password');
      }

      // token = '12083098123414aslkjdasldf.asdhfaskjdh12982u793.asdlfjlaskdj10283491'
      // verify: needs secret | use me for authentication
      // decode: no secret | use me on the client side
      const token = jwt.sign(
        {
          user: _.pick(user, ['id', 'username']),
        },
        SECRET,
        {
          expiresIn: '1y',
        },
      );

      return token;
    },



  },
};