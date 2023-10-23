'use client'
import { Button, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

interface IssueForm {
  title: string
  description: string
}

export default function NewIssuePage() {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()
  // console.log(register('title'))

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data)
        router.push('/issues')
      })}
      className="max-w-xl space-y-3"
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register('title')} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  )
}
