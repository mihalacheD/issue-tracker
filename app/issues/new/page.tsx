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


interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {

  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()
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
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field}/>}
         />
      <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage
