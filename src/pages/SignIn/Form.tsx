import styles from "./Form.module.css";
import arroba from "../../assets/arroba.svg";

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useTokenStore } from "../../store/token";

interface LoginData {
  username: string;
  password: string;
}

const Form = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loginData: LoginData = {
        username,
        password,
      };

      const response = await axios.post(
        "http://localhost:3000/auth/login",
        loginData
      );
      setToken(response.data.access_token);
      navigate(`/Home`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h1 className={styles.title}>Sign In</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.labelForm}>
            E-mail
            <div className={styles.containerInputIcon}>
              <input
                className={styles.input}
                placeholder="name@email.com"
                type="text"
                value={username}
                onChange={(e) => setEmail(e.target.value)}
              />
              <img className={styles.icon} src={arroba} alt="arroba" />
            </div>
          </label>
          <label className={styles.labelForm}>
            Password
            <div className={styles.containerInputIcon}>
              <input
                className={styles.input}
                placeholder="8+ Characters, 1 Capital letter"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img className={styles.icon} src={arroba} alt="arroba" />
            </div>
          </label>
          <Button text="Sign In" background={true} />
        </form>

        <h2 className={styles.text}>
          You do not have an account?{" "}
          <span className={styles.span}>
            <Link to={`/SignUp`}>Sign Up</Link>
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Form;
