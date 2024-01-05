'use client';

import Material from '@common/entities/Material';
import { useEditMaterial } from '@insumo-detalles/hooks/useEditMaterial';
import { useDeleteMaterial } from '@insumo-detalles/hooks/useDeleteMaterial';
import { useDisclosure } from '@nextui-org/modal';
import { Divider } from '@nextui-org/divider';
import ConfirmDeleteModal from '@insumos/detalles/[id]/components/ConfirmDeleteModal';
import MaterialCard from '@insumos/detalles/[id]/components/MaterialCard';
import MaterialCardBody from '@insumos/detalles/[id]/components/MaterialCardBody';
import MaterialCardEditableBody from '@insumos/detalles/[id]/components/MaterialCardEditableBody';
import MaterialCardFooter from '@insumos/detalles/[id]/components/MaterialCardFooter';
import MaterialCardHeader from '@insumos/detalles/[id]/components/MaterialCardHeader';

export type MaterialModalFormErrors = {
    name?: string;
    price?: string;
    image?: string;
    link?: string;
    /** Used for errors caught by catch statement */
    server?: string;
};

type MaterialModalProps = {
    material: Material & { image: string | null };
};

function MaterialModal(props: MaterialModalProps) {
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
            className='relative w-full max-w-4xl mx-8'
        >
            <ConfirmDeleteModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                materialName={material.name}
                buttonFormAction={deleteFormAction}
            />
            <MaterialCard className='w-full'>
                <MaterialCardHeader
                    title={material.name}
                    isEditable={isEditable}
                    imageSrc={material.image}
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

export default MaterialModal;
