import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.customer.dto";

export default class ListProductUseCase{
    private productRepository: ProductRepositoryInterface;

    constructor(ProductRepository: ProductRepositoryInterface){
        this.productRepository = ProductRepository;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto>{
        
        const products = await this.productRepository.findAll();

        return OutputMapper.toOutput(products);
    }
}

class OutputMapper{
    static toOutput(product: Product[]): OutputListProductDto{
        return {
            products: product.map(
                (c: Product) => ({
                    id: c.id,
                    name: c.name,
                    price: c.price
                })
            )
        }
    }
}