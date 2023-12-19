import React, { useState, useEffect } from "react";
import styles from "./Products.module.css";
import EditFormModal from "../../components/EditFormModal/EditFormModal"; // Asegúrate de ajustar la ruta correcta
import { useUserStore } from "../../store/user";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: {
    location: string;
  };
  category?: string;
  subCategory?: string;
  size?: string;
  color?: string[];
  stock?: number;
  composition?: string;
  supplier?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    // Lógica para obtener los productos desde la API
    fetch(`http://localhost:3000/product/bySupplier/${user?.companyName}`)
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEdit = (id: string) => {
    setShowEditModal(true);
    setSelectedProductId(id);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedProductId("");
  };

  const handleSaveChanges = (editedProduct: Product) => {
    // Aquí puedes enviar los cambios a la API
    // Recuerda actualizar tu lista de productos después de editar
    console.log("Saving changes:", editedProduct);
    // Lógica para enviar los cambios a la API y actualizar la lista de productos
    fetch(`http://localhost:3000/product/${editedProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    })
      .then((response) => response.json())
      .then((updatedProduct: Product) => {
        setProducts(
          products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          )
        );
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    // Lógica para eliminar el producto con el id proporcionado
    console.log(`Delete product with id: ${id}`);
    // Aquí podrías llamar a la API para eliminar el producto con este id
    fetch(`http://localhost:3000/product/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Si la eliminación fue exitosa, actualiza la lista de productos
          setProducts(products.filter((product) => product._id !== id));
        } else {
          console.error("Failed to delete product");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Size</th>
            <th>Color</th>
            <th>Stock</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <img
                  className={styles.img}
                  src={product.image?.location}
                  alt="Product Image"
                />
              </td>
              <td>{product.category}</td>
              <td>{product.subCategory}</td>
              <td>{product.size}</td>
              <td>{product.color?.join(", ")}</td>
              <td>{product.stock}</td>
              <td>{product.supplier}</td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && (
        <EditFormModal
          product={products.find((p) => p._id === selectedProductId)}
          onSave={handleSaveChanges}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Products;
