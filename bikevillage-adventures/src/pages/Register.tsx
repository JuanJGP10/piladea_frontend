import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bike, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { authService } from "@/services/authService";
import { RegisterRequest, Rol } from "@/types/auth.types";

/**
 * Componente Register
 * 
 * Este componente muestra un modal con el formulario de registro para nuevos usuarios.
 * Recopila nombre completo, correo electrónico y contraseña.
 * Incluye validación básica de campos y visualización de contraseña.
 */
const Register = () => {
  const navigate = useNavigate();
  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);
  // Estados para los datos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Maneja el envío del formulario de registro.
   * Actualmente simula un registro exitoso redirigiendo al home.
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Construimos el objeto con el tipado correcto
    const data: RegisterRequest = {
      email: email,
      password: password,
      nombre: name,
      rol: Rol.ESTANDAR
    };

    try {
      await authService.register(data);
      // Si llega aquí, es que no hubo error (200 OK)
      alert("¡Usuario registrado exitosamente! Ahora inicia sesión.");
      navigate('/login');
    } catch (error) {
      // Si el backend devolvió { "error": "El email ya existe" }, api.ts lanzó una excepción
      alert("Hubo un problema al registrarse.");
      console.error(error);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && navigate("/")}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-card/95 backdrop-blur-md border-border/50">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Bike className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-center">
              Crea tu cuenta
            </DialogTitle>
            <DialogDescription className="text-center">
              Únete a la comunidad ciclista
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  className="pl-9"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  className="pl-9 pr-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full shadow-button bg-gradient-cta hover:opacity-90">
              Crear cuenta
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
