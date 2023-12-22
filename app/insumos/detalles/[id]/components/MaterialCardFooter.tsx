import { CardFooter } from '@nextui-org/card';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { ButtonHTMLAttributes } from 'react';

type MaterialCardFooterProps = {
    isEditable: boolean;
    onEditPress: () => void;
    editFormAction: ButtonHTMLAttributes<HTMLButtonElement>['formAction'];
    onDeletePress: () => void;
};

function MaterialCardFooter(props: MaterialCardFooterProps) {
    return (
        <CardFooter className='w-full gap-2 justify-end'>
            <EditButton
                isEditable={props.isEditable}
                onEditPress={props.onEditPress}
                formAction={props.editFormAction}
            />
            <DeleteButton
                isEditing={props.isEditable}
                onPress={props.onDeletePress}
            />
        </CardFooter>
    );
}

export default MaterialCardFooter;
