import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { IssueStatusBadge } from '../../../components/ui/IssueStatusBadge'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

// import delay from 'delay'

interface Props {
  params: {
    id: string
  }
}

export default async function IssueDetailPage({ params }: Props) {
  if (typeof params.id === 'string' && isNaN(+params.id)) notFound()

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  if (!issue) {
    return notFound()
  }

  // await delay(2000)

  return (
    <>
      <Grid columns={{ initial: '1', md: '2' }} gap="5">
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex gap="3" my="2">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toLocaleDateString('pt-BR')}</Text>
          </Flex>
          <Card className="prose" mt="4">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Box>
          <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
        </Box>
      </Grid>
    </>
  )
}
