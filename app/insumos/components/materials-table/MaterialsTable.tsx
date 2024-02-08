'use client';
import Material from '@/(common)/entities/Material';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';
import { Spinner } from '@nextui-org/spinner';
import { getCellContent } from './getCellContent';
import { useRouter } from 'next/navigation';
import { useAsyncList } from 'react-stately';
import { fetchMaterials } from '@insumos/services/fetchMaterials';
import SearchInput from './SearchInput';
import NewMaterialButton from './NewMaterialButton';
import { useState } from 'react';
import MaterialsTableSkeleton from './MaterialsTableSkeleton';
import { fetchMaterialsImages } from '@insumos/services/fetchMaterialsImages';
import { mergeMaterialsWithImages } from '@insumos/adapters/mergeMaterialsWithImages';

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

    const list = useAsyncList<Material>({
        async load({ signal, filterText }) {
            const materials = await fetchMaterials({ signal, filterText });
            const materialsImages = await fetchMaterialsImages({ signal, filterText });
            const data = mergeMaterialsWithImages(materials, materialsImages);

            setIsSkeleton(false);
            return { items: data };
        },
    });

    const router = useRouter();

    return (
        <>
            <div className='flex flex-col-reverse gap-6 sm:flex-row items-center justify-between w-full'>
                <SearchInput
                    value={list.filterText}
                    onValueChange={list.setFilterText}
                />
                <NewMaterialButton />
            </div>
            {isSkeleton ? (
                <MaterialsTableSkeleton />
            ) : (
                <Table
                    aria-label='Tabla de Insumos'
                    classNames={{
                        base: 'mt-6',
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
                        isLoading={list.isLoading}
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
