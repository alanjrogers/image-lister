'use client';

import {ChakraProvider, defaultSystem} from '@chakra-ui/react';
import {ColorModeProvider, type ColorModeProviderProps} from './color-mode';

// Providers for Chakra UI and Next.js themes
export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
