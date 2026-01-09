import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Bike } from "lucide-react";
import { useNavigate } from "react-router-dom";


/**
 * Componente Navbar
 * 
 * Barra de navegación principal de la landing page.
 * Características:
 * - Fija en la parte superior con efecto blur.
 * - Enlaces de anclaje para navegación suave (scroll) a secciones: Cómo funciona, Beneficios, Comercios.
 * - Botones de acción para Login y Registro.
 * - Diseño responsivo con menú hamburguesa para dispositivos móviles.
 */
const Navbar = () => {
  // Estado para controlar la apertura del menú móvil
  const [isOpen, setIsOpen] = useState(false);
  // Hook para navegación entre rutas
  const navigate = useNavigate();

  // Enlaces de navegación definidos
  const navLinks = [
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#beneficios", label: "Beneficios" },
    { href: "#comercios", label: "Comercios" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo y Nombre de la Marca */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center transition-transform group-hover:scale-105">
            <Bike className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Piladea
          </span>
        </a>

        {/* Navegación de Escritorio (oculta en móviles) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Botones de Acción de Escritorio */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="font-medium" onClick={() => navigate("/login")}>
            Iniciar sesión
          </Button>
          <Button className="bg-gradient-cta hover:opacity-90 shadow-button font-medium" onClick={() => navigate("/register")}>
            Registrarse
          </Button>
        </div>

        {/* Botón de Menú Móvil (Hamburguesa/Cerrar) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Menú Móvil Desplegable */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" className="w-full justify-center font-medium" onClick={() => navigate("/login")}>
                Iniciar sesión
              </Button>
              <Button className="w-full bg-gradient-cta shadow-button font-medium" onClick={() => navigate("/register")}>
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;