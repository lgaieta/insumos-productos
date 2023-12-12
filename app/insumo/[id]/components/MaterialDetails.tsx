'use client';

import Material from '@common/entities/Material';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { Divider } from '@nextui-org/divider';
import { Card, CardHeader, CardFooter, CardBody } from '@nextui-org/card';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import EditButton from '@insumo/components/EditButton';
import EditMaterialForm from './EditMaterialForm';
import MaterialDetailsBody from './MaterialDetailsBody';
import { editMaterialServerAction } from '@insumo/actions/editMaterialServerAction';
import MaterialImage from './MaterialImage';
import Image from 'next/image';

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
        <form className='grid grid-cols-1 min-[800px]:grid-cols-3 grid-rows-none auto-rows-auto min-[800px]:grid-rows-1 gap-6 mb-10'>
            <Card className='aspect-square sm:aspect-auto max-w-[300px] mx-auto'>
                <CardBody className='p-0'>
                    <Image
                        src={material.image || ''}
                        alt={material.name}
                        className='w-full h-full aspect-square object-cover'
                        width={300}
                        height={300}
                    />
                </CardBody>
            </Card>
            <Card className='w-full sm:col-span-2'>
                <CardHeader className='justify-between p-5 flex-wrap gap-4'>
                    <h1 className='text-2xl font-bold'>{material.name}</h1>
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
