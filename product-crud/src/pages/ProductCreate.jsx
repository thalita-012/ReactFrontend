import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../api/productApi";

function ProductCreate() {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            console.log("Creating product with data:", data);
            const response = await createProduct(data);
            console.log("Create response:", response);
            
            alert("Created Successfully");
            navigate("/");
        } catch (error) {
            console.error("=== FULL ERROR DETAILS ===");
            console.error("Error response data:", error.response?.data);
            
            if (error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat();
                alert(`Validation failed:\n${errorMessages.join('\n')}`);
            } else if (error.response?.data?.message) {
                alert(`Failed to create product: ${error.response.data.message}`);
            } else {
                alert(`Failed to create product: ${error.message}`);
            }
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Create Product</h2>
                <ProductForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default ProductCreate;