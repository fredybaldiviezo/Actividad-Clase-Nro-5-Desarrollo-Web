import { supabase } from "../supabaseClient";

export async function registrarse(email, password) {
  return supabase.auth.signUp({ email, password });
}

export async function iniciarSesion(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function cerrarSesion() {
  return supabase.auth.signOut();
}

export function suscribirseASesion(callback) {
  const { data } = supabase.auth.onAuthStateChange((_evento, sesion) => {
    callback(sesion);
  });

  return data.subscription;
}