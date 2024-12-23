'use client';
import { products } from '../../utils/products'
import Rating from '@mui/material/Rating';
import textClip from '@/app/utils/TextClip';
import { useRouter } from 'next/navigation';


const ProductCard = ({ product }: { product: any }) => {
    const router = useRouter()

    const productRating = product?.reviews?.length
        ? product.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) / product.reviews.length
        : 0;



    return (
        <div onClick={() => router.push(`/product/${product.id}`)} className="w-[240px] cursor-pointer flex flex-col flex-1 shadow-lg p-2 rounded-md">
            <div className='relative h-[150px]'>
                <img src={product.image} alt={product.title} className='object-contain w-full h-full' />
            </div>
            <div className='text-center mt-2 space-y-1'>
                <div>{textClip(product.title)}</div>  {/* Başlık kısaltma işlemi */}
                <Rating name="read-only" value={productRating} readOnly />
                <div className="text-orange-600 font-bold text-lg md:text-xl">{product.price} USD</div>
            </div>
        </div>
    )
}
export default ProductCard