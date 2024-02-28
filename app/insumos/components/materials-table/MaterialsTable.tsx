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
import { useEffect, useState, useRef } from 'react';
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
    const isSkeletonRef = useRef(true);
    const [totalMaterials, setTotalMaterials] = useState(50);
    const [materialsImages, setMaterialsImages] = useState({});

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

            setTotalMaterials(materialsResponse.total);

            isSkeletonRef.current = false;
            return { items: materialsResponse.data };
        },
    });

    const loadImages = async ({ signal }: { signal: AbortSignal }) => {
        const imagesResponse = await fetchMaterialsImages({
            signal,
            filterText: list.filterText,
            page: currentPage,
            cache: 'no-store',
        });

        setMaterialsImages(imagesResponse);
    };

    // Update images when list.items changes
    useEffect(() => {
        const controller = new AbortController();
        loadImages({ signal: controller.signal });
        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list.items]);

    // Reload list when current page changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set(PAGE_PARAM_NAME, String(currentPage));
        list.reload();
        router.replace(`${pathname}?${params.toString()}`);
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
                        isDisabled={isSkeletonRef.current}
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
            {isSkeletonRef.current ? (
                <MaterialsTableSkeleton />
            ) : (
                <Table
                    aria-label='Tabla de Insumos'
                    classNames={{
                        base: 'mt-6',
                        table: list.isLoading ? 'min-h-[56px]' : '',
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
                        items={mergeMaterialsWithImages(list.items, materialsImages)}
                        loadingState={list.isLoading ? 'loading' : 'idle'}
                        loadingContent={<Spinner />}
                        emptyContent={<p>No se encontraron insumos</p>}
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
