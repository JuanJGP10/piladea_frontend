import { Button } from "@/components/ui/button";
import { Smartphone, Coins, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Componente HeroSection
 * 
 * Es la sección principal de la landing page (la primera que ve el usuario).
 * Su objetivo es captar la atención inmediatamente con:
 * - Un título impactante y propuesta de valor clara.
 * - Botones de llamada a la acción (CTA) para registro y login.
 * - Una representación visual atractiva de la app (mockup de teléfono) con animaciones.
 * - Estadísticas sociales para generar confianza (usuarios, comercios, km).
 */
const HeroSection = () => {
  // Hook para navegación
  const navigate = useNavigate();

  return (
    <section className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden">
      {/* Elementos decorativos de fondo (blobs con desenfoque) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Columna Izquierda: Textos y Botones */}
          <div className="text-center lg:text-left space-y-6">
            {/* Etiqueta destacada */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm animate-fade-in">
              <Coins className="w-4 h-4" /> {/* Icono */}
              <span>Gana recompensas pedaleando</span> {/* Texto */}
            </div>

            {/* Titulo Principal con animación */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Pedalea.{" "}
              <span className="text-gradient">Gana.</span>{" "} {/* Texto con gradiente */}
              <span className="text-accent">Disfruta.</span> {/* Texto destacado */}
            </h1>

            {/* Descripción / Subtítulo */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Recorre tu pueblo en bicicleta, acumula monedas virtuales con cada kilómetro
              y canjéalas por descuentos exclusivos en los comercios de tu ciudad.
            </p>

            {/* Grupo de Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" className="bg-gradient-cta hover:opacity-90 shadow-button text-lg px-8 h-14 font-medium" onClick={() => navigate("/register")}>
                Crear cuenta gratis
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 font-medium border-2" onClick={() => navigate("/login")}>
                Iniciar sesión
              </Button>
            </div>

            {/* Estadísticas de la plataforma */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-foreground">2.5K+</p>
                <p className="text-sm text-muted-foreground">Usuarios activos</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-foreground">150+</p>
                <p className="text-sm text-muted-foreground">Comercios</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-foreground">50K</p>
                <p className="text-sm text-muted-foreground">Km recorridos</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Mockup del Teléfono y Elementos Flotantes */}
          <div className="relative flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative animate-float">
              {/* Marco del Teléfono */}
              <div className="w-64 sm:w-72 h-[500px] sm:h-[560px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary via-primary to-secondary rounded-[2.5rem] flex flex-col items-center justify-center p-6">
                  {/* Mockup de la UI de la App - Tarjeta de Ruta */}
                  <div className="w-full bg-background/95 rounded-2xl p-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Ruta activa</p>
                        <p className="text-xs text-muted-foreground">Centro histórico</p>
                      </div>
                    </div>
                    <div className="h-24 bg-muted rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <p className="font-display text-3xl font-bold text-primary">3.2 km</p>
                        <p className="text-xs text-muted-foreground">Distancia recorrida</p>
                      </div>
                    </div>
                  </div>

                  {/* Mockup de la UI de la App - Tarjeta de Monedas */}
                  <div className="w-full bg-background/95 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-accent" />
                        <span className="font-medium text-foreground">Monedas ganadas</span>
                      </div>
                      <span className="font-display text-xl font-bold text-accent">+32</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elementos flotantes animados alrededor del teléfono */}
              <div className="absolute -right-4 top-20 bg-card p-3 rounded-xl shadow-card animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Coins className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="font-medium text-sm">+10 monedas</span>
                </div>
              </div>

              <div className="absolute -left-4 bottom-32 bg-card p-3 rounded-xl shadow-card animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm">¡Nuevo logro!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
