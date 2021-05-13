import React, { useState, useRef, useEffect } from 'react';
import uuidv4 from 'uuid/v4';
import { Button,  TextField, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import LeadList from './LeadList';

const API_URL = 'http://127.0.0.1:8000'

function App() {
  const [leads, setLeads] = useState([])
  const leadNameRef = useRef()
  const leadEmailRef = useRef()
  const leadPhoneRef = useRef()

  async function fetchData() {
    try {
      const res = await fetch(`${API_URL}/leads/`, {
        headers: new Headers({
          'Accept': 'application/json'
        })
      });
      const leads = await res.json();

      if (leads) {
        setLeads(leads)
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  async function handleAddLead(e) {
    const name = leadNameRef.current.value;
    const email = leadEmailRef.current.value;
    const phone = leadPhoneRef.current.value;

    if (name === '') {
      return;
    }
    
    try {
      const res = await fetch(`${API_URL}/leads/`, {
        method: 'POST',
        body: JSON.stringify({
          id: uuidv4(),
          name: name, 
          email: email,
          phone: phone,
        }),
      });
      
      if (res.status === 200) {
        await fetchData();
      } else {
        throw Error(res.statusText);
      }
    } catch (e) {
      console.log(e);
    }

    leadNameRef.current.value = null;
    leadEmailRef.current.value = null;
    leadPhoneRef.current.value = null;
  }

  async function handleDeleteLead(deleteLead) {
    try {
      const res = await fetch(`${API_URL}/leads/${deleteLead.id}/`, {
        method: 'DELETE',
      });
      
      if (res.status === 200) {
        await fetchData();
      } else {
        // error only thrown if ID doesn't exist in db
        // DELETE requests are only fired for IDs that do exist in db, so this is just for safety
        throw Error(res.statusText); 
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <TableContainer>
      <TableHead>
        <TableRow>
          <TableCell>Name/Visitor ID</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <LeadList leads={leads} deleteLead={handleDeleteLead} />
      <TableRow>
        <TableCell>
          <TextField inputRef={leadNameRef} type="text" />
        </TableCell>
        <TableCell>
          <TextField inputRef={leadEmailRef} type="text" />
        </TableCell>
        <TableCell>
          <TextField inputRef={leadPhoneRef} type="text" />
        </TableCell>
        <TableCell>
          <Button onClick={handleAddLead}> + Add Lead </Button>
        </TableCell>
      </TableRow>
    </TableContainer>
  )
}

export default App;
