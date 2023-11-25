import { Box } from '@radix-ui/themes'
import delay from 'delay'
import { Skeleton } from '@/components'

export default async function LoadingNewIssuePage() {
  await delay(4000)
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  )
}
