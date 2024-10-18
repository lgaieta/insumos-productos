'use client';
import { Button, useDisclosure } from '@nextui-org/react';
import IngredientsModal from '@productos/(lib)/ui/components/ingredients-modal/IngredientsModal';

function IngredientsListOpenModalButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                variant='flat'
                onPress={onOpen}
            >
                Añadir ingrediente
            </Button>
            <IngredientsModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
}

export default IngredientsListOpenModalButton;
