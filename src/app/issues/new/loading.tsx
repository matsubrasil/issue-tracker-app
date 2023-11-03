import { Box } from '@radix-ui/themes'
import delay from 'delay'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default async function LoadingNewIssuePage() {
  await delay(4000)
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  )
}
