import { useTokenStore } from "../../store/token";
import { useUserStore } from "../../store/user";
import styles from "./Home.module.css";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

const Home = () => {
  const token = useTokenStore((state) => state.token);
  const setUser = useUserStore((state) => state.setUser);
  const userC = useUserStore((state) => state.user);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(""); // Nuevo estado para mensajes

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/auth/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const user = response.data;
          setUser(user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = {
        phone: phone,
        address: address,
      };

      await axios.put(
        `http://localhost:3000/auth/users/${userC?._id}`,
        formData
      );

      // Mostrar mensaje de guardado exitoso
      setMessage("Guardado");
    } catch (error) {
      // Mostrar mensaje de error
      setMessage("Error al guardar");
      console.error("Error al hacer la solicitud:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <br />
        <br />
        <h1>Bienvenido a TSHOP</h1>
        <h2>
          ¿Listo para vender tus productos? <br />
          Ingresa a la seccion de Crear Productos
        </h2>
        <br />
        <br />
        <h3>Pero antes rellena estos datos</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
          {message && (
            <p style={{ color: message === "Guardado" ? "green" : "red" }}>
              {message}
            </p>
          )}
        </form>
      </div>
      <div className={styles.containerImage}>
        <img className={styles.image} src="img/image2.jpg" alt="" />
      </div>
    </div>
  );
};

export default Home;
