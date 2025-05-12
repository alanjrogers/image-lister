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
import {useState, useEffect, use} from 'react'; // Added 'use'
import {UserInfoDialog} from '@/components/ui/UserInfoDialog';
import type {UserInfo} from '@/lib/types';
import {loadUserInfo, saveUserInfo} from '@/lib/user-info';
import {useRouter} from 'next/navigation';

// Define the expected shape of the resolved params
interface ResolvedPageParams {
  page: string;
}

// Props type for the component, indicating params is a Promise
interface PageProps {
  params: Promise<ResolvedPageParams>;
}

export default function Page({ params: paramsPromise }: PageProps) {
  // Use React.use to unwrap the params Promise
  const actualParams = use(paramsPromise);

  const router = useRouter();
  const dialog = useDialog();

  const pageStr = actualParams.page; // Use unwrapped params
  let derivedPage = parseInt(pageStr, 10);

  // Validate and set a default page number if the URL parameter is invalid
  if (isNaN(derivedPage) || derivedPage < 1) {
    derivedPage = 1;
  }

  useEffect(() => {
    // Redirect to the canonical URL if the param was invalid or not in its simplest form
    // e.g., /abc -> /1, /0 -> /1, /01 -> /1
    if (actualParams.page !== String(derivedPage)) { // Use unwrapped params
      router.replace(`/${derivedPage}`);
    }
  }, [actualParams.page, derivedPage, router]); // Use unwrapped params in dependency array

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(() => {
    return loadUserInfo();
  });

  useEffect(() => {
    console.log('Page component mounted, userInfo:', userInfo, 'page:', derivedPage);
    if (userInfo === undefined) {
      dialog.setOpen(true);
    }
  }, [userInfo, dialog, derivedPage]);

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
    dialog.setOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/${newPage}`); // Update the URL path
  };

  // If a redirect is determined to be needed by the useEffect above, 
  // returning null here prevents rendering the old page content momentarily.
  if (actualParams.page !== String(derivedPage)) { // Use unwrapped params
    return null; // Or a loading indicator
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
        {userInfo === undefined ? null : <ImageGrid page={derivedPage} onPageChange={handlePageChange} />}
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
