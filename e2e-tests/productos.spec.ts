import { test, expect } from '@playwright/test';
import Big from 'big.js';

test.describe('Product Management', () => {
    test('create fixed product', async ({ page }) => {
        // Common variables
        const baseUrl = 'http://localhost:3000/';
        const ref = String(Date.now());
        const productName = 'Producto de ejemplo ' + ref;
        const modifiedProductName = 'Producto de ejemplo modificado ' + ref;
        const productCost = '500';
        const modifiedProductCost = '1000';
        const searchPlaceholder = 'Buscar por nombre';
        const namePlaceholder = 'Ingrese el nombre del producto';
        const costPlaceholder = 'Ingrese el costo del producto';

        // Go to products page
        await page.goto(baseUrl);
        await page.getByRole('link', { name: 'Productos', exact: true }).click();
        await page.getByRole('link', { name: 'Insumos y productos' }).click();
        await page.getByRole('button', { name: 'Productos Artículos listos' }).click();
        // Create a new fixed product
        await page.getByRole('button', { name: 'Nuevo Producto' }).click();
        await page.getByPlaceholder(namePlaceholder).click();
        await page.getByPlaceholder(namePlaceholder).fill(productName);
        await page.getByPlaceholder(costPlaceholder).click();
        await page.getByPlaceholder(costPlaceholder).fill(productCost);
        await page.getByRole('button', { name: 'Continuar' }).click();
        await expect(page).toHaveURL(`${baseUrl}productos?pagina=1`);
        // Search the product
        await page.getByLabel(searchPlaceholder).click();
        await page.getByLabel(searchPlaceholder).fill(productName);
        await expect(page.getByRole('gridcell', { name: productName })).toBeVisible();
        await page.getByRole('gridcell', { name: productName }).click();
        await expect(page.getByRole('heading', { name: productName })).toBeVisible();
        await expect(page.getByText('$' + productCost)).toBeVisible();
        // Edit the product
        await page.getByRole('button', { name: 'Editar' }).click();
        await page.getByLabel('Nombre').fill(modifiedProductName);
        await page.getByLabel('Precio').click();
        await page.getByLabel('Precio').fill(modifiedProductCost);
        await page.getByRole('button', { name: 'Confirmar edición' }).click();
        await expect(page.getByRole('heading', { name: modifiedProductName })).toBeVisible();
        await expect(page.getByText('$' + modifiedProductCost)).toBeVisible();
        // Delete the product
        await page.getByRole('button', { name: 'Borrar' }).click();
        await page.getByRole('button', { name: 'Borrar' }).click();
        // Check if it was deleted successfully
        await page.getByLabel(searchPlaceholder).click();
        await page.getByLabel(searchPlaceholder).fill(modifiedProductName);
        await expect(page.getByText('No se encontraron productos')).toBeVisible();
    });

    test('create and delete dynamic product', async ({ page }) => {
        // Common constants
        const baseUrl = 'http://localhost:3000/';
        const searchPlaceholder = 'Buscar por nombre';
        const productsPageURL = 'http://localhost:3000/productos?pagina=1';

        // Fixed product constants
        const fixedProductName = 'Producto fijo de ejemplo ' + String(Date.now());
        const fixedProductCost = '1000';
        const fixedProductModifiedCost = '3000';

        // Material (Insumo) constants
        const insumosPageURL = 'http://localhost:3000/insumos?pagina=1';
        const insumoName = 'Nombre de insumo ' + String(Date.now());
        const insumoCost = '12500';
        const modifiedInsumoCost = '2000';

        // Dynamic product constants
        const dynamicProductName = 'Producto dinamico de ejemplo ' + String(Date.now());
        const dynamicProductProfit = '10';
        const expectedNewDynamicProductPrice = new Big(
            Number(fixedProductModifiedCost) + Number(modifiedInsumoCost),
        )
            .times(new Big(Number(dynamicProductProfit)).div(100).plus(1))
            .toString();

        // Create a new material (insumo)
        await page.goto(baseUrl);
        await page.getByRole('button', { name: 'Insumos Costos de materiales' }).click();
        await page.getByRole('button', { name: 'Nuevo Insumo' }).click();
        await page.getByPlaceholder('Ingrese el nombre del insumo').fill(insumoName);
        await page.getByPlaceholder('Ingrese el costo del insumo').fill(insumoCost);
        await page.getByRole('button', { name: 'Continuar' }).click();

        // Go to products page
        await page.goto(baseUrl);
        await page.getByRole('link', { name: 'Productos', exact: true }).click();

        // Create a new fixed product
        await page.getByRole('button', { name: 'Nuevo Producto' }).click();
        await page.getByPlaceholder('Ingrese el nombre del producto').fill(fixedProductName);
        await page.getByPlaceholder('Ingrese el costo del producto').fill(fixedProductCost);
        await page.getByRole('button', { name: 'Continuar' }).click();

        // Create a new dynamic product including the material
        await page.getByRole('button', { name: 'Nuevo Producto' }).click();
        await page.getByPlaceholder('Ingrese el nombre del producto').fill(dynamicProductName);
        await page.getByRole('main').locator('span').nth(2).click();
        await page.getByRole('button', { name: 'Añadir ingredientes' }).click();
        await page.getByRole('tab', { name: 'Productos' }).click();
        await page.getByText(fixedProductName).click();
        await page.getByRole('tab', { name: 'Insumos' }).click();
        await page.getByText(insumoName).click();
        await page.getByRole('button', { name: 'Añadir ingredientes' }).click();
        await page.getByPlaceholder('Ingrese la ganancia del').fill(dynamicProductProfit);
        await page.getByRole('button', { name: 'Continuar' }).click();
        await expect(page).toHaveURL(productsPageURL);

        // Verify and update material
        await page.goto(insumosPageURL);
        await page.getByLabel(searchPlaceholder).fill(insumoName);
        await page.getByRole('gridcell', { name: insumoName }).click();
        await page.getByRole('button', { name: 'Editar' }).click();
        await page.getByLabel('Precio').fill(modifiedInsumoCost);
        await page.getByRole('button', { name: 'Confirmar edición' }).click();

        await page.goto(productsPageURL);

        // Search the fixed product
        await page.getByLabel(searchPlaceholder).click();
        await page.getByLabel(searchPlaceholder).fill(fixedProductName);
        // Go to fixed product details
        await page.getByRole('gridcell', { name: fixedProductName }).click();
        // Edit fixed product price
        await page.getByRole('button', { name: 'Editar' }).click();
        await page.getByLabel('Precio').click();
        await page.getByLabel('Precio').fill(fixedProductModifiedCost);
        await page.getByRole('button', { name: 'Confirmar edición' }).click();
        await page.goBack();

        // Search the dynamic product
        await page.getByLabel(searchPlaceholder).click();
        await page.getByLabel(searchPlaceholder).fill(dynamicProductName);
        await expect(page.getByRole('gridcell', { name: dynamicProductName })).toBeVisible();
        // Go to dynamic product details
        await page.getByRole('gridcell', { name: dynamicProductName }).click();
        await expect(page.getByRole('heading', { name: dynamicProductName })).toBeVisible();
        await page.reload();
        await expect(page.getByText('$' + expectedNewDynamicProductPrice)).toBeVisible({
            timeout: 10000,
        });
        // Remove ingredients
        await page.getByLabel(fixedProductName).getByRole('button').nth(2).click();
        await page.getByLabel(insumoName).getByRole('button').nth(2).click();
        // Delete the dynamic product
        await page.getByRole('button', { name: 'Borrar' }).click();
        await page.getByRole('button', { name: 'Borrar' }).click();
        await expect(page).toHaveURL(productsPageURL);
        // Check if the dynamic product was deleted successfully
        await page.getByLabel(searchPlaceholder).click();
        await page.getByLabel(searchPlaceholder).fill(dynamicProductName);
        await expect(page.getByText('No se encontraron productos')).toBeVisible();

        // Search the fixed product
        await page.getByLabel(searchPlaceholder).click();
        await page.getByLabel(searchPlaceholder).fill(fixedProductName);
        // Go to fixed product details
        await page.getByRole('gridcell', { name: fixedProductName }).click();
        // Delete the fixed product
        await page.getByRole('button', { name: 'Borrar' }).click();
        await page.getByRole('button', { name: 'Borrar' }).click();

        // Delete the material
        await page.goto(insumosPageURL);
        await page.getByLabel(searchPlaceholder).fill(insumoName);
        await page.getByRole('gridcell', { name: insumoName }).click();
        await page.getByRole('button', { name: 'Borrar' }).click();
        await page.getByRole('button', { name: 'Borrar' }).click();
    });
});
