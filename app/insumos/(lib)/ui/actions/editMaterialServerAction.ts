'use server';

import Material from '@common/entities/Material';
import { accumulateFormErrors } from '@common/utils/accumulateFormErrors';
import { MaterialValidationSchema } from '@insumos/(lib)/schemas/MaterialValidationSchema';
import { MaterialDetailsFormErrors } from '@insumos/(lib)/ui/components/material-details/MaterialDetails';
import { getEditedMaterialFromFormData } from '@insumos/(lib)/utils/getEditedMaterialFromFormData';
import { revalidatePath } from 'next/cache';
import MySQLMaterialRepository from '@insumos/(lib)/services/MySQLMaterialRepository';
import type MaterialRepository from '@common/entities/MaterialRepository';
import EditMaterial from '@insumos/(lib)/usecases/EditMaterial';
import type IngredientRepository from '@common/entities/IngredientRepository';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import UpdateSuperProductsPrice from '@productos/(lib)/usecases/UpdateSuperProductsPrice';
import IngredientType from '@common/entities/IngredientType';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import RecalculateDynamicProductPrice from '@productos/(lib)/usecases/RecalculateDynamicProductPrice';

export async function editMaterialServerAction(
    materialId: Material['id'],
    _: { errors: MaterialDetailsFormErrors },
    formData: FormData,
) {
    try {
        const editedMaterial = await getEditedMaterialFromFormData(formData);
        const parsedResult = MaterialValidationSchema.safeParse(editedMaterial);

        if (parsedResult.success === false) {
            return accumulateFormErrors(parsedResult);
        }

        const materialRepository: MaterialRepository = new MySQLMaterialRepository();
        await new EditMaterial().execute({
            material: { ...parsedResult.data, id: materialId },
            materialRepository,
        });

        const ingredientRepository: IngredientRepository = new MySQLIngredientRepository();
        const ingredientsThatIncludeMaterial = await ingredientRepository.getByComponentId(
            materialId,
        );
        const productRepository = new MySQLProductRepository();

        if (ingredientsThatIncludeMaterial.length > 0) {
            for (const ingredient of ingredientsThatIncludeMaterial) {
                const product = await productRepository.getById(ingredient.productId);
                if (!product) continue;
                await new RecalculateDynamicProductPrice().execute({
                    product,
                    productRepository,
                    ingredientRepository,
                });
                await new UpdateSuperProductsPrice().execute({
                    product,
                    productRepository,
                    ingredientRepository,
                });
            }
        }

        revalidatePath(`/insumo/detalles/${materialId}`);

        console.log('Updated material with id ' + materialId + ' successfully');

        return { errors: {} };
    } catch (e) {
        return {
            errors: {
                server: 'Ha ocurrido un error al editar los datos, por favor inténtelo nuevamente.',
            },
        };
    }
}
