import {
  Button,
  // CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import type {UserInfo} from '@/lib/types';

interface UserInfoDialogProps {
  initialUserInfo?: UserInfo; // Changed from userInfo, made optional
  onSave: (userInfo: UserInfo) => void; // Callback to save data
  onClose: () => void; // Callback to close the dialog
}

export const UserInfoDialog = ({
  initialUserInfo,
  onSave,
  onClose,
}: UserInfoDialogProps) => {
  const [username, setUsername] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    if (initialUserInfo) {
      setUsername(initialUserInfo.username || '');
      setJobTitle(initialUserInfo.jobTitle || '');
    }
  }, [initialUserInfo]);

  const handleContinue = () => {
    const newUserInfo = {username, jobTitle};
    onSave(newUserInfo); // Pass data to parent for saving
    onClose(); // Tell parent to close the dialog
  };

  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>User Details</Dialog.Title>
            {/* <Dialog.CloseTrigger asChild> */}
            {/* <CloseButton size="sm" /> */}
            {/* </Dialog.CloseTrigger> */}
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
              <Button onClick={handleContinue}>Continue</Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};
