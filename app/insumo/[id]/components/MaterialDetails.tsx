'use client';

import Material from '@common/entities/Material';
import { Divider } from '@nextui-org/divider';
import { Card, CardHeader, CardFooter } from '@nextui-org/card';
import EditButton from '@insumo/components/EditButton';
import EditMaterialForm from './EditMaterialForm';
import MaterialDetailsBody from './MaterialDetailsBody';
import MaterialImage from './MaterialImage';
import MaterialImageAvatar from './MaterialImageAvatar';
import DeleteButton from './DeleteButton';
import { useEditMaterial } from '@insumo/hooks/useEditMaterial';
import { useDeleteMaterial } from '@insumo/hooks/useDeleteMaterial';
import { useDisclosure } from '@nextui-org/modal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export type MaterialDetailsFormErrors = {
    name?: string;
    price?: string;
    image?: string;
    link?: string;
    /** Used for errors caught by catch statement */
    server?: string;
};

type MaterialDetailsProps = {
    material: Material & { image: string | null };
};

function MaterialDetails(props: MaterialDetailsProps) {
    const { material } = props;

    const {
        editFormAction,
        isEditable,
        setIsEditable,
        formState: { errors },
    } = useEditMaterial(material);

    const { deleteFormAction } = useDeleteMaterial(material.id);

    const { onOpen: openModal, isOpen, onOpenChange } = useDisclosure();

    return (
        <form
            id='materialForm'
            className='grid grid-cols-1 md:grid-cols-3 grid-rows-none auto-rows-auto md:grid-rows-1 gap-6 mb-10'
        >
            <ConfirmDeleteModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                materialName={material.name}
                buttonFormAction={deleteFormAction}
            />
            <MaterialImage
                isEditable={isEditable}
                imageSrc={material.image}
                imageAlt={material.name}
            />
            <Card className='w-full sm:col-span-2'>
                <CardHeader className='p-5 flex-wrap gap-4'>
                    <MaterialImageAvatar
                        isEditable={isEditable}
                        imageSrc={material.image}
                    />
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
                    <DeleteButton
                        isEditing={isEditable}
                        onPress={openModal}
                    />
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
