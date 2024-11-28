import type Material from '@common/entities/Material';
import type MaterialRepository from '@common/entities/MaterialRepository';

type EditMaterialDependencies = {
    material: Material;
    materialRepository: MaterialRepository;
};

class EditMaterial {
    async execute(dependencies: EditMaterialDependencies) {
        try {
            const { material, materialRepository } = dependencies;
            await materialRepository.update(material);

            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false };
        }
    }
}

export default EditMaterial;
