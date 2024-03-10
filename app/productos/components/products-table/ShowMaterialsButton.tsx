import Product from '@common/entities/Product';
import { Button } from '@nextui-org/button';
import { usePathname, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';

function ShowMaterialsButton(props: { productId: Product['id'] }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    params.delete('idProducto');
    params.append('idProducto', String(props.productId));

    const href = `${pathname}?${params.toString()}`;

    return (
        <Button
            variant='flat'
            as={NextLink}
            href={href}
        >
            Ver insumos
        </Button>
    );
}

export default ShowMaterialsButton;
