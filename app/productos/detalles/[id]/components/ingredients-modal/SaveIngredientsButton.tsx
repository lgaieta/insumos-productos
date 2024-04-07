import Material from '@common/entities/Material';
import Product from '@common/entities/Product';
import { Button } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

type SaveIngredientsButtonProps = {
    selectedIngredients: {
        material: Material['id'][];
        product: Product['id'][];
    };
};

function SaveIngredientsButton(props: SaveIngredientsButtonProps) {
    const { material, product } = props.selectedIngredients;
    const totalCount = material.length + product.length;

    const pathname = usePathname();
    const productId: Product['id'] = parseInt(pathname.split('/').slice(-1)[0]);

    return (
        <Button
            color='primary'
            isDisabled={totalCount < 1}
        >
            {totalCount > 0 ? `Añadir ${totalCount} ingredientes` : 'Añadir ingredientes'}
        </Button>
    );
}

export default SaveIngredientsButton;
