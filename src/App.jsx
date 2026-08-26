import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
        setDatos(respuesta.data);
      } catch (error) {
        setError("No se pudieron cargar los datos");
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  if (cargando) {
    return <h1>Cargando...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Publicaciones</h1>

      {datos.map((dato) => (
        <div key={dato.id}>
          <h2>{dato.title}</h2>
          <p>{dato.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;