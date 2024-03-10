import Product from '@common/entities/Product';
import { editProductServerAction } from '@productos-detalles/actions/editProductServerAction';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export const useEditProduct = (product: Product) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const editProductServerActionWithId = editProductServerAction.bind(null, product.id);

    const [state, editFormActionRaw] = useFormState(editProductServerActionWithId, {
        errors: {},
    });

    const editFormAction = (formData: FormData) => {
        editFormActionRaw(formData);
        setIsEditable(false);
    };

    return { editFormAction, isEditable, setIsEditable, formState: state };
};
