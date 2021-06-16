import React from 'react';
import { Button } from 'react-bootstrap';

/* eslint-disable react/prop-types */

export default function JobTableRow({
  part,
  removePart,
  changeRouteUpdate,
  changeRouteSingleView
}) {
  return (
    <tr>
      <td>{ part.partName }</td>
      <td>
        <Button onClick={() => changeRouteUpdate(part.id)}>Update</Button>
      </td>
      <td>
        <Button variant='info' onClick={() => changeRouteSingleView(part.id)}>View</Button>
      </td>
      <td>
        <Button variant='danger' onClick={() => removePart(part.id)}>Delete</Button>
      </td>
    </tr>
  );
}
