import React from 'react'
import Lead from './Lead'

export default function LeadList({ leads, deleteLead }) {
  return (
        leads.map(lead => {
          return (
            <Lead lead={lead} deleteLead={deleteLead} />
          )
        })
  );
}
