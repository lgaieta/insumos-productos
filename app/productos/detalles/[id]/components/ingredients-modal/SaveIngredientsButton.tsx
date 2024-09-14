import Material from '@common/entities/Material';
import Product from '@common/entities/Product';
import { Button } from '@nextui-org/react';
import {
    NewIngredientList,
    saveIngredientListServerAction,
} from '@productos/(lib)/actions/saveIngredientListServerAction';
import { usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';

type SaveIngredientsButtonProps = {
    selectedIngredients: {
        material: Material['id'][];
        product: Product['id'][];
    };
    afterSave?: () => void;
};

function SubmitButton({ totalCount }: { totalCount: number }) {
    const { pending } = useFormStatus();

    return (
        <Button
            color='primary'
            isDisabled={totalCount < 1 || pending}
            type='submit'
            isLoading={pending}
        >
            {pending
                ? 'Guardando...'
                : totalCount > 0
                  ? `Añadir ${totalCount} ingredientes`
                  : 'Añadir ingredientes'}
        </Button>
    );
}

function SaveIngredientsButton(props: SaveIngredientsButtonProps) {
    const { material, product } = props.selectedIngredients;
    const totalCount = material.length + product.length;

    const pathname = usePathname();
    const productId: Product['id'] = parseInt(pathname.split('/').slice(-1)[0]);

    const newIngredientList: NewIngredientList = {
        productId,
        materialList: material,
        subproductList: product,
    };

    const action = () => {
        saveIngredientListServerAction(newIngredientList);
        props.afterSave?.();
    };

    return (
        <form action={action}>
            <SubmitButton totalCount={totalCount} />
        </form>
    );
}

export default SaveIngredientsButton;
