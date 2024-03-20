import Material from '@common/entities/Material';
import { deleteMaterialServerAction } from '@insumos/actions/deleteMaterialServerAction';
import { MaterialDetailsFormErrors } from '@insumos-detalles/components/MaterialDetails';
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
