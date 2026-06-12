import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../api/productApi";

function ProductCreate() {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            await createProduct(data);

            alert("Created Successfully");

            navigate("/");
        } catch (error) {
            console.error("FULL ERROR:", error);

            alert(error.message || "Failed to create product.");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Create Product</h2>

                <ProductForm
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default ProductCreate;