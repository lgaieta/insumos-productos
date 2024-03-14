import { productAdapter } from '@productos/adapters/productAdapter';
import ProductDetails from '@productos/detalles/[id]/components/product-details/ProductDetails';
import { getSingleProductFromDatabase } from '@productos-detalles/services/getSingleProductFromDatabase';
import ProductNotFoundErrorPage from './components/product-details/ProductNotFoundErrorPage';
import IngredientsList from './components/ingredients-list/IngredientsList';
import { Suspense } from 'react';
import IngredientsListSkeleton from './components/ingredients-list/IngredientsListSkeleton';
import IngredientsListErrorBoundary from './components/ingredients-list/IngredientsListErrorBoundary';

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
