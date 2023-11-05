import Material from '@/(common)/entities/Material';

export const mergeMaterialsWithImages = (materials: Material[], images: { [id: number]: string }) =>
    materials.map(material => ({ ...material, image: images[material.id] || null }));
