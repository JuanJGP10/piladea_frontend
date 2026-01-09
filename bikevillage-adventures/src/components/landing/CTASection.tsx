import { Button } from "@/components/ui/button";
import { Bike, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Componente CTASection (Call To Action)
 * 
 * Esta sección final incita al usuario a registrarse o iniciar sesión.
 * Incluye un diseño llamativo con degradados y botones de acción claros.
 * Proporciona acceso directo a las rutas de registro ("/register") y login ("/login").
 */
const CTASection = () => {
  // Hook para navegación programática
  const navigate = useNavigate();

  return (
    <section className="py-20 relative overflow-hidden"> {/* Seccion principal */}
      {/* Fondo con degradado y patrón decorativo */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />

      <div className="container mx-auto px-4 relative"> {/* Contenedor principal de contenido */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-8">
            <Bike className="w-10 h-10 text-white" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"> {/* Titulo */}
            Empieza a pedalear y gana recompensas hoy mismo
          </h2>

          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto"> {/* Subtitulo */}
            Únete a miles de ciclistas que ya están transformando su ciudad mientras cuidan su salud y su bolsillo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center"> {/* Grupo de Botones de Acción */}
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 h-14 font-medium shadow-lg"
              onClick={() => navigate("/register")}
            > {/* Boton de registro */}
              Crear cuenta gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 h-14 font-medium bg-transparent"
              onClick={() => navigate("/login")}
            > {/* Boton de login */}
              Iniciar sesión
            </Button>
          </div>

          <p className="text-white/60 text-sm mt-8"> {/* Texto de información adicional */}
            Registro gratuito • Sin tarjeta de crédito • Disponible en iOS y Android
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
