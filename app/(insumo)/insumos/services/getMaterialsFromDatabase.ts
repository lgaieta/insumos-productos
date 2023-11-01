export const getMaterialsFromDatabase = async () => {
    const response = await fetch('/insumos/api');
    if (!response.ok) throw new Error('Fetching failed');
    return await response.json();
};
