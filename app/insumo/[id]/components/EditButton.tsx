'use client';

import { Button } from '@nextui-org/button';
import { ButtonHTMLAttributes } from 'react';

type EditButtonProps = {
    isEditable: boolean;
    onConfirmPress: () => void;
    onEditPress: () => void;
    formAction: ButtonHTMLAttributes<HTMLButtonElement>['formAction'];
};

function EditButton(props: EditButtonProps) {
    const { isEditable, onConfirmPress, onEditPress, formAction } = props;

    return isEditable ? (
        <Button
            onPress={onConfirmPress}
            color='primary'
        >
            Confirmar edición
        </Button>
    ) : (
        <Button
            variant='flat'
            onPress={onEditPress}
            formAction={formAction}
        >
            Editar
        </Button>
    );
}

export default EditButton;
