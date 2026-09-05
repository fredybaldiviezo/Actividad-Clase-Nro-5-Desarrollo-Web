import { useForm } from "react-hook-form";
import { iniciarSesion } from "../services/auth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const { error } = await iniciarSesion(data.email, data.password);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Sesión iniciada correctamente");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "El email es obligatorio"
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Contraseña"
        {...register("password", {
          required: "La contraseña es obligatoria"
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Ingresar</button>
    </form>
  );
}