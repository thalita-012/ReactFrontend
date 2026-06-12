import { useEffect, useState, useCallback } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ProductForm from "../components/ProductForm";

import {
  getProduct,
  updateProduct,
} from "../api/productApi";

function ProductEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProduct(id);
      // Handle wrapped data if necessary
      const data = res.data?.data || res.data;
      setProduct(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProduct();
  }, [loadProduct]);

  const handleSubmit = async (data) => {
    try {
      await updateProduct(id, data);

      alert("Updated Successfully");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    }
  };

  if (loading) {
    return <div className="container"><h2>Loading product details...</h2></div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Edit Product</h2>

        {product && (
          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default ProductEdit;