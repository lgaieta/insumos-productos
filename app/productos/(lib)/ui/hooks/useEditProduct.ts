import Product from '@common/entities/Product';
import { editProductServerAction } from '@productos/(lib)/ui/actions/editProductServerAction';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export const useEditProduct = (product: Product) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const editProductServerActionWithId = editProductServerAction.bind(null, product);

    const [state, editFormActionRaw] = useFormState(editProductServerActionWithId, {
        errors: {},
    });

    const editFormAction = (formData: FormData) => {
        editFormActionRaw(formData);
        setIsEditable(false);
    };

    return { editFormAction, isEditable, setIsEditable, formState: state };
};
