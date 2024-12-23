import Heading from '../General/Heading'
import ProductCard from './ProductCard';
import { products } from '../../utils/products'

const Products = () => {
    // console.log(products);

    if (!products || products.length === 0) {
        return <div>No products available</div>;  // Ürün yoksa bir uyarı göster
    }
    return (
        <div>
            <Heading text="Tüm Ürünler" />
            <div className="flex items-center flex-wrap gap-3 md:gap-10 px-3">
                {
                    products.map(product => {
                        return <ProductCard key={product?.id ? product.id : 0} product={product} />
                    })
                }
            </div>
        </div>
    )
}

export default Products
