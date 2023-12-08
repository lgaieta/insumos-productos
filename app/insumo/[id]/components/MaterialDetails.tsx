'use client';

import Material from '@common/entities/Material';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { Divider } from '@nextui-org/divider';
import { Card, CardHeader, CardFooter } from '@nextui-org/card';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import EditButton from '@insumo/components/EditButton';
import EditMaterialForm from './EditMaterialForm';
import MaterialDetailsBody from './MaterialDetailsBody';
import { editMaterialServerAction } from '@insumo/actions/editMaterialServerAction';
import MaterialImage from './MaterialImage';

type MaterialDetailsProps = {
    material: Material & { image: string | null };
};

export type MaterialDetailsFormErrors = {
    name?: string;
    price?: string;
    image?: string;
    link?: string;
    /** Used for errors caught by catch statement */
    server?: string;
};

const useEditMaterial = (material: Material) => {
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

function MaterialDetails(props: MaterialDetailsProps) {
    const { material } = props;

    const {
        editFormAction,
        isEditable,
        setIsEditable,
        formState: { errors },
    } = useEditMaterial(material);

    return (
        <form>
            <Card>
                <CardHeader className='justify-between p-5 flex-wrap gap-4'>
                    <div className='flex items-center gap-3'>
                        <MaterialImage
                            isEditable={isEditable}
                            imageSrc={material.image}
                        />
                        <h1 className='text-2xl font-bold'>{material.name}</h1>
                    </div>
                </CardHeader>
                <Divider />
                {isEditable ? (
                    <EditMaterialForm material={material} />
                ) : (
                    <MaterialDetailsBody material={material} />
                )}
                <Divider />
                <CardFooter className='w-full gap-2 justify-end'>
                    <EditButton
                        isEditable={isEditable}
                        onEditPress={() => {
                            setIsEditable(true);
                        }}
                        formAction={editFormAction}
                    />
                    <Button color='danger'>Borrar</Button>
                </CardFooter>
            </Card>
            {Object.entries(errors).map(([key, message]) => (
                <p
                    className='text-danger text-center mt-4'
                    key={key}
                >
                    {message}
                </p>
            ))}
        </form>
    );
}

export default MaterialDetails;
