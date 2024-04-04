import { Listbox, ListboxItem, Skeleton } from '@nextui-org/react';

function ListboxSkeleton() {
    return (
        <Listbox aria-label='Cargando...'>
            {[...Array(10)].map((_, index) => (
                <ListboxItem
                    key={index}
                    aria-label={''}
                    textValue=''
                >
                    <div className='w-full flex justify-between'>
                        <Skeleton className='rounded-xl'>
                            <p>Nombre de insumo de ejemplo</p>
                        </Skeleton>
                        <Skeleton className='rounded-xl'>
                            <p>1500$</p>
                        </Skeleton>
                    </div>
                </ListboxItem>
            ))}
        </Listbox>
    );
}

export default ListboxSkeleton;
