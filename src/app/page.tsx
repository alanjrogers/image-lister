'use client';

import {ImageGrid} from '@/components/ui/ImageGrid';
import {
  Box,
  Dialog,
  Flex,
  Heading,
  Avatar,
  Spacer,
  Menu,
  useDialog,
} from '@chakra-ui/react';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {UserInfoDialog} from '@/components/ui/UserInfoDialog';
import type {UserInfo} from '@/lib/types';
import {loadUserInfo, saveUserInfo} from '@/lib/user-info';
import {useSearchParams} from 'next/navigation'; // Added import

export default function Home() {
  const dialog = useDialog();
  const searchParams = useSearchParams(); // Added hook to get search params

  // Determine page number from URL search params, default to 1
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;

  // Initialize userInfo directly from localStorage
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(() => {
    return loadUserInfo();
  });

  // Log when component mounts (for debugging)
  useEffect(() => {
    console.log('Home component mounted, userInfo:', userInfo);

    if (userInfo === undefined) {
      dialog.setOpen(true); // Open dialog if no user info
    }
  }, [userInfo, dialog]);

  function handleSaveUserInfo(newUserInfo: UserInfo) {
    saveUserInfo(newUserInfo);
    setUserInfo(newUserInfo);
  }

  const handleChangeDetails = () => {
    dialog.setOpen(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('image-lister-user-info');
    setUserInfo(undefined);
    dialog.setOpen(true); // Open dialog to re-enter user info
  };

  return (
    <Flex direction="column" minHeight="100vh">
      <Box as="header" bg="gray.200" pt="4" pr="4" pb="4">
        <Flex align="center">
          <Heading size="md" pl="4">
            Information Page
          </Heading>
          <Spacer />
          <Menu.Root>
            <Menu.Trigger asChild>
              <Avatar.Root cursor="pointer">
                <Avatar.Fallback name={userInfo?.username} />
              </Avatar.Root>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="change-details" onClick={handleChangeDetails}>
                  Change details
                </Menu.Item>
                <Menu.Item value="sign-out" onClick={handleSignOut}>
                  Sign out
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </Flex>
      </Box>
      <Box as="main" flex="1" pb="80px">
        <Dialog.RootProvider value={dialog} size="lg" placement="center">
          <UserInfoDialog
            initialUserInfo={userInfo}
            onSave={handleSaveUserInfo}
          />
        </Dialog.RootProvider>
        {userInfo === undefined ? null : <ImageGrid page={currentPage} />}
      </Box>
      <Box
        as="footer"
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        p="4"
        bg="gray.100"
        textAlign="center"
        zIndex="sticky"
      >
        <p>Challenge Brief (v3.5)</p>

        <a
          href="https://linkedin.com/in/alanjrogers"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/InBug-Black.png"
            alt="LinkedIn Logo"
            width={16}
            height={16}
            style={{display: 'inline-block', marginRight: '4px'}}
          />
          Alan Rogers (LinkedIn) →
        </a>
      </Box>
    </Flex>
  );
}
