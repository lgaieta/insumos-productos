export const getMaterialImagesFromDatabase = async () => {
    const response = await fetch('/insumos/api/imagenes');
    if (!response.ok) throw new Error('Fetching failed');
    return await response.json();
};
