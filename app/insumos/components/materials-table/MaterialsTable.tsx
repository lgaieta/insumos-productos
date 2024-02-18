'use client';
import Material from '@/(common)/entities/Material';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';
import { Pagination } from '@nextui-org/pagination';
import { Spinner } from '@nextui-org/spinner';
import { getCellContent } from './getCellContent';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAsyncList } from 'react-stately';
import { fetchMaterials } from '@insumos/services/fetchMaterials';
import SearchInput from './SearchInput';
import NewMaterialButton from './NewMaterialButton';
import { useEffect, useState } from 'react';
import MaterialsTableSkeleton from './MaterialsTableSkeleton';
import { fetchMaterialsImages } from '@insumos/services/fetchMaterialsImages';
import { mergeMaterialsWithImages } from '@insumos/adapters/mergeMaterialsWithImages';

const PAGE_PARAM_NAME = 'pagina';

const materialsTableColumns = [
    { key: 'image', label: 'Imagen' },
    {
        key: 'name',
        label: 'Nombre',
    },
    {
        key: 'price',
        label: 'Precio',
    },
    {
        key: 'link',
        label: 'Link',
    },
];

function MaterialsTable() {
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [totalMaterials, setTotalMaterials] = useState(50);

    const searchParams = useSearchParams();
    const pageParam = searchParams.get(PAGE_PARAM_NAME);
    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const router = useRouter();
    const pathname = usePathname();

    const list = useAsyncList<Material>({
        async load({ signal, filterText }) {
            const materialsResponse = await fetchMaterials({
                signal,
                filterText,
                page: currentPage,
                cache: 'no-store',
            });
            const materialsImages = await fetchMaterialsImages({
                signal,
                filterText,
                page: currentPage,
                cache: 'no-store',
            });
            const data = mergeMaterialsWithImages(materialsResponse.data, materialsImages);

            setTotalMaterials(materialsResponse.total);

            setIsSkeleton(false);
            return { items: data };
        },
    });

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set(PAGE_PARAM_NAME, String(currentPage));
        list.reload();
        router.replace(`${pathname}?${params.toString()}`);
        console.log(params.toString());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const rowsPerPage = process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE
        ? parseInt(process.env.NEXT_PUBLIC_MATERIAL_ROWS_PER_PAGE)
        : 5;

    return (
        <>
            <div className='flex flex-col gap-6 min-[700px]:flex-row items-center justify-between w-full'>
                <span className='flex justify-center min-[700px]:justify-start w-full grow basis-0'>
                    <SearchInput
                        value={list.filterText}
                        onValueChange={list.setFilterText}
                    />
                </span>
                <span className='order-3 min-[700px]:order-none'>
                    <Pagination
                        isDisabled={isSkeleton}
                        loop
                        siblings={0}
                        showControls={true}
                        total={Math.ceil(totalMaterials / rowsPerPage)}
                        page={currentPage}
                        onChange={page => setCurrentPage(page)}
                    />
                </span>
                <span className='flex w-full justify-center min-[700px]:justify-end grow basis-0'>
                    <NewMaterialButton />
                </span>
            </div>
            {isSkeleton ? (
                <MaterialsTableSkeleton />
            ) : (
                <Table
                    aria-label='Tabla de Insumos'
                    classNames={{
                        base: 'mt-6',
                        table: 'min-h-[300px]',
                    }}
                >
                    <TableHeader columns={materialsTableColumns}>
                        {column => (
                            <TableColumn
                                key={column.key}
                                width={column.key === 'image' ? '32' : null}
                            >
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        items={list.items}
                        loadingState={list.isLoading ? 'loading' : 'idle'}
                        loadingContent={<Spinner />}
                    >
                        {list.items
                            ? material => (
                                  <TableRow
                                      key={material.id}
                                      className='hover:bg-content2 transition-colors rounded-2xl'
                                      onClick={() =>
                                          router.push(`/insumos/detalles/${material.id}`)
                                      }
                                  >
                                      {columnKey => (
                                          <TableCell className='first:rounded-tl-2xl first:rounded-bl-2xl last:rounded-tr-2xl last:rounded-br-2xl'>
                                              {getCellContent(material, columnKey)}
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

export default MaterialsTable;
