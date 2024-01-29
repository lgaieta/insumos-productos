import { getSingleMaterialFromDatabase } from '@insumos-detalles/services/getSingleMaterialFromDatabase';
import { materialAdapter } from '@insumos/adapters/materialAdapter';
import MaterialModal from './components/MaterialModal';
import MaterialModalOverlay from './components/MaterialModalOverlay';

async function MaterialModalPage({ params }: { params: { id: string } }) {
    const material = materialAdapter(await getSingleMaterialFromDatabase(+params.id));

    return (
        <MaterialModalOverlay>
            <MaterialModal material={material} />
        </MaterialModalOverlay>
    );
}

export default MaterialModalPage;
