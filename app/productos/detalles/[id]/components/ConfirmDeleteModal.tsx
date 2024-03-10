import Product from '@common/entities/Product';
import { Modal, ModalContent, ModalHeader, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import { ButtonHTMLAttributes } from 'react';

type ConfirmDeleteModalProps = {
    isOpen: boolean;
    onOpenChange: () => void;
    productName: Product['name'];
    buttonFormAction: ButtonHTMLAttributes<HTMLButtonElement>['formAction'];
};

function ConfirmDeleteModal(props: ConfirmDeleteModalProps) {
    const { isOpen, onOpenChange, productName, buttonFormAction } = props;

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>
                            ¿Está seguro de querer borrar el producto &quot;{productName}&quot;?
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
                                form='productForm'
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
