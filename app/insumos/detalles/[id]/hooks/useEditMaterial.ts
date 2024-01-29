import Material from '@common/entities/Material';
import { editMaterialServerAction } from '@insumos-detalles/actions/editMaterialServerAction';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export const useEditMaterial = (material: Material) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const editMaterialServerActionWithId = editMaterialServerAction.bind(null, material.id);

    const [state, editFormActionRaw] = useFormState(editMaterialServerActionWithId, {
        errors: {},
    });

    const editFormAction = (formData: FormData) => {
        editFormActionRaw(formData);
        setIsEditable(false);
    };

    return { editFormAction, isEditable, setIsEditable, formState: state };
};
