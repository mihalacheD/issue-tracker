'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const statuses: { label: string, value?: Status, id: string }[] = [
  { label: "All", id: 'all'},
  { label: "Open", value: 'OPEN', id: 'Open'},
  { label: "In Progress", value: 'IN_PROGRESS', id: 'In_Progress'},
  { label: "Closed", value: 'CLOSED', id: 'Closed'}
]

const IssueFilter = () => {

 const router =  useRouter()

  return (
    <Select.Root onValueChange={(status) => {
      const query = status === 'All' ? "" : `?status=${status}`;
      router.push('/issues/list' + query)
    }}>
      <Select.Trigger placeholder='Filter by status..'/>
      <Select.Content>
        {statuses.map(status => (
          <Select.Item key={status.id} value={status.value ?? 'All'}>
            {status.label}
          </Select.Item>))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueFilter
