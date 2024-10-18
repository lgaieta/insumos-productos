import { Spinner } from '@nextui-org/react';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ReactNode, RefObject } from 'react';

type IngredientsModalPaginationWrapperProps<Data> = {
    queryOptions: Parameters<typeof useInfiniteQuery<Data>>[0];
    children: (props: ReturnType<typeof useInfiniteQuery<Data>>) => ReactNode;
};

function IngredientsModalPaginationWrapper<Data>(
    props: IngredientsModalPaginationWrapperProps<Data>,
) {
    const query = useInfiniteQuery(props.queryOptions);

    const [loaderRef, scrollerRef] = useInfiniteScroll({
        onLoadMore: query.fetchNextPage,
        hasMore: query.hasNextPage,
    }) as [RefObject<HTMLDivElement>, RefObject<HTMLDivElement>];

    return (
        <div
            className='flex flex-col p-0 max-h-[50vh] overflow-y-scroll'
            ref={scrollerRef}
        >
            {props.children(query)}
            <div
                className={`flex items-center justify-center ${query.hasNextPage ? 'p-4' : ''}`}
                ref={loaderRef}
            >
                {query.hasNextPage && <Spinner />}
            </div>
        </div>
    );
}

export default IngredientsModalPaginationWrapper;
