import {
  useEffect,
  useState,
  useCallback,
} from "react";

import { Link } from "react-router-dom";

import {
  getProducts,
  deleteProduct,
} from "../api/productApi";

function ProductList() {
  const [products, setProducts] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res =
        await getProducts();

      // Ensure we are setting an array
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setProducts(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to load products. Please check if the API is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this product?"
      )
    )
      return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  if (loading) {
    return <div className="container"><h2>Loading products...</h2></div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="card" style={{ borderColor: 'red' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadProducts} style={{ marginTop: '10px' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h2>Products</h2>

          <Link
            to="/create"
            className="btn btn-primary"
          >
            Add Product
          </Link>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>SKU</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No products found.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td><strong>{product.name}</strong></td>
                    <td>${Number(product.price).toLocaleString()}</td>
                    <td>{product.stock}</td>
                    <td>{product.sku}</td>
                    <td>
                      <span className={`badge ${product.active ? "badge-active" : "badge-inactive"}`}>
                        {product.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/edit/${product.id}`}
                        className="btn btn-primary"
                        style={{ marginRight: '8px', padding: '6px 12px' }}
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger"
                        style={{ padding: '6px 12px' }}
                        onClick={() =>
                          handleDelete(
                            product.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductList;