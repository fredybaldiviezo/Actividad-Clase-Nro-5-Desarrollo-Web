import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import ListaComentarios from "./pages/ListaComentarios";
import { cerrarSesion, suscribirseASesion } from "./services/auth";

function App() {
  const [sesion, setSesion] = useState(null);

  useEffect(() => {
    const suscripcion = suscribirseASesion((sesionActual) => {
      setSesion(sesionActual);
    });

    return () => suscripcion.unsubscribe();
  }, []);

  if (!sesion) {
    return <LoginPage />;
  }

  return (
    <div>
      <h1>Mi aplicación</h1>
      <p>Sesión iniciada correctamente.</p>

      <button onClick={cerrarSesion}>Cerrar sesión</button>

      <ListaComentarios comisionId={1} sesion={sesion} />
    </div>
  );
}

export default App;