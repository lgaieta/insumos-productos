'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';
import { Pagination } from '@nextui-org/pagination';
import { Spinner } from '@nextui-org/spinner';
import { getCellContent } from './getCellContent';
import { useRouter } from 'next/navigation';
import SearchInput from './SearchInput';
import NewProductButton from './NewProductButton';
import ProductsTableSkeleton from './ProductsTableSkeleton';
import { useProductList } from '@productos/hooks/useProductList';

const productsTableColumns = [
    { key: 'image', label: 'Imagen' },
    {
        key: 'name',
        label: 'Nombre',
        allowSorting: true,
    },
    {
        key: 'price',
        label: 'Precio',
        allowSorting: true,
    },
    {
        key: 'materialsUsed',
        label: 'Insumos involucrados',
    },
    {
        key: 'link',
        label: 'Link',
    },
];

function ProductsTable() {
    const {
        items,
        filterText,
        setFilterText,
        isSkeleton,
        currentPage,
        setCurrentPage,
        totalPages,
        isLoading,
        sort,
        sortDescriptor,
    } = useProductList();

    const router = useRouter();

    return (
        <>
            <div className='flex flex-col gap-6 min-[700px]:flex-row items-center justify-between w-full'>
                <span className='flex justify-center min-[700px]:justify-start w-full grow basis-0'>
                    <SearchInput
                        value={filterText}
                        onValueChange={setFilterText}
                    />
                </span>
                <span className='order-3 min-[700px]:order-none'>
                    <Pagination
                        isDisabled={isSkeleton}
                        loop
                        siblings={0}
                        showControls={true}
                        total={totalPages}
                        page={currentPage}
                        onChange={page => setCurrentPage(page)}
                    />
                </span>
                <span className='flex w-full justify-center min-[700px]:justify-end grow basis-0'>
                    <NewProductButton />
                </span>
            </div>
            {isSkeleton ? (
                <ProductsTableSkeleton />
            ) : (
                <Table
                    aria-label='Tabla de Productos'
                    classNames={{
                        base: 'mt-6',
                        table: isLoading ? 'min-h-[200px]' : '',
                    }}
                    onSortChange={sort}
                    sortDescriptor={sortDescriptor}
                >
                    <TableHeader columns={productsTableColumns}>
                        {column => (
                            <TableColumn
                                key={column.key}
                                width={column.key === 'image' ? '32' : null}
                                allowsSorting={column.allowSorting || false}
                            >
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        items={items}
                        loadingState={isLoading ? 'loading' : 'idle'}
                        loadingContent={<Spinner />}
                        emptyContent={!isLoading && <p>No se encontraron productos</p>}
                    >
                        {items
                            ? product => (
                                  <TableRow
                                      key={product.id}
                                      className='hover:bg-content2 transition-colors rounded-2xl'
                                      onClick={() =>
                                          router.push(`/productos/detalles/${product.id}`)
                                      }
                                  >
                                      {columnKey => (
                                          <TableCell className='first:rounded-tl-2xl first:rounded-bl-2xl last:rounded-tr-2xl last:rounded-br-2xl'>
                                              {getCellContent(product, columnKey)}
                                          </TableCell>
                                      )}
                                  </TableRow>
                              )
                            : []}
                    </TableBody>
                </Table>
            )}
        </>
    );
}

export default ProductsTable;
