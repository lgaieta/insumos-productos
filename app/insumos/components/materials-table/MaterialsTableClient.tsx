'use client';
import Material from '@/(common)/entities/Material';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';
import { getCellContent } from './getCellContent';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

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

type MaterialsTableClientProps = {
    materials: Material[];
};

function MaterialsTableClient(props: MaterialsTableClientProps) {
    const { materials } = props;

    const router = useRouter();

    return (
        <Table
            aria-label='Example table with dynamic content'
            classNames={{
                base: 'mt-6',
                loadingWrapper: 'relative table-cell',
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
            <TableBody items={materials || undefined}>
                {materials
                    ? material => (
                          <TableRow
                              key={material.id}
                              className='hover:bg-content2 transition-colors rounded-2xl'
                              onClick={() => router.push(`/insumos/detalles/${material.id}`)}
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
    );
}

export default MaterialsTableClient;
