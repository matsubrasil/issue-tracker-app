'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { createIssueSchema } from '@/app/validationSchemas'
import { ErrorMessage } from '@/components/errorMessageForm/errorMessage'
import { Spinner } from '@/components/ui/Spinner'
// import SimpleMDE from 'react-simplemde-editor'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type IssueForm = z.infer<typeof createIssueSchema>

// interface IssueForm {
//   title: string
//   description: string
// }

export default function NewIssuePage() {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  console.log(register('description'))
  console.log('formState', errors)
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            console.log(data)
            setIsSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            console.log(error)
            setIsSubmitting(false)
            setError('An expected error occurred.')
          } finally {
            setIsSubmitting(false)
          }
        })}
        className=" space-y-3"
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field, formState, fieldState }) => (
            <SimpleMDE
              placeholder="Description"
              {...field}
              {...formState}
              {...fieldState}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}
