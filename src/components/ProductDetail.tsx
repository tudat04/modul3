import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
import { productService } from '../services/productService';
import '../styles/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(parseInt(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    try {
      const data = await productService.getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
      alert('Không tìm thấy sản phẩm');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: string) => {
    return Number(price).toLocaleString('vi-VN');
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="product-detail-container">
      <h1>Chi tiết sản phẩm</h1>
      <div className="product-detail-card">
        <div className="detail-item">
          <span className="label">Tên sản phẩm:</span>
          <span className="value product-title">{product.title}</span>
        </div>
        <div className="detail-item">
          <span className="label">Mô tả:</span>
          <span className="value">{product.description}</span>
        </div>
        <div className="detail-item">
          <span className="label">Giá:</span>
          <span className="value">{formatPrice(product.price)} VND</span>
        </div>
        <button className="btn-back" onClick={() => navigate('/')}>
          Trở lại
        </button>
      </div>
    </div>
  );
}
