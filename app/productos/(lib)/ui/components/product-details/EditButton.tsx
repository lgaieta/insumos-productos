'use client';

import { Button } from '@nextui-org/button';
import { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

type EditButtonProps = {
    isEditable: boolean;
    onEditPress: () => void;
    formAction: ButtonHTMLAttributes<HTMLButtonElement>['formAction'];
};

function ConfirmButton(props: {
    formAction: ButtonHTMLAttributes<HTMLButtonElement>['formAction'];
}) {
    const { pending } = useFormStatus();

    return (
        <Button
            color='primary'
            type='submit'
            isLoading={pending}
            isDisabled={pending}
            formAction={props.formAction}
        >
            {pending ? 'Cargando' : 'Confirmar edición'}
        </Button>
    );
}

function EditButton(props: EditButtonProps) {
    const { isEditable, onEditPress, formAction } = props;

    return isEditable ? (
        <ConfirmButton formAction={formAction} />
    ) : (
        <Button
            variant='flat'
            onPress={onEditPress}
        >
            Editar
        </Button>
    );
}

export default EditButton;
