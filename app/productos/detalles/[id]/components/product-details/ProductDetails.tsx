'use client';

import Product from '@common/entities/Product';
import { useEditProduct } from '@productos-detalles/hooks/useEditProduct';
import { useDeleteProduct } from '@productos-detalles/hooks/useDeleteProduct';
import { useDisclosure } from '@nextui-org/modal';
import ProductCard from './ProductCard';
import ProductCardHeader from './ProductCardHeader';
import ProductCardBody from './ProductCardBody';
import ProductCardEditableBody from './ProductCardEditableBody';
import ProductCardFooter from './ProductCardFooter';
import { Divider } from '@nextui-org/divider';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ProductImage from './ProductImage';

export type ProductDetailsFormErrors = {
    name?: string;
    price?: string;
    image?: string;
    link?: string;
    /** Used for errors caught by catch statement */
    server?: string;
};

type ProductDetailsProps = {
    product: Product & { image: string | null };
};

function ProductDetails(props: ProductDetailsProps) {
    const { product } = props;

    const {
        editFormAction,
        isEditable,
        setIsEditable,
        formState: { errors },
    } = useEditProduct(product);

    const { deleteFormAction } = useDeleteProduct(product.id);

    const { onOpen: openModal, isOpen, onOpenChange } = useDisclosure();

    return (
        <form
            id='productForm'
            className='grid grid-cols-1 md:grid-cols-3 grid-rows-none auto-rows-auto md:grid-rows-1 gap-6'
        >
            <ConfirmDeleteModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                productName={product.name}
                buttonFormAction={deleteFormAction}
            />
            <ProductImage
                isEditable={isEditable}
                imageSrc={product.image}
                imageAlt={product.name}
            />
            <ProductCard className='sm:col-span-2'>
                <ProductCardHeader
                    title={product.name}
                    isEditable={isEditable}
                    imageSrc={product.image}
                    classNames={{ imageContainer: 'md:hidden' }}
                />
                <Divider />
                {isEditable ? (
                    <ProductCardEditableBody product={product} />
                ) : (
                    <ProductCardBody product={product} />
                )}
                <Divider />
                <ProductCardFooter
                    isEditable={isEditable}
                    onEditPress={() => setIsEditable(true)}
                    editFormAction={editFormAction}
                    onDeletePress={openModal}
                />
            </ProductCard>
            {Object.entries(errors).map(([key, message]) => (
                <p
                    className='text-danger text-center mt-4'
                    key={key}
                >
                    {message}
                </p>
            ))}
        </form>
    );
}

export default ProductDetails;
