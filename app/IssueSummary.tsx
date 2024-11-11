import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
  open: number,
  inProgress: number,
  closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {

  const statusContainers: {
    label: string,
    value: number,
    status: Status
  }[] = [
    { label: "Open Issue", value: open, status: 'OPEN'},
    { label: "In-progress  Issue", value: inProgress, status: 'IN_PROGRESS'},
    { label: "Closed Issue", value: closed, status: 'CLOSED'}
  ]
  return (
    <Flex gap='4'>
      {statusContainers.map(statusContainer => (
        <Card key={statusContainer.label}>
          <Flex direction='column' gap='1'>
            <Link
              className='text-sm font-medium'
              href={`/issues/list?status=${statusContainer.status}`}>
                 {statusContainer.label}
            </Link>
            <Text size='5' className='font-bold'>{statusContainer.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary
