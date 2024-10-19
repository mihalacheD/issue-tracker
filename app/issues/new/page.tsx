'use client'
import { TextField } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import React from 'react'


interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {

  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()

  return (
    <form
        className='max-w-xl space-y-3'
        onSubmit={handleSubmit(async (data) => {
                        await axios.post('/api/issues', data),
                        router.push('/issues')
                        })}>

      <TextField.Root placeholder='Title' { ...register('title')}>
        <TextField.Slot />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field}/>}
         />
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
