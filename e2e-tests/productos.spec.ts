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
        // Common variables
        const baseUrl = 'http://localhost:3000/';
        const fixedProductName = 'Producto fijo de ejemplo ' + String(Date.now());
        const fixedProductCost = '1000';
        const fixedProductModifiedCost = '3000';
        const dynamicProductName = 'Producto dinamico de ejemplo ' + String(Date.now());
        const dynamicProductProfit = '10';
        const searchPlaceholder = 'Buscar por nombre';
        const namePlaceholder = 'Ingrese el nombre del producto';
        const costPlaceholder = 'Ingrese el costo del producto';
        const expectedNewDynamicProductPrice = new Big(Number(fixedProductModifiedCost))
            .times(new Big(Number(dynamicProductProfit)).div(100).plus(1))
            .toString();

        // Go to products page
        await page.goto(baseUrl);
        await page.getByRole('link', { name: 'Productos', exact: true }).click();

        // Create a new fixed product
        await page.getByRole('button', { name: 'Nuevo Producto' }).click();
        await page.getByPlaceholder(namePlaceholder).click();
        await page.getByPlaceholder(namePlaceholder).fill(fixedProductName);
        await page.getByPlaceholder(costPlaceholder).click();
        await page.getByPlaceholder(costPlaceholder).fill(fixedProductCost);
        await page.getByRole('button', { name: 'Continuar' }).click();

        // Create a new dynamic product
        await page.getByRole('button', { name: 'Nuevo Producto' }).click();
        await page.getByPlaceholder(namePlaceholder).click();
        await page.getByPlaceholder(namePlaceholder).fill(dynamicProductName);
        await page.getByRole('main').locator('span').nth(2).click();
        await page.getByRole('button', { name: 'Añadir ingredientes' }).click();
        await page.getByRole('tab', { name: 'Productos' }).click();
        await page.getByText(fixedProductName).click();
        await page.getByRole('button', { name: 'Añadir ingredientes' }).click();
        await page.getByPlaceholder('Ingrese la ganancia del').click();
        await page.getByPlaceholder('Ingrese la ganancia del').fill(dynamicProductProfit);
        await page.getByRole('button', { name: 'Continuar' }).click();
        await expect(page).toHaveURL('http://localhost:3000/productos?pagina=1');

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
        await page.goBack();

        // Search the fixed product
        await page.getByLabel(searchPlaceholder).click();
        await page.getByLabel(searchPlaceholder).fill(fixedProductName);
        // Go to fixed product details
        await page.getByRole('gridcell', { name: fixedProductName }).click();
        // Delete the fixed product
        await page.getByRole('button', { name: 'Borrar' }).click();
        await page.getByRole('button', { name: 'Borrar' }).click();

        // Search the dynamic product
        await page.getByLabel(searchPlaceholder).click();
        await page.getByLabel(searchPlaceholder).fill(dynamicProductName);
        await expect(page.getByRole('gridcell', { name: dynamicProductName })).toBeVisible();
        // Go to dynamic product details
        await page.getByRole('gridcell', { name: dynamicProductName }).click();
        // Delete the dynamic product
        await page.getByRole('button', { name: 'Borrar' }).click();
        await page.getByRole('button', { name: 'Borrar' }).click();
        await expect(page).toHaveURL('http://localhost:3000/productos?pagina=1');
        // Check if the dynamic product was deleted successfully
        await page.getByLabel(searchPlaceholder).click();
        await page.getByLabel(searchPlaceholder).fill(dynamicProductName);
        await expect(page.getByText('No se encontraron productos')).toBeVisible();
    });
});
