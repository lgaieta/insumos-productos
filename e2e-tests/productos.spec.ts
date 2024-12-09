import { test, expect } from '@playwright/test';

test.afterEach(async ({ page }) => {
    // Search created insumo
    await page.goto('http://localhost:3000/insumos');
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill('Nombre de insumo');
    const materialGridcell = page.getByRole('gridcell', { name: 'Nombre de insumo' });
    if (await materialGridcell.isVisible()) {
        await materialGridcell.click();
        // Delete the insumo
        await page.getByRole('button', { name: 'Borrar' }).click();
        await page.getByRole('button', { name: 'Borrar' }).click();
        await page.getByLabel('Buscar por nombre').click();
        await page.getByLabel('Buscar por nombre').fill('Nombre de insumo');
        await expect(page.getByText('No se encontraron insumos')).toBeVisible();
    }

    // Search created product
    await page.goto('http://localhost:3000/productos');
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill('Producto de ejemplo');
    const productGridcell = page.getByRole('gridcell', { name: 'Producto de ejemplo' });
    if (await productGridcell.isVisible()) {
        await productGridcell.click();
        // Delete the product
        await page.getByRole('button', { name: 'Borrar' }).click();
        await page.getByRole('button', { name: 'Borrar' }).click();
        await page.getByLabel('Buscar por nombre').click();
        await page.getByLabel('Buscar por nombre').fill('Producto de ejemplo');
        await expect(page.getByText('No se encontraron productos')).toBeVisible();
    }
});

test('create and delete fixed product', async ({ page }) => {
    // Go to products page
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Productos', exact: true }).click();
    await page.getByRole('link', { name: 'Insumos y productos' }).click();
    await page.getByRole('button', { name: 'Productos Artículos listos' }).click();

    // Create a new fixed product
    await page.getByRole('button', { name: 'Nuevo Producto' }).click();
    await page.getByPlaceholder('Ingrese el nombre del producto').click();
    await page.getByPlaceholder('Ingrese el nombre del producto').fill('Producto de ejemplo');
    await page.getByPlaceholder('Ingrese el costo del producto').click();
    await page.getByPlaceholder('Ingrese el costo del producto').fill('12345');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page).toHaveURL('http://localhost:3000/productos?pagina=1');

    // Search the product
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill('Producto de ejemplo');
    await expect(page.getByRole('gridcell', { name: 'Producto de ejemplo' })).toBeVisible();
    await page.getByRole('gridcell', { name: 'Producto de ejemplo' }).click();
    await expect(page.getByRole('heading', { name: 'Producto de ejemplo' })).toBeVisible();
    await expect(page.getByText('12345')).toBeVisible();

    // Edit the product
    await page.getByRole('button', { name: 'Editar' }).click();
    await page.getByLabel('Nombre').fill('Producto de ejemplo modificado');
    await page.getByLabel('Precio').click();
    await page.getByLabel('Precio').fill('1234');
    await page.getByRole('button', { name: 'Confirmar edición' }).click();
    await expect(
        page.getByRole('heading', { name: 'Producto de ejemplo modificado' }),
    ).toBeVisible();
    await page.getByText('1234').click();
    await expect(page.getByText('1234')).toBeVisible();

    // Delete the product
    await page.getByRole('button', { name: 'Borrar' }).click();
    await page.getByRole('button', { name: 'Borrar' }).click();
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill('Producto de ejemplo modificado');
    await expect(page.getByText('No se encontraron productos')).toBeVisible();
});

test('create fixed and dynamic product based on both material and product, test price changes', async ({
    page,
}) => {
    // Go to insumos page
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Insumos Costos de materiales' }).click();
    await page.getByRole('button', { name: 'Nuevo Insumo' }).click();
    await expect(page.getByRole('heading', { name: 'Crear insumo' })).toBeVisible();

    // Fill form with a new insumo
    await page.getByPlaceholder('Ingrese el nombre del insumo').click();
    await page.getByPlaceholder('Ingrese el nombre del insumo').fill('Nombre de insumo');
    await page.getByPlaceholder('Ingrese el costo del insumo').click();
    await page.getByPlaceholder('Ingrese el costo del insumo').fill('1000');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page).toHaveURL('http://localhost:3000/insumos?pagina=1');

    // Go to products page
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Productos', exact: true }).click();
    await page.getByRole('link', { name: 'Insumos y productos' }).click();
    await page.getByRole('button', { name: 'Productos Artículos listos' }).click();

    // Create a new fixed product
    await page.getByRole('button', { name: 'Nuevo Producto' }).click();
    await page.getByPlaceholder('Ingrese el nombre del producto').click();
    await page.getByPlaceholder('Ingrese el nombre del producto').fill('Producto de ejemplo');
    await page.getByPlaceholder('Ingrese el costo del producto').click();
    await page.getByPlaceholder('Ingrese el costo del producto').fill('1000');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page).toHaveURL('http://localhost:3000/productos?pagina=1');

    // Create a new dynamic product
    await page.getByRole('button', { name: 'Nuevo Producto' }).click();
    await page.getByPlaceholder('Ingrese el nombre del producto').click();
    await page
        .getByPlaceholder('Ingrese el nombre del producto')
        .fill('Producto dinamico de ejemplo');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.getByRole('main').locator('span').nth(2).click();
    await page.getByRole('button', { name: 'Añadir ingredientes' }).click();
    await page.getByText('Nombre de insumo').click();
    await page.getByRole('tab', { name: 'Productos' }).click();
    await page.getByText('Producto de ejemplo').click();
    await page.getByRole('button', { name: 'Añadir ingredientes' }).click();
    await page.getByPlaceholder('Ingrese la ganancia del').click();
    await page.getByPlaceholder('Ingrese la ganancia del').fill('20');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page).toHaveURL('http://localhost:3000/productos?pagina=1');

    // Edit the fixed product price
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill('Producto de ejemplo');
    await expect(page.getByRole('gridcell', { name: 'Producto de ejemplo' })).toBeVisible();
    await page.getByRole('gridcell', { name: 'Producto de ejemplo' }).click();
    await expect(page.getByRole('heading', { name: 'Producto de ejemplo' })).toBeVisible();
    await expect(page.getByText('2000')).toBeVisible();
    await page.getByRole('button', { name: 'Editar' }).click();
    await page.getByLabel('Precio').click();
    await page.getByLabel('Precio').fill('2000');
    await page.getByRole('button', { name: 'Confirmar edición' }).click();

    // Look if the price changed
    await page.goBack();
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill('Producto dinamico de ejemplo');
    await expect(
        page.getByRole('gridcell', { name: 'Producto dinamico de ejemplo' }),
    ).toBeVisible();
    await page.getByRole('gridcell', { name: 'Producto dinamico de ejemplo' }).click();
    await expect(page.getByRole('heading', { name: 'Producto dinamico de ejemplo' })).toBeVisible();
    await expect(page.getByText('3600')).toBeVisible();
    await page.goBack();

    // Search the dynamic product
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill('Producto dinamico de ejemplo');
    await expect(
        page.getByRole('gridcell', { name: 'Producto dinamico de ejemplo' }),
    ).toBeVisible();
    await page.getByRole('gridcell', { name: 'Producto dinamico de ejemplo' }).click();
    await expect(page.getByRole('heading', { name: 'Producto dinamico de ejemplo' })).toBeVisible();

    // Delete the dynamic product
    await page.getByRole('button', { name: 'Borrar' }).click();
    await page.getByRole('button', { name: 'Borrar' }).click();
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill('Producto dinamico de ejemplo');
    await expect(page.getByText('No se encontraron productos')).toBeVisible();
});
