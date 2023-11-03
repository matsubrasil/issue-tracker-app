import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import { IssueStatusBadge } from '../../../components/ui/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'

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
  return (
    <>
      <div>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toLocaleDateString('pt-BR')}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </div>
    </>
  )
}
