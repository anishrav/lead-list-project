import { Button, TableCell, TableRow } from '@material-ui/core'
import React from 'react'

export default function Lead({ lead, deleteLead }) {
  
  return (
    <TableRow>
      <TableCell>
        <label> {lead.name} </label>
      </TableCell>
      <TableCell>
        <label> {lead.email} </label>
      </TableCell>
      <TableCell>
        <label> {lead.phone} </label>
      </TableCell>
      <TableCell>
        <Button onClick={() => deleteLead(lead)}> X DELETE </Button>
      </TableCell> 
    </TableRow>
  )
}
