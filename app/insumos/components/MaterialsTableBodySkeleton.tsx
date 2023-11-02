import { TableRow, TableCell } from '@nextui-org/table';
import { Skeleton } from '@nextui-org/skeleton';

export function RowSkeleton() {
    return (
        <div className='flex items-center w-full rounded-lg py-2 px-3 gap-6'>
            <div className='w-fit h-fit'>
                <Skeleton className='flex align-middle rounded-full w-10 h-10' />
            </div>
            <div className='w-full'>
                <Skeleton className='flex rounded-full w-full h-4' />
            </div>
        </div>
    );
}

function MaterialsTableBodySkeleton() {
    return (
        <div className='absolute flex flex-col w-full'>
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
        </div>
    );
}

export default MaterialsTableBodySkeleton;
