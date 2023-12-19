import React, { ChangeEvent, useState, useEffect } from "react";
import styles from "./EditFormModal.module.css";

export interface Product {
  _id: string;
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

interface EditFormModalProps {
  product: Product | undefined;
  onSave: (editedProduct: Product) => void;
  onClose: () => void;
}

const EditFormModal: React.FC<EditFormModalProps> = ({
  product,
  onSave,
  onClose,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product | undefined>(
    product
  );

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct!,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setEditedProduct({
        ...editedProduct!,
        file: file,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedProduct) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", editedProduct.name);
      formDataToSend.append("description", editedProduct.description || "");
      formDataToSend.append("category", String(editedProduct.category));
      formDataToSend.append("subCategory", String(editedProduct.subCategory));
      formDataToSend.append("size", String(editedProduct.size));
      formDataToSend.append("color", String(editedProduct.color));
      formDataToSend.append("stock", String(editedProduct.stock));
      formDataToSend.append("composition", String(editedProduct.composition));
      if (editedProduct.file) {
        formDataToSend.append("file", editedProduct.file);
      }

      fetch(`http://localhost:3000/product/${editedProduct._id}`, {
        method: "PUT",
        body: formDataToSend,
      })
        .then((response) => response.json())
        .then((updatedProduct: Product) => {
          onSave(updatedProduct); // Update parent component's state
          onClose(); // Close the modal
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.caja}>
          <div className={styles.caja2}>
            <label>
              Name:
              <input
                className={styles.input}
                type="text"
                name="name"
                value={editedProduct?.name || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <textarea
                className={styles.textarea}
                name="description"
                value={editedProduct?.description || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Price:
              <input
                className={styles.input}
                type="number"
                name="price"
                value={editedProduct?.price || ""}
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
            <label>
              Category:
              <input
                className={styles.input}
                type="text"
                name="category"
                value={editedProduct?.category || ""}
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
                value={editedProduct?.subCategory || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Size:
              <input
                className={styles.input}
                type="text"
                name="size"
                value={editedProduct?.size || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Color:
              <input
                className={styles.input}
                type="text"
                name="color"
                value={editedProduct?.color || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Stock:
              <input
                className={styles.input}
                type="number"
                name="stock"
                value={editedProduct?.stock || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Composition:
              <input
                className={styles.input}
                type="text"
                name="composition"
                value={editedProduct?.composition || ""}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <button className={styles.button} type="submit">
          Save Changes
        </button>
        <button className={styles.button} type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditFormModal;
