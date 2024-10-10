'use client';

import Material from '@common/entities/Material';
import { useEditMaterial } from '@insumos/(lib)/ui/hooks/useEditMaterial';
import { useDeleteMaterial } from '@insumos/(lib)/ui/hooks/useDeleteMaterial';
import { useDisclosure } from '@nextui-org/modal';
import ConfirmDeleteModal from '@insumos/detalles/[id]/components/ConfirmDeleteModal';
import MaterialCard from '@insumos/detalles/[id]/components/MaterialCard';
import MaterialCardBody from '@insumos/detalles/[id]/components/MaterialCardBody';
import MaterialCardEditableBody from '@insumos/detalles/[id]/components/MaterialCardEditableBody';
import MaterialCardFooter from '@insumos/detalles/[id]/components/MaterialCardFooter';
import MaterialCardHeader from '@insumos/detalles/[id]/components/MaterialCardHeader';
import MaterialImage from '@insumos/detalles/[id]/components/MaterialImage';
import { Divider } from '@nextui-org/react';

export type MaterialDetailsFormErrors = {
    name?: string;
    price?: string;
    image?: string;
    link?: string;
    /** Used for errors caught by catch statement */
    server?: string;
};

type MaterialDetailsProps = {
    material: Material;
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
                imageSrc={material.image instanceof Blob ? null : material.image}
                imageAlt={material.name}
            />
            <MaterialCard className='sm:col-span-2'>
                <MaterialCardHeader
                    title={material.name}
                    isEditable={isEditable}
                    imageSrc={material.image instanceof Blob ? null : material.image}
                    classNames={{ imageContainer: 'md:hidden' }}
                />
                <Divider />
                {isEditable ? (
                    <MaterialCardEditableBody material={material} />
                ) : (
                    <MaterialCardBody material={material} />
                )}
                <Divider />
                <MaterialCardFooter
                    isEditable={isEditable}
                    onEditPress={() => setIsEditable(true)}
                    editFormAction={editFormAction}
                    onDeletePress={openModal}
                />
            </MaterialCard>
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
