import { materialAdapter } from '@insumos/adapters/materialAdapter';
import MaterialDetails from '@insumos-detalles/components/MaterialDetails';
import { getSingleMaterialFromDatabase } from '@insumos-detalles/services/getSingleMaterialFromDatabase';
import MaterialNotFoundErrorPage from './components/MaterialNotFoundErrorPage';

async function MaterialPage({ params }: { params: { id: string } }) {
    const dbResult = await getSingleMaterialFromDatabase(+params.id);

    if (dbResult === undefined) return <MaterialNotFoundErrorPage />;

    const material = materialAdapter(dbResult);

    return (
        <main className='max-w-5xl w-full mt-10 mx-auto px-4 min-[400px]:px-8'>
            <MaterialDetails material={material} />
        </main>
    );
}

export default MaterialPage;
