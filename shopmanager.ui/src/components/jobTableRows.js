import React from 'react';
import { Button } from 'react-bootstrap';

/* eslint-disable react/prop-types */

export default function JobTableRow({
  job,
  removeJob,
  changeRouteUpdate,
  changeRouteSingleView
}) {
  return (
    <tr>
      <td>{job.jobName}</td>
      <td>{job.customer}</td>
      <td>
        <Button onClick={() => changeRouteUpdate(job.id)}>Update</Button>
      </td>
      <td>
        <Button variant='info' onClick={() => changeRouteSingleView(job.id)}>View</Button>
      </td>
      <td>
        <Button variant='danger' onClick={() => removeJob(job.id)}>Delete</Button>
      </td>
    </tr>
  );
}
