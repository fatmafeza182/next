
import React from 'react';
import { products } from '@/app/utils/products';
import DetailClients from '@/app/components/Detail/DetailClients';

// Bu fonksiyon, asenkron olarak params parametrelerini alacak
type DetailProps = {
    params: { productId: string }
};

const Detail = ({ params }: DetailProps) => {
    const { productId } = params;

    // console.log(params, "params");

    // productId'ye göre ürünü buluyoruz
    const product = products.find(product => String(product.id) === String(productId));

    // Ürün bulunamadıysa bir hata mesajı döndürebiliriz
    if (!product) {
        return <div>Ürün bulunamadı</div>;
    }

    // Ürün bulunursa, bu bileşeni döndürüyoruz
    return (
        <div>
            <DetailClients product={product} />
        </div>
    );
}

export default Detail;
