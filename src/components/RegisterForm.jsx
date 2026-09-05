import { useForm } from "react-hook-form";
import { registrarse } from "../services/auth";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const { error } = await registrarse(data.email, data.password);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Usuario registrado correctamente");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Crear cuenta</h2>

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
          required: "La contraseña es obligatoria",
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres"
          }
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <input
        type="password"
        placeholder="Confirmar contraseña"
        {...register("confirmar", {
          required: "Debés confirmar la contraseña",
          validate: (value) =>
            value === watch("password") || "Las contraseñas no coinciden"
        })}
      />
      {errors.confirmar && <p>{errors.confirmar.message}</p>}

      <button type="submit">Registrarse</button>
    </form>
  );
}