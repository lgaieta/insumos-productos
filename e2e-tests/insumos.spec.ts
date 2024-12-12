import { test, expect } from '@playwright/test';

test('create and delete insumo', async ({ page }) => {
    // Constants for repeated strings
    const baseURL = 'http://localhost:3000/';
    const insumosPageURL = 'http://localhost:3000/insumos?pagina=1';
    const insumoName = 'Nombre de insumo ' + String(Date.now());
    const modifiedInsumoName = 'Nombre de insumo modificado ' + String(Date.now());
    const insumoCost = '12500';
    const modifiedInsumoCost = '1250';
    const noInsumosMessage = 'No se encontraron insumos';

    // Go to insumos page
    await page.goto(baseURL);
    await page.getByRole('button', { name: 'Insumos Costos de materiales' }).click();
    await page.getByRole('button', { name: 'Nuevo Insumo' }).click();
    await expect(page.getByRole('heading', { name: 'Crear insumo' })).toBeVisible();

    // Fill form with a new insumo
    await page.getByPlaceholder('Ingrese el nombre del insumo').click();
    await page.getByPlaceholder('Ingrese el nombre del insumo').fill(insumoName);
    await page.getByPlaceholder('Ingrese el costo del insumo').click();
    await page.getByPlaceholder('Ingrese el costo del insumo').fill(insumoCost);
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page).toHaveURL(insumosPageURL);

    // Search and view the new insumo
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill(insumoName);
    await expect(page.getByRole('gridcell', { name: insumoName })).toBeVisible();
    await page.getByRole('gridcell', { name: insumoName }).click();
    await expect(page.getByRole('heading', { name: insumoName })).toBeVisible();
    await expect(page.getByText(insumoCost)).toBeVisible();

    // Edit the insumo
    await page.getByRole('button', { name: 'Editar' }).click();
    await page.getByLabel('Nombre').fill(modifiedInsumoName);
    await page.getByLabel('Precio').click();
    await page.getByLabel('Precio').fill(modifiedInsumoCost);
    await page.getByRole('button', { name: 'Confirmar edición' }).click();
    await expect(page.getByRole('heading', { name: modifiedInsumoName })).toBeVisible();
    await page.getByText(modifiedInsumoCost).click();
    await expect(page.getByText(modifiedInsumoCost)).toBeVisible();

    // Delete the insumo
    await page.getByRole('button', { name: 'Borrar' }).click();
    await page.getByRole('button', { name: 'Borrar' }).click();
    await page.getByLabel('Buscar por nombre').click();
    await page.getByLabel('Buscar por nombre').fill(modifiedInsumoName);
    await expect(page.getByText(noInsumosMessage)).toBeVisible();
});
