import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
import { productService } from '../services/productService';
import '../styles/ProductForm.css';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(parseInt(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    try {
      const product = await productService.getProductById(productId);
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description
      });
    } catch (error) {
      console.error('Error loading product:', error);
      alert('Không tìm thấy sản phẩm');
      navigate('/');
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.description) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (!id) return;

    setLoading(true);
    try {
      await productService.updateProduct(parseInt(id), formData);
      alert('Cập nhật sản phẩm thành công!');
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Lỗi khi cập nhật sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="product-form-container">
      <h1>Sửa sản phẩm</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Tên sản phẩm:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nhập tên sản phẩm"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Giá:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Nhập giá sản phẩm"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Nhập mô tả sản phẩm"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Đang sửa...' : 'Sửa'}
          </button>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => navigate('/')}
          >
            Trở lại
          </button>
        </div>
      </form>
    </div>
  );
}
