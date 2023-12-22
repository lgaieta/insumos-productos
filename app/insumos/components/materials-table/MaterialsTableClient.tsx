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
            isStriped
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
                              onClick={() => router.push(`/insumos/detalles/${material.id}`)}
                          >
                              {columnKey => (
                                  <TableCell>{getCellContent(material, columnKey)}</TableCell>
                              )}
                          </TableRow>
                      )
                    : []}
            </TableBody>
        </Table>
    );
}

export default MaterialsTableClient;
