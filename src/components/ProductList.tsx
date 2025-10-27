import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
import { productService } from '../services/productService';
import '../styles/ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Lỗi khi tải danh sách sản phẩm');
    }
  };

  const handleDeleteClick = (id: number) => {
    setShowDeleteConfirm(id);
  };

  const handleConfirmDelete = async (id: number) => {
    try {
      await productService.deleteProduct(id);
      alert('Xóa sản phẩm thành công!');
      setShowDeleteConfirm(null);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Lỗi khi xóa sản phẩm');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const formatPrice = (price: string) => {
    return Number(price).toLocaleString('vi-VN');
  };

  return (
    <div className="product-list-container">
      <h1>Danh sách sản phẩm</h1>
      <button className="btn-add" onClick={() => navigate('/add')}>
        Thêm mới
      </button>

      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <a 
                  className="product-link" 
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {product.title}
                </a>
              </td>
              <td>{product.description}</td>
              <td>{formatPrice(product.price)}</td>
              <td>
                <button 
                  className="btn-edit"
                  onClick={() => navigate(`/edit/${product.id}`)}
                >
                  Sửa
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteClick(product.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Xác nhận</h3>
            <p>Bạn chắc chắn muốn xoá sản phẩm này?</p>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button 
                className="btn-ok" 
                onClick={() => handleConfirmDelete(showDeleteConfirm)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
