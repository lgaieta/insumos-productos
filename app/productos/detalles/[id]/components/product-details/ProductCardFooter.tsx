import { CardFooter } from '@nextui-org/card';
import DeleteButton from '@productos/detalles/[id]/components/product-details/DeleteButton';
import EditButton from '@productos/detalles/[id]/components/product-details/EditButton';
import { ButtonHTMLAttributes } from 'react';

type ProductCardFooterProps = {
    isEditable: boolean;
    onEditPress: () => void;
    editFormAction: ButtonHTMLAttributes<HTMLButtonElement>['formAction'];
    onDeletePress: () => void;
};

function ProductCardFooter(props: ProductCardFooterProps) {
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

export default ProductCardFooter;
