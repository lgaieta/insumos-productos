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
});

test('create and delete insumo', async ({ page }) => {
    // Go to insumos page
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Insumos Costos de materiales' }).click();
    await page.getByRole('button', { name: 'Nuevo Insumo' }).click();
    await expect(page.getByRole('heading', { name: 'Crear insumo' })).toBeVisible();
    // Fill form with a new insumo
    await page.getByPlaceholder('Ingrese el nombre del insumo').click();
    await page.getByPlaceholder('Ingrese el nombre del insumo').fill('Nombre de insumo');
    await page.getByPlaceholder('Ingrese el costo del insumo').click();
    await page.getByPlaceholder('Ingrese el costo del insumo').fill('12500');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page).toHaveURL('http://localhost:3000/insumos?pagina=1');
    // Search and view the new insumo
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill('Nombre de insumo');
    await expect(page.getByRole('gridcell', { name: 'Nombre de insumo' })).toBeVisible();
    await page.getByRole('gridcell', { name: 'Nombre de insumo' }).click();
    await expect(page.getByRole('heading', { name: 'Nombre de insumo' })).toBeVisible();
    await expect(page.getByText('12500')).toBeVisible();
    // Edit the insumo
    await page.getByRole('button', { name: 'Editar' }).click();
    await page.getByLabel('Nombre').fill('Nombre de insumo modificado');
    await page.getByLabel('Precio').click();
    await page.getByLabel('Precio').fill('1250');
    await page.getByRole('button', { name: 'Confirmar edición' }).click();
    await expect(page.getByRole('heading', { name: 'Nombre de insumo modificado' })).toBeVisible();
    await page.getByText('1250').click();
    await expect(page.getByText('1250')).toBeVisible();
    // Delete the insumo
    await page.getByRole('button', { name: 'Borrar' }).click();
    await page.getByRole('button', { name: 'Borrar' }).click();
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill('Nombre de insumo modificado');
    await expect(page.getByText('No se encontraron insumos')).toBeVisible();
});
