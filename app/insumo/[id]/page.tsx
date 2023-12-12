import { materialAdapter } from '@insumos/adapters/materialAdapter';
import MaterialDetails from '@insumo/components/MaterialDetails';
import { getSingleMaterialFromDatabase } from '@insumo/services/getSingleMaterialFromDatabase';

async function MaterialPage({ params }: { params: { id: string } }) {
    const material = materialAdapter(await getSingleMaterialFromDatabase(+params.id));

    return (
        <main className='max-w-5xl w-full mt-10 mx-auto px-8'>
            <MaterialDetails material={material} />
        </main>
    );
}

export default MaterialPage;
