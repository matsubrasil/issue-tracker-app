'use client'
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes'

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="solid" color="red">
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description size="2">
          <Text as="p">Are you sure you want to delete this issue?</Text>
          <Text as="p">This action cannot be undone.</Text>
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
