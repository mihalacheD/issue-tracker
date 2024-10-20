'use client';
import { Callout, TextField, Button } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'),
                                { ssr: false } );
import { useForm, Controller, set } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import React from 'react'
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import Spinner from '@/app/components/Spinner';
import ErrorMessage from '@/app/components/ErrorMessage';



type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {

  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError ] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      await axios.post("/api/issues", data);
      router.push('/issues')
    } catch (error) {
      setSubmitting(false)
      setError('An unexpected error has occured.')
    }
  });

  return (
    <div className='max-w-xl space-y-3'>
     {error &&  (
      <Callout.Root color='red'>
          <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
    )}
    <form
        className='max-w-xl space-y-3'
        onSubmit={onSubmit}>

      <TextField.Root placeholder='Title' { ...register('title')} >
        <TextField.Slot />
      </TextField.Root>
      <ErrorMessage>{ errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          const { ref, ...rest } = field; // removes ref
          return <SimpleMDE placeholder="Enter the description" {...rest} />;
        }}
      />
         <ErrorMessage>{ errors.description?.message }</ErrorMessage>
      <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
    </form>
    </div>
  )
}

export default NewIssuePage;
