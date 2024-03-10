import Product from '@common/entities/Product';
import { deleteProductServerAction } from '@productos-detalles/actions/deleteProductServerAction';
import { ProductDetailsFormErrors } from '@productos-detalles/components/ProductDetails';
import { useFormState } from 'react-dom';

export const useDeleteProduct = (productId: Product['id']) => {
    const deleteProductServerActionWithId = deleteProductServerAction.bind(null, productId);

    const [state, deleteFormAction] = useFormState<{ errors: ProductDetailsFormErrors }, FormData>(
        deleteProductServerActionWithId,
        {
            errors: {},
        },
    );

    return { deleteFormAction, formState: state };
};
