import { Bike, Coins, Gift } from "lucide-react";


// Lista de pasos que describen el funcionamiento de la aplicación con iconos y colores temáticos
const steps = [
  {
    icon: Bike,
    title: "Pedalea por el pueblo",
    description: "Activa la app y recorre las calles de tu ciudad en bicicleta. Cada kilómetro cuenta.",
    color: "primary",
  },
  {
    icon: Coins,
    title: "Gana monedas",
    description: "Acumula monedas virtuales automáticamente mientras pedaleas. ¡Cuanto más recorras, más ganas!",
    color: "secondary",
  },
  {
    icon: Gift,
    title: "Canjea cupones",
    description: "Usa tus monedas para obtener descuentos exclusivos en los comercios locales de tu zona.",
    color: "accent",
  },
];


/**
 * Componente HowItWorks
 * 
 * Explica el proceso de uso de la aplicación en 3 pasos sencillos.
 * Muestra visualmente la progresión mediante tarjetas conectadas con una línea.
 * Cada paso tiene un icono y un color distintivo para facilitar la comprensión.
 */
const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Es tan fácil como montar en bici. Tres simples pasos para empezar a ganar recompensas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Mapeo de los pasos definidos anteriormente */}
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Línea conectora entre pasos (visible solo en pantallas medianas y grandes) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2 relative">
                {/* Número del paso */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icono del paso con color dinámico */}
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${step.color === "primary" ? "bg-primary/10" :
                  step.color === "secondary" ? "bg-secondary/10" :
                    "bg-accent/10"
                  }`}>
                  <step.icon className={`w-8 h-8 ${step.color === "primary" ? "text-primary" :
                    step.color === "secondary" ? "text-secondary" :
                      "text-accent"
                    }`} />
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
