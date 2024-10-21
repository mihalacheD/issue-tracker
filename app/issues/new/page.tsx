'use client'
import { Callout, TextField } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller, set } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import React from 'react'
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import { Text } from '@radix-ui/themes';
import ErrorMessage from '@/app/components/ErrorMessage';


type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {

  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError ] = useState('')

  return (
    <div className='max-w-xl space-y-3'>
     {error &&  <Callout.Root color='red'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root> }
    <form
        className='max-w-xl space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data),
            router.push('/issues')
          } catch (error) {
            setError('An unexpected error has occured.')
          }
})}>

      <TextField.Root placeholder='Title' >
        <TextField.Slot { ...register('title')}/>
      </TextField.Root>
      {errors.title && <ErrorMessage>{ errors.title.message}</ErrorMessage>}
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field}/>}
         />
         {errors.description && <ErrorMessage>{ errors.description.message }</ErrorMessage>}
      <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage
