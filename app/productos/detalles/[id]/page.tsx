import IngredientsList from '@productos/(lib)/ui/components/ingredients-list/IngredientsList';
import IngredientsListErrorBoundary from '@productos/(lib)/ui/components/ingredients-list/IngredientsListErrorBoundary';
import IngredientsListSkeleton from '@productos/(lib)/ui/components/ingredients-list/IngredientsListSkeleton';
import ProductDetails from '@productos/(lib)/ui/components/product-details/ProductDetails';
import ProductNotFoundErrorPage from '@productos/(lib)/ui/components/product-details/ProductNotFoundErrorPage';
import { Suspense } from 'react';
import GetProduct from '@productos/(lib)/usecases/GetProduct';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import ProductPriceType from '@common/entities/ProductPriceType';

async function ProductPage({ params }: { params: { id: string } }) {
    const storageResult = await GetProduct.execute({
        productId: Number(params.id),
        productRepository: new MySQLProductRepository(),
    });

    if (storageResult.success === false) return <ProductNotFoundErrorPage />;

    return (
        <main className='flex flex-col gap-10 max-w-6xl w-full mt-10 pb-10 mx-auto px-4 min-[400px]:px-8'>
            <ProductDetails product={storageResult.product} />
            {storageResult.product.priceType === ProductPriceType.Dynamic && (
                <IngredientsListErrorBoundary>
                    <Suspense fallback={<IngredientsListSkeleton />}>
                        <IngredientsList productId={storageResult.product.id} />
                    </Suspense>
                </IngredientsListErrorBoundary>
            )}
        </main>
    );
}

export default ProductPage;
