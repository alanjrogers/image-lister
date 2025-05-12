import {Card, useDialog, Dialog, Portal} from '@chakra-ui/react';
import {Character} from '@/lib/types';
import Image from 'next/image';
import {FullCharacterCard} from '@/components/ui/FullCharacterCard';

interface CharacterCardProps {
  index: number;
  character: Character;
}

// Simple CharacterCard component to display in the ImageGrid
export const CharacterCard = ({index, character}: CharacterCardProps) => {
  const dialog = useDialog();

  const handleCardClick = () => {
    dialog.setOpen(true);
  };

  return (
    <>
      <Card.Root key={index} onClick={handleCardClick} cursor="pointer">
        <Card.Header>
          <Image
            src={character.image}
            width={300}
            height={300}
            alt={character.name}
          />
          <Card.Title>{character.name}</Card.Title>
        </Card.Header>
      </Card.Root>
      <Dialog.RootProvider value={dialog} size="lg" placement="center">
        <Dialog.Backdrop />
        <Portal>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.CloseTrigger />
              <FullCharacterCard character={character} />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </>
  );
};
