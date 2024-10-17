import type IngredientRepository from '@common/entities/IngredientRepository';
import type { ProductId } from '@common/entities/Product';
import type Product from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';

type UpdateProductLinkDependencies = {
    data: { id: ProductId; link: Product['link'] };
    productRepository: ProductRepository;
};

class UpdateProductLink {
    async execute(dependencies: UpdateProductLinkDependencies) {
        try {
            const { data, productRepository } = dependencies;

            await productRepository.update(data);

            return { success: true };
        } catch (e) {
            console.error(e);
            return { success: false };
        }
    }
}

export default UpdateProductLink;
