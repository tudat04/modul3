import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import '../styles/ProductForm.css';

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      await productService.createProduct(formData);
      alert('Thêm sản phẩm thành công!');
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Lỗi khi thêm sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h1>Thêm sản phẩm</h1>
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
            {loading ? 'Đang thêm...' : 'Thêm'}
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
