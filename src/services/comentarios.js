import { supabase } from "../supabaseClient";

export async function obtenerComentarios(comisionId) {
  return supabase
    .from("comentarios")
    .select("id, contenido, autor_id, creado_en")
    .eq("comision_id", comisionId)
    .order("creado_en", { ascending: true });
}

export async function crearComentario(comisionId, contenido) {
  return supabase
    .from("comentarios")
    .insert({ comision_id: comisionId, contenido });
}

export async function actualizarComentario(id, contenido) {
  return supabase
    .from("comentarios")
    .update({ contenido })
    .eq("id", id);
}

export async function eliminarComentario(id) {
  return supabase
    .from("comentarios")
    .delete()
    .eq("id", id);
}