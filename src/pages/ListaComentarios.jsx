import { useEffect, useState } from "react";
import {
  obtenerComentarios,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
} from "../services/comentarios";

function ListaComentarios({ comisionId, sesion }) {
  const [comentarios, setComentarios] = useState([]);
  const [contenido, setContenido] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [textoEdicion, setTextoEdicion] = useState("");

  async function cargarComentarios() {
    const { data, error } = await obtenerComentarios(comisionId);

    if (error) {
      console.error(error);
      return;
    }

    setComentarios(data || []);
  }

  useEffect(() => {
    cargarComentarios();
  }, [comisionId]);

  async function manejarCrear(e) {
    e.preventDefault();

    if (!contenido.trim()) return;

    const { error } = await crearComentario(comisionId, contenido);

    if (error) {
      console.error(error);
      return;
    }

    setContenido("");
    cargarComentarios();
  }

  function comenzarEdicion(comentario) {
    setEditandoId(comentario.id);
    setTextoEdicion(comentario.contenido);
  }

  async function manejarActualizar(id) {
    const { error } = await actualizarComentario(id, textoEdicion);

    if (error) {
      console.error(error);
      return;
    }

    setEditandoId(null);
    setTextoEdicion("");
    cargarComentarios();
  }

  async function manejarEliminar(id) {
    const { error } = await eliminarComentario(id);

    if (error) {
      console.error(error);
      return;
    }

    setComentarios(comentarios.filter((comentario) => comentario.id !== id));
  }

  return (
    <div>
      <h2>Comentarios</h2>

      <form onSubmit={manejarCrear}>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escribí un comentario"
        />

        <button type="submit">Comentar</button>
      </form>

      {comentarios.map((comentario) => (
        <div key={comentario.id}>
          {editandoId === comentario.id ? (
            <>
              <textarea
                value={textoEdicion}
                onChange={(e) => setTextoEdicion(e.target.value)}
              />

              <button onClick={() => manejarActualizar(comentario.id)}>
                Guardar
              </button>

              <button onClick={() => setEditandoId(null)}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              <p>{comentario.contenido}</p>
              <small>{new Date(comentario.creado_en).toLocaleString()}</small>

              {comentario.autor_id === sesion.user.id && (
                <>
                  <button onClick={() => comenzarEdicion(comentario)}>
                    Editar
                  </button>

                  <button onClick={() => manejarEliminar(comentario.id)}>
                    Borrar
                  </button>
                </>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListaComentarios;