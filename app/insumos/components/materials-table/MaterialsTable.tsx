'use server';

import MaterialsTableClient from './MaterialsTableClient';
import { materialListAdapter } from '@/insumos/adapters/materialAdapter';
import { getMaterialsFromDatabase } from '@/insumos/services/getMaterialsFromDatabase';
import { materialImageListAdapter } from '@/insumos/adapters/materialImageAdapter';
import { getMaterialImagesFromDatabase } from '@/insumos/services/getMaterialImagesFromDatabase';
import { mergeMaterialsWithImages } from '@/insumos/adapters/mergeMaterialsWithImages';

const getMaterials = async () => materialListAdapter(await getMaterialsFromDatabase());
const getImages = async () => materialImageListAdapter(await getMaterialImagesFromDatabase());

async function MaterialsTable() {
    const materialsData = getMaterials();
    const imagesData = getImages();

    const [materials, images] = await Promise.all([materialsData, imagesData]);

    const materialsWithImages = mergeMaterialsWithImages(materials, images);

    return <MaterialsTableClient materials={materialsWithImages} />;
}

export default MaterialsTable;
