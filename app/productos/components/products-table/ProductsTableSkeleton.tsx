import { Skeleton } from '@nextui-org/skeleton';

function RowSkeleton() {
    return (
        <div className='flex items-center w-full rounded-lg py-2 px-3 gap-6 even:bg-default-100'>
            <div className='w-fit h-fit'>
                <Skeleton className='flex align-middle rounded-full w-10 h-10' />
            </div>
            <div className='w-full'>
                <Skeleton className='flex rounded-full w-full h-4' />
            </div>
        </div>
    );
}

function ProductsTableSkeleton() {
    return (
        <div className='p-4 z-0 mt-6 flex flex-col relative justify-between bg-content1 overflow-auto rounded-large shadow-small w-full'>
            <div className='flex w-full gap-6 rounded-lg bg-default-100 p-3'>
                <div className='w-fit h-fit'>
                    <Skeleton className='flex rounded-full w-10 h-4' />
                </div>
                <Skeleton className='flex rounded-full w-full h-4' />
            </div>
            <div className='flex flex-col h-fit w-full'>
                {Array(8)
                    .fill(0)
                    .map((_, index) => (
                        <RowSkeleton key={index} />
                    ))}
            </div>
        </div>
    );
}

export default ProductsTableSkeleton;
