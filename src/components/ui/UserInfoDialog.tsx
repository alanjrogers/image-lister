import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  useDialog,
} from '@chakra-ui/react';
import {useState, useEffect, useCallback} from 'react';
import type {UserInfo} from '@/lib/types';

interface UserInfoDialogProps {
  initialUserInfo?: UserInfo;
  onSave: (userInfo: UserInfo) => void;
}

// "login" dialog for the user to enter their username and job title
export const UserInfoDialog = ({
  initialUserInfo,
  onSave,
}: UserInfoDialogProps) => {
  const dialog = useDialog();

  const [username, setUsername] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    if (initialUserInfo) {
      setUsername(initialUserInfo.username || '');
      setJobTitle(initialUserInfo.jobTitle || '');
    }
  }, [initialUserInfo]);

  const handleContinue = useCallback(() => {
    const newUserInfo = {username, jobTitle};
    onSave(newUserInfo);
    dialog.setOpen(false);
  }, [dialog, username, jobTitle, onSave]);

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content padding="4">
          <Dialog.Header pb="4">
            <Dialog.Title>User Details</Dialog.Title>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Header>
          <Dialog.Body pb="4">
            <Stack gap="4">
              <Field.Root>
                <Field.Label>Username</Field.Label>
                <Input
                  placeholder="johnnyappleseed"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Job Title</Field.Label>
                <Input
                  placeholder="Apple Tree Planter"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </Field.Root>
            </Stack>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button padding={4} onClick={handleContinue}>
                Continue
              </Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};
