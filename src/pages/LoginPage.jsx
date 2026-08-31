import { useState } from "react";
import { registrarse, iniciarSesion } from "../services/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);
  const [error, setError] = useState("");

  async function manejarEnvio(e) {
    e.preventDefault();
    setError("");

    const { error } = modoRegistro
      ? await registrarse(email, password)
      : await iniciarSesion(email, password);

    if (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h1>{modoRegistro ? "Registrarme" : "Iniciar sesión"}</h1>

      <form onSubmit={manejarEnvio}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {modoRegistro ? "Registrarme" : "Iniciar sesión"}
        </button>
      </form>

      {error && <p>{error}</p>}

      <button onClick={() => setModoRegistro(!modoRegistro)}>
        {modoRegistro
          ? "Ya tengo una cuenta"
          : "Crear una cuenta"}
      </button>
    </div>
  );
}

export default LoginPage;