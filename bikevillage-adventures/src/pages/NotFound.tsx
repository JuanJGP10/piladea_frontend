import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * Componente NotFound
 * 
 * Este componente se muestra cuando el usuario intenta acceder a una ruta que no existe.
 * Registra el intento de acceso en la consola y muestra un mensaje amigable con enlace de retorno.
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Usuario intentó acceder a una ruta inexistente:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">¡Oops! Página no encontrada</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
