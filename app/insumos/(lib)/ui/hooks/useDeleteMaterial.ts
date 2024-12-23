import Material from '@common/entities/Material';
import { deleteMaterialServerAction } from '@insumos/(lib)/ui/actions/deleteMaterialServerAction';
import { MaterialDetailsFormErrors } from '@insumos/(lib)/ui/components/material-details/MaterialDetails';
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
