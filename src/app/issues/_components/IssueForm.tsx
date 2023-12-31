'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { issueSchema } from '@/app/validationSchemas'
import { ErrorMessage, Spinner } from '@/components'
import 'easymde/dist/easymde.min.css'
// import dynamic from 'next/dynamic'
import { Issue } from '@prisma/client'
import SimpleMDE from 'react-simplemde-editor'
// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
//   ssr: false,
// })

type IssueFormData = z.infer<typeof issueSchema>

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onHandleSubmit(data: IssueFormData) {
    try {
      // console.log('data', data)
      setIsSubmitting(true)

      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data)
      } else {
        await axios.post('/api/issues', data)
      }

      router.push('/issues')
      router.refresh()
    } catch (error) {
      // console.log(error)
      setIsSubmitting(false)
      setError('An expected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // console.log('description ==> ', register('description'))
  // console.log('formState', errors)
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        onSubmit={handleSubmit((data) => onHandleSubmit(data))}
        className=" space-y-3"
      >
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}
