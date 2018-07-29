import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import { compose } from 'react-apollo';


const user = ({ id, username }) => (
  <h1 key={id} >{username}</h1>
);

const Auth = ({ data: { allUsers = [] } }) => (
  <div>

    {allUsers.map(user)}

  </div>
);

const allUsers = gql`
{
  allUsers {
    id
    username
  }
}
`;

const me = gql`
{
  me{
    id
    username
  }
}
`;



export default graphql(me)(Auth);


// export default compose(
//    graphql(allUsers),
//    graphql(me),
// )(Auth);