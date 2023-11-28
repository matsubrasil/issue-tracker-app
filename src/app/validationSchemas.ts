import { z } from 'zod'

export const issueSchema = z.object({
  title: z.string().min(1, { message: 'Title is Required' }).max(255),
  description: z.string().min(1, { message: 'Description is Required' }),
})
