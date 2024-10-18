import MaterialDetails from '@insumos/(lib)/ui/components/material-details/MaterialDetails';
import MaterialNotFoundErrorPage from '@insumos/(lib)/ui/components/material-details/MaterialNotFoundErrorPage';
import MySQLMaterialRepository from '@insumos/(lib)/services/MySQLMaterialRepository';

async function MaterialPage({ params }: { params: { id: string } }) {
    const materialRepository = new MySQLMaterialRepository();
    const material = await materialRepository.getById(+params.id);

    if (!material) return <MaterialNotFoundErrorPage />;

    return (
        <main className='max-w-5xl w-full mt-10 mx-auto px-4 min-[400px]:px-8'>
            <MaterialDetails material={material} />
        </main>
    );
}

export default MaterialPage;
