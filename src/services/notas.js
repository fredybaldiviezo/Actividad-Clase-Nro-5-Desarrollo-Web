import { supabase } from "../supabaseClient";

export async function crearNota(contenido) {
  const { data, error } = await supabase
    .from("notas")
    .insert({ contenido })
    .select()
    .single();

  return { data, error };
}