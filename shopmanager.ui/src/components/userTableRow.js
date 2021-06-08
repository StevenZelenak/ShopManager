import React from 'react';
import { Button } from 'react-bootstrap';

/* eslint-disable react/prop-types */

export default function UserTableRow({ user, removeUser, changeRouteUpdate }) {
  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>
        <Button onClick={() => changeRouteUpdate(user.id)}>Update</Button>
      </td>
      <td>
        <Button variant='info'>View</Button>
      </td>
      <td>
        <Button variant='danger' onClick={() => removeUser(user.id)}>Delete</Button>
      </td>
    </tr>
  );
}
