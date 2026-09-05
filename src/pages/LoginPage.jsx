import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function LoginPage() {
  const [modoRegistro, setModoRegistro] = useState(false);

  return (
    <div>
      {modoRegistro ? <RegisterForm /> : <LoginForm />}

      <button onClick={() => setModoRegistro(!modoRegistro)}>
        {modoRegistro ? "Ya tengo una cuenta" : "Crear una cuenta"}
      </button>
    </div>
  );
}

export default LoginPage;