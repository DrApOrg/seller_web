import React, { useState } from "react";
import axios from "axios";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loginData: LoginData = {
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:3002/auth/login",
        loginData
      );
      // Aquí puedes manejar la respuesta de la API, como guardar el token de autenticación en el estado global o redirigir al usuario a otra página.
      console.log(response.data);

      onLoginSuccess(); // Llamar a la función de éxito de inicio de sesión proporcionada como prop
    } catch (error) {
      setError(
        "Error de inicio de sesión. Por favor, verifica tus credenciales."
      );
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default LoginForm;
