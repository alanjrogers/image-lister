'use client';

import {Images} from '@/components/ui/images';
import {
  Box,
  Dialog,
  Flex,
  Heading,
  Avatar,
  Spacer,
  Menu,
} from '@chakra-ui/react';
import Image from 'next/image';
import {useState, useEffect} from 'react'; // Added useEffect
import {UserInfoDialog} from '@/components/ui/UserInfoDialog';
import type {UserInfo} from '@/lib/types';
import {loadUserInfo, saveUserInfo} from '@/lib/user-info'; // Added imports

export default function Home() {
  // Initialize userInfo directly from localStorage
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(() => {
    return loadUserInfo();
  });

  // Set dialog open state based on whether we have user info
  const [userInfoDialogOpen, setUserInfoDialogOpen] = useState(() => {
    // Only run on client side
    return !loadUserInfo(); // Dialog open if NO user info
  });

  // Log when component mounts (for debugging)
  useEffect(() => {
    console.log('Home component mounted, userInfo:', userInfo);
    console.log('Dialog open:', userInfoDialogOpen);
  }, [userInfo, userInfoDialogOpen]);

  const handleSaveUserInfo = (newUserInfo: UserInfo) => {
    saveUserInfo(newUserInfo);
    setUserInfo(newUserInfo);
    setUserInfoDialogOpen(false); // Close dialog on save
  };

  const handleCloseDialog = () => {
    setUserInfoDialogOpen(false);
  };

  const handleChangeDetails = () => {
    setUserInfoDialogOpen(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('image-lister-user-info');
    setUserInfo(undefined);
    // redirect to home
    window.location.href = '/';
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
        <Dialog.Root
          size="lg"
          placement="center"
          motionPreset="slide-in-bottom"
          open={userInfoDialogOpen}
          closeOnEscape={false}
        >
          <UserInfoDialog
            initialUserInfo={userInfo}
            onSave={handleSaveUserInfo}
            onClose={handleCloseDialog}
          />
          {userInfo === undefined ? null : <Images />}
        </Dialog.Root>
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
