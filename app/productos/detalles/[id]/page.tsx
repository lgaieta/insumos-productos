import { productAdapter } from '@productos/adapters/productAdapter';
import ProductDetails from '@productos-detalles/components/ProductDetails';
import { getSingleProductFromDatabase } from '@productos-detalles/services/getSingleProductFromDatabase';
import ProductNotFoundErrorPage from './components/ProductNotFoundErrorPage';

async function ProductPage({ params }: { params: { id: string } }) {
    const dbResult = await getSingleProductFromDatabase(+params.id);

    if (dbResult === undefined) return <ProductNotFoundErrorPage />;

    const product = productAdapter(dbResult);

    return (
        <main className='max-w-5xl w-full mt-10 mx-auto px-4 min-[400px]:px-8'>
            <ProductDetails product={product} />
        </main>
    );
}

export default ProductPage;
