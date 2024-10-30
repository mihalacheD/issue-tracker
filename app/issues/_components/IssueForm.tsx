'use client';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'),
                                { ssr: false } );




type IssueFormData = z.infer<typeof issueSchema>

interface Props {
  issue?: Issue
}

const IssueForm = ({ issue }: Props) => {

  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const [error, setError ] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      if(issue)
        await axios.patch("/api/issues/" + issue.id, data)
      else
      await axios.post("/api/issues", data);
      router.push('/issues')
      router.refresh();
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

      <TextField.Root defaultValue={issue?.title} placeholder='Title' { ...register('title')} >
        <TextField.Slot />
      </TextField.Root>
      <ErrorMessage>{ errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => {
          const { ref, ...rest } = field; // removes ref
          return <SimpleMDE placeholder="Enter the description" {...rest} />;
        }}
      />
         <ErrorMessage>{ errors.description?.message }</ErrorMessage>
      <Button disabled={isSubmitting}>
        { issue ? 'Update Issue' : 'Submit New Issue'}{' '}
        {isSubmitting && <Spinner/>}</Button>
    </form>
    </div>
  )
}

export default IssueForm;
