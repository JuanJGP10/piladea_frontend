import { Bike } from "lucide-react";


/**
 * Componente Footer
 * 
 * Pie de página de la aplicación.
 * Muestra el logotipo de la marca, enlaces legales/navegación y el copyright con el año actual.
 * Utiliza un fondo oscuro para contrastar con el resto de la landing page.
 */
const Footer = () => {
  // Obtiene el año actual dinámicamente para el copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo y Nombre de la Marca */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Bike className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">Piladea</span>
          </div>

          {/* Enlaces de Navegación del Footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              Términos
            </a>
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              Contacto
            </a>
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              FAQ
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-background/60">
            © {currentYear} Piladea. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
