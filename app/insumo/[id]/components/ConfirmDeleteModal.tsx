import Material from '@common/entities/Material';
import { Modal, ModalContent, ModalHeader, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import { ButtonHTMLAttributes } from 'react';

type ConfirmDeleteModalProps = {
    isOpen: boolean;
    onOpenChange: () => void;
    materialName: Material['name'];
    buttonFormAction: ButtonHTMLAttributes<HTMLButtonElement>['formAction'];
};

function ConfirmDeleteModal(props: ConfirmDeleteModalProps) {
    const { isOpen, onOpenChange, materialName, buttonFormAction } = props;

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>
                            ¿Está seguro de querer borrar el insumo &quot;{materialName}&quot;?
                        </ModalHeader>
                        <ModalFooter>
                            <Button
                                variant='light'
                                onPress={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                color='danger'
                                onPress={onClose}
                                type='submit'
                                formAction={buttonFormAction}
                                form='materialForm'
                            >
                                Borrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ConfirmDeleteModal;
