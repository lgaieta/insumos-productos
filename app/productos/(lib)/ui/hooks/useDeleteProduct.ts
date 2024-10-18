import Product from '@common/entities/Product';
import { deleteProductServerAction } from '@productos/(lib)/ui/actions/deleteProductServerAction';
import { ProductDetailsFormErrors } from '@productos/(lib)/ui/components/product-details/ProductDetails';
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
