import { productAdapter } from '@productos/adapters/productAdapter';
import IngredientsList from '@productos/detalles/[id]/components/ingredients-list/IngredientsList';
import IngredientsListErrorBoundary from '@productos/detalles/[id]/components/ingredients-list/IngredientsListErrorBoundary';
import IngredientsListSkeleton from '@productos/detalles/[id]/components/ingredients-list/IngredientsListSkeleton';
import ProductDetails from '@productos/detalles/[id]/components/product-details/ProductDetails';
import ProductNotFoundErrorPage from '@productos/detalles/[id]/components/product-details/ProductNotFoundErrorPage';
import { getSingleProductFromDatabase } from '@productos/services/getSingleProductFromDatabase';
import { Suspense } from 'react';

async function ProductPage({ params }: { params: { id: string } }) {
    const dbResult = await getSingleProductFromDatabase(+params.id);

    if (dbResult === undefined) return <ProductNotFoundErrorPage />;

    const product = productAdapter(dbResult);

    return (
        <main className='flex flex-col gap-10 max-w-5xl w-full mt-10 pb-10 mx-auto px-4 min-[400px]:px-8'>
            <ProductDetails product={product} />
            <IngredientsListErrorBoundary>
                <Suspense fallback={<IngredientsListSkeleton />}>
                    <IngredientsList productId={product.id} />
                </Suspense>
            </IngredientsListErrorBoundary>
        </main>
    );
}

export default ProductPage;
