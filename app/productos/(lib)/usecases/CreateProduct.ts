import type Product from '@common/entities/Product';
import { ProductPriceType } from '@common/entities/Product';
import type ProductRepository from '@common/entities/ProductRepository';

type CreateProductDependencies = {
    newProduct: Product;
    productRepository: ProductRepository;
    validateProduct: (product: Product) => Product | null;
};

type CreateProductResult =
    | {
          success: true;
          createdProduct: Product;
          errorMessage?: undefined;
          error?: undefined;
      }
    | {
          success: false;
          createdProduct?: undefined;
          errorMessage: string;
          error?: unknown;
      };

class CreateProduct {
    static async execute(dependencies: CreateProductDependencies): Promise<CreateProductResult> {
        const { newProduct, productRepository, validateProduct } = dependencies;

        if (!newProduct)
            return { success: false, errorMessage: 'No se puede crear un producto vacío' };

        const validatedProduct = validateProduct(newProduct);
        if (!validatedProduct) return { success: false, errorMessage: 'Producto inválido' };

        if (
            validatedProduct.ingredients.length === 0 &&
            validatedProduct.priceType === ProductPriceType.Dynamic
        )
            return {
                success: false,
                errorMessage: 'Un producto con precio variable debe tener al menos un ingrediente',
            };

        if (validatedProduct.priceType === ProductPriceType.Fixed) {
            if (validatedProduct.price <= 0)
                return {
                    success: false,
                    errorMessage: 'Un producto con precio fijo debe tener un precio mayor a 0',
                };

            if (validatedProduct.profit > 0)
                return {
                    success: false,
                    errorMessage: 'Un producto con precio fijo no puede tener ganancia aplicada',
                };

            if (validatedProduct.ingredients.length > 0)
                return {
                    success: false,
                    errorMessage:
                        'Un producto con precio fijo no puede tener ingredientes asociados',
                };
        }

        try {
            const createdProduct = await productRepository.create(validatedProduct);
            return { success: true, createdProduct };
        } catch (e) {
            return {
                success: false,
                errorMessage: 'Ha ocurrido un error al crear el producto',
                error: e,
            };
        }
    }
}

export default CreateProduct;
