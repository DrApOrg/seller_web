import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useUserStore } from "../../store/user";
import { useTokenStore } from "../../store/token";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const setToken = useTokenStore((state) => state.setToken);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToken(null);
    navigate(`/`);
  };
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.logo}>
          <Link to="/Home">TSHOP</Link>
        </li>
        <li className={styles.name}>
          <p>{`${user?.firstname} ${user?.lastname}`}</p>
          <p>{user?.username}</p>
        </li>

        <Link className={styles.link} to="/Products">
          Lista de productos
        </Link>
        <Link className={styles.link} to="/Product">
          Crear Producto
        </Link>
      </ul>
      <div>
        <img
          className={styles.exit}
          src="svg/exit.svg"
          onClick={handleSubmit}
        />
      </div>
    </nav>
  );
};

export default Navbar;
