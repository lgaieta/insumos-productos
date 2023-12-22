import Material from '@common/entities/Material';
import { deleteMaterialServerAction } from '@insumo-detalles/actions/deleteMaterialServerAction';
import { MaterialDetailsFormErrors } from '@insumo-detalles/components/MaterialDetails';
import { useFormState } from 'react-dom';

export const useDeleteMaterial = (materialId: Material['id']) => {
    const deleteMaterialServerActionWithId = deleteMaterialServerAction.bind(null, materialId);

    const [state, deleteFormAction] = useFormState<{ errors: MaterialDetailsFormErrors }, FormData>(
        deleteMaterialServerActionWithId,
        {
            errors: {},
        },
    );

    return { deleteFormAction, formState: state };
};
