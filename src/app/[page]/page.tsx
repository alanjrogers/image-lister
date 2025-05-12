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
  Portal,
} from '@chakra-ui/react';
import Image from 'next/image';
import {useState, useEffect, use} from 'react';
import {UserInfoDialog} from '@/components/ui/UserInfoDialog';
import type {UserInfo} from '@/lib/types';
import {loadUserInfo, saveUserInfo} from '@/lib/user-info';
import {useRouter} from 'next/navigation';

interface ResolvedPageParams {
  page: string;
}

interface PageProps {
  params: Promise<ResolvedPageParams>;
}

export default function Page({params: paramsPromise}: PageProps) {
  // Use the promise to get resolved params
  const actualParams = use(paramsPromise);

  const router = useRouter();
  const dialog = useDialog();

  const pageStr = actualParams.page;
  let derivedPage = parseInt(pageStr, 10);

  // Validate and set a default page number if the URL parameter is invalid
  if (isNaN(derivedPage) || derivedPage < 1) {
    derivedPage = 1;
  }

  useEffect(() => {
    // Redirect to the canonical URL if the param was invalid or not in its simplest form
    // e.g., /abc -> /1, /0 -> /1, /01 -> /1
    if (actualParams.page !== String(derivedPage)) {
      // Use unwrapped params
      router.replace(`/${derivedPage}`);
    }
  }, [actualParams.page, derivedPage, router]);

  // Load user info from local storage into state
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(() => {
    return loadUserInfo();
  });

  // Open 'login' dialog if user info is not present
  useEffect(() => {
    if (userInfo === undefined) {
      dialog.setOpen(true);
    }
  }, [userInfo, dialog]);

  // Save user info to local storage and update state
  function handleSaveUserInfo(newUserInfo: UserInfo) {
    saveUserInfo(newUserInfo);
    setUserInfo(newUserInfo);
  }

  // Show the dialog to change user details from the Avatar menu
  const handleChangeDetails = () => {
    dialog.setOpen(true);
  };

  // 'sign out' aka clear user info from local storage and state (triggered via Avatar menu)
  const handleSignOut = () => {
    localStorage.removeItem('image-lister-user-info');
    setUserInfo(undefined);
    dialog.setOpen(true);
  };

  // When the page changes, update the URL
  const handlePageChange = (newPage: number) => {
    router.push(`/${newPage}`); // Update the URL path
  };

  // If a redirect is determined to be needed by the useEffect above,
  // returning null here prevents rendering the old page content momentarily.
  if (actualParams.page !== String(derivedPage)) {
    return null;
  }

  return (
    <Flex direction="column" minHeight="100vh">
      <Box as="header" bg="gray.200" pt="4" pr="4" pb="4">
        <Flex align="center">
          <Heading size="md" pl="4">
            Information Page
          </Heading>
          <Spacer />
          <Menu.Root>
            <Menu.Trigger>
              <Avatar.Root>
                <Avatar.Fallback name={userInfo?.username} />
              </Avatar.Root>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="change-details"
                    onClick={handleChangeDetails}
                  >
                    {userInfo !== undefined
                      ? 'Change details'
                      : 'Sign in to continue'}
                  </Menu.Item>
                  {userInfo !== undefined ? (
                    <Menu.Item value="sign-out" onClick={handleSignOut}>
                      Sign out
                    </Menu.Item>
                  ) : null}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
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
        // Only render images when userInfo is present
        {userInfo === undefined ? null : (
          <ImageGrid page={derivedPage} onPageChange={handlePageChange} />
        )}
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
