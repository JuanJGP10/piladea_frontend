import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bike, Mail, Lock, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/**
 * Componente Login
 * 
 * Este componente muestra un modal para iniciar sesión en la aplicación.
 * Incluye validación básica de formulario, opciones para mostrar/ocultar contraseña,
 * enlaces para recuperación de contraseña y registro de nueva cuenta.
 */
const Login = () => {
  const navigate = useNavigate();
  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);
  // Estados para los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Actualmente simula un login exitoso redirigiendo al usuario a /home.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - redirigir a home
    navigate("/home");
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
              Bienvenido de nuevo
            </DialogTitle>
            <DialogDescription className="text-center">
              Inicia sesión para continuar pedaleando
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="••••••••"
                  className="pl-9 pr-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button type="submit" className="w-full shadow-button bg-gradient-cta hover:opacity-90">
              Iniciar sesión
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
