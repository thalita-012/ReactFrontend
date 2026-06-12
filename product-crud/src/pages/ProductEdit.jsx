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
      console.log("Updating product with data:", data);
      console.log("Product ID:", id);

      const response = await updateProduct(id, data);
      console.log("Update response:", response);

      alert("Updated Successfully");
      navigate("/");
    } catch (error) {
      console.error("=== FULL ERROR DETAILS ===");
      console.error("Error object:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error status:", error.response?.status);

      // Show detailed error message
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        alert(`Validation failed:\n${errorMessages.join('\n')}`);
      } else if (error.response?.data?.message) {
        alert(`Failed to update product: ${error.response.data.message}`);
      } else {
        alert(`Failed to update product: ${error.message}`);
      }
    }
  };

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