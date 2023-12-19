import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Product.module.css";
import { useUserStore } from "../../store/user";
import { useNavigate } from "react-router-dom";

interface ProductData {
  name: string;
  description?: string;
  price: number;
  file?: File | null;
  category?: string;
  subCategory?: string;
  size?: string;
  color?: string[];
  stock?: number;
  composition?: string;
  supplier?: string;
}

const AddProductForm: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const supplierName = user?.companyName || "Default Supplier Name";

  const [productData, setProductData] = useState<ProductData>({
    name: "",
    description: "",
    price: 0,
    file: null as File | null,
    category: "",
    subCategory: "",
    size: "",
    color: [],
    stock: 0,
    composition: "",
    supplier: supplierName,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProductData({
            ...productData,
            file: file,
          });
        }
      };
      console.log(file);
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", productData.name);
    formDataToSend.append("description", productData.description || "");
    formDataToSend.append("category", String(productData.category));
    formDataToSend.append("subCategory", String(productData.subCategory));
    formDataToSend.append("size", String(productData.size));
    formDataToSend.append("color", String(productData.color));
    formDataToSend.append("stock", String(productData.stock));
    formDataToSend.append("composition", String(productData.composition));
    formDataToSend.append("supplier", String(productData.supplier));
    if (productData.file) {
      formDataToSend.append("file", productData.file);
    }

    try {
      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product created:", data);
        navigate(`/Products`);
      } else {
        throw new Error("Error creating product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Add New Product</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.caja}>
          <div className={styles.caja2}>
            <label>
              Name:
              <input
                className={styles.input}
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <textarea
                className={styles.textarea}
                name="description"
                value={productData.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Price:
              <input
                className={styles.input}
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </label>

            <label>
              Supplier:
              <input
                className={styles.input}
                type="text"
                name="supplier"
                value={productData.supplier}
                readOnly
              />
            </label>
            <label>
              Category:
              <input
                className={styles.input}
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className={styles.caja2}>
            <label>
              Subcategory:
              <input
                className={styles.input}
                type="text"
                name="subCategory"
                value={productData.subCategory}
                onChange={handleChange}
              />
            </label>
            <label>
              Size:
              <input
                className={styles.input}
                type="text"
                name="size"
                value={productData.size}
                onChange={handleChange}
              />
            </label>
            <label>
              Color:
              <input
                className={styles.input}
                type="text"
                name="color"
                value={productData.color}
                onChange={handleChange}
              />
            </label>
            <label>
              Stock:
              <input
                className={styles.input}
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
              />
            </label>
            <label>
              Composition:
              <input
                className={styles.input}
                type="text"
                name="composition"
                value={productData.composition}
                onChange={handleChange}
              />
            </label>
            <label>
              Image:
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
        <button className={styles.button} type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
