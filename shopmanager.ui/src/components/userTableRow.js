import React from 'react';
import { Button } from 'react-bootstrap';

/* eslint-disable react/prop-types */

export default function UserTableRow({ user, removeUser }) {
  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>
        <Button>Update</Button>
      </td>
      <td>
        <Button>View</Button>
      </td>
      <td>
        <Button variant='danger' onClick={() => removeUser(user.id)}>Delete</Button>
      </td>
    </tr>
  );
}
