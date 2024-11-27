'use server';

import type IngredientRepository from '@common/entities/IngredientRepository';
import type NewIngredientsList from '@common/entities/NewIngredientsList';
import type ProductRepository from '@common/entities/ProductRepository';
import MySQLIngredientRepository from '@productos/(lib)/services/MySQLIngredientRepository';
import MySQLProductRepository from '@productos/(lib)/services/MySQLProductRepository';
import RecalculateDynamicProductPrice from '@productos/(lib)/usecases/RecalculateDynamicProductPrice';
import SaveIngredientsList from '@productos/(lib)/usecases/SaveIngredientsList';
import UpdateSuperProductsPrice from '@productos/(lib)/usecases/UpdateSuperProductsPrice';
import { revalidatePath } from 'next/cache';

export async function saveIngredientListServerAction(newIngredientsList: NewIngredientsList) {
    const filteredProducts = newIngredientsList.subproductList.filter(
        subproduct => subproduct[0] !== newIngredientsList.productId,
    );
    const ingredientRepository: IngredientRepository = new MySQLIngredientRepository();
    const productRepository: ProductRepository = new MySQLProductRepository();

    const { success } = await SaveIngredientsList.execute({
        newIngredientsList: { ...newIngredientsList, subproductList: filteredProducts },
        ingredientRepository,
        productRepository,
    });

    if (!success) return;

    const product = await productRepository.getById(newIngredientsList.productId);

    if (!product) return;

    const { success: recalculateProductSuccess } =
        await new RecalculateDynamicProductPrice().execute({
            product,
            productRepository,
            ingredientRepository,
        });

    if (!recalculateProductSuccess) return;

    const { success: updateSuperProductsPriceSuccess } =
        await new UpdateSuperProductsPrice().execute({
            product,
            productRepository,
            ingredientRepository,
        });

    if (!updateSuperProductsPriceSuccess) return;

    revalidatePath(`/productos/detalles/${newIngredientsList.productId}`);
}
