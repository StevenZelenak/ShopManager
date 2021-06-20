import React from 'react';

/* eslint-disable react/prop-types */

export default function PartTableRowUser({
  part,
}) {
  return (
    <tr>
      <td>{ part.partName }</td>
      <td>{ part.materialType }</td>
    </tr>
  );
}
