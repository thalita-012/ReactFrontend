import { useEffect, useState } from "react";

function ProductForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(() => ({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    stock: initialData?.stock || "",
    sku: initialData?.sku || "",
    active: initialData?.active ?? true,
  }));

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: initialData.name || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        sku: initialData.sku || "",
        active: initialData.active ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("SUBMIT", form);

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Slug</label>
        <input
          className="form-control"
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          className="form-control"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          className="form-control"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Stock</label>
        <input
          className="form-control"
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>SKU</label>
        <input
          className="form-control"
          type="text"
          name="sku"
          value={form.sku}
          onChange={handleChange}
        />
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          name="active"
          checked={form.active}
          onChange={handleChange}
        />
        <span>Active</span>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Save Product
      </button>
    </form>
  );
}

export default ProductForm;