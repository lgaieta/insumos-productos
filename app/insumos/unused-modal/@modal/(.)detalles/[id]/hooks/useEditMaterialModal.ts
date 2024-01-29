import Material from '@common/entities/Material';
import { editMaterialServerAction } from '@insumos-detalles/actions/editMaterialServerAction';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export const useEditMaterialModal = (material: Material) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const editMaterialServerActionWithId = editMaterialServerAction.bind(null, material.id);
    const router = useRouter();

    const [state, editFormActionRaw] = useFormState(editMaterialServerActionWithId, {
        errors: {},
    });

    const editFormAction = (formData: FormData) => {
        editFormActionRaw(formData);
        setIsEditable(false);
        router.refresh();
    };

    return { editFormAction, isEditable, setIsEditable, formState: state };
};
