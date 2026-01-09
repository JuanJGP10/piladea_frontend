import { MapPin, Coins, Trophy, Gift } from "lucide-react";

/**
 * Componente AppPreview
 * 
 * Este componente muestra una vista previa visual de la interfaz de la aplicación.
 * Presenta una composición de "pantallas" simuladas que destacan funcionalidades clave:
 * - Mapa de rutas
 * - Panel principal con estadísticas (distancia, logros, cupones)
 * - Sección de recompensas
 * 
 * Utiliza transformaciones CSS para crear un efecto de presentación atractivo.
 */
const AppPreview = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Descubre la app
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una interfaz intuitiva diseñada para que solo te preocupes de una cosa: disfrutar pedaleando.
          </p>
        </div>

        <div className="flex justify-center items-end gap-4 sm:gap-8 max-w-4xl mx-auto">
          {/* Pantalla 1 - Rutas: Muestra la funcionalidad de mapa y seguimiento */}
          <div className="w-48 sm:w-56 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="bg-foreground rounded-[2rem] p-2 shadow-2xl">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-[1.75rem] p-4 aspect-[9/16]">
                <div className="bg-background/95 rounded-xl p-3 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium text-sm">Mis rutas</span>
                  </div>
                  <div className="flex-1 bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2">
                        <MapPin className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground">Mapa de rutas</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 bg-muted rounded-lg" />
                    <div className="h-8 bg-muted rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pantalla 2 - Principal: Elemento central destacado con estadísticas del usuario */}
          <div className="w-56 sm:w-64 z-10 hover:scale-105 transition-transform duration-500">
            <div className="bg-foreground rounded-[2.5rem] p-2.5 shadow-2xl">
              <div className="bg-gradient-to-br from-primary via-primary to-secondary rounded-[2.25rem] p-4 aspect-[9/16]">
                <div className="bg-background/95 rounded-xl p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-bold text-foreground">Piladea</span>
                    <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-full">
                      <Coins className="w-4 h-4 text-accent" />
                      <span className="text-sm font-bold text-accent">320</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-3">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Hoy has recorrido</p>
                      <p className="font-display text-3xl font-bold text-primary">5.2 km</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted rounded-lg p-3 text-center">
                        <Trophy className="w-5 h-5 mx-auto text-secondary mb-1" />
                        <p className="text-xs font-medium">3 logros</p>
                      </div>
                      <div className="bg-muted rounded-lg p-3 text-center">
                        <Gift className="w-5 h-5 mx-auto text-accent mb-1" />
                        <p className="text-xs font-medium">2 cupones</p>
                      </div>
                    </div>

                    <div className="flex-1 bg-muted rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pantalla 3 - Recompensas: Muestra la lista de premios y progreso */}
          <div className="w-48 sm:w-56 transform rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="bg-foreground rounded-[2rem] p-2 shadow-2xl">
              <div className="bg-gradient-to-br from-accent to-accent/70 rounded-[1.75rem] p-4 aspect-[9/16]">
                <div className="bg-background/95 rounded-xl p-3 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="w-5 h-5 text-accent" />
                    <span className="font-medium text-sm">Recompensas</span>
                  </div>
                  <div className="space-y-3 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-muted rounded-lg p-3 flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                          <Gift className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-muted-foreground/20 rounded w-20 mb-1" />
                          <div className="h-2 bg-muted-foreground/10 rounded w-14" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
