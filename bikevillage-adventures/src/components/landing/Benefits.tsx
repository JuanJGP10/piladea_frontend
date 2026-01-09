import { Trophy, Store, Heart, Zap, Users, Leaf } from "lucide-react";


// Lista de beneficios principales con sus iconos, títulos, descripciones y gradientes asociados
const benefits = [
  {
    icon: Trophy,
    title: "Gamificación total",
    description: "Completa retos semanales, desbloquea logros únicos y compite en el ranking local de ciclistas.",
    gradient: "from-primary to-primary/50",
  },
  {
    icon: Store,
    title: "Apoya al comercio local",
    description: "Tus monedas se convierten en compras reales en tiendas, cafeterías y restaurantes de tu barrio.",
    gradient: "from-secondary to-secondary/50",
  },
  {
    icon: Heart,
    title: "Vida más saludable",
    description: "Mantente activo mientras ganas. Pedalear es bueno para tu cuerpo, mente y bolsillo.",
    gradient: "from-accent to-accent/50",
  },
];

// Lista de beneficios adicionales más breves
const additionalBenefits = [
  { icon: Zap, text: "Tracking GPS preciso" },
  { icon: Users, text: "Comunidad activa" },
  { icon: Leaf, text: "Reduce tu huella" },
];

/**
 * Componente Benefits
 * 
 * Este componente presenta los beneficios clave de la aplicación.
 * Utiliza una cuadrícula (grid) para mostrar los beneficios principales en tarjetas interactivas.
 * Muestra una lista de beneficios secundarios en la parte inferior.
 */
const Benefits = () => {
  return (

    <section id="beneficios" className="py-20">
      <div className="container mx-auto px-4"> {/* Contenedor principal */}
        <div className="text-center mb-16"> {/* Contenedor de texto */}
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4"> {/* Titulo */}
            Beneficios que marcan la diferencia
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto"> {/* Subtitulo */}
            Piladea no es solo una app, es un movimiento que transforma tu ciudad.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12"> {/* Grid de beneficios */}
          {/* Mapeo de beneficios para generar las tarjetas */}
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-card hover:shadow-xl transition-all duration-500"
            > {/* Contenedor de beneficio */}
              {/* Fondo degradado al pasar el mouse */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              {/* Icono de beneficio */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              {/* Titulo de beneficio */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {benefit.title}
              </h3>
              {/* Descripcion de beneficio */}
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tira de beneficios adicionales (tracking, comunidad, ecología) */}
        <div className="flex flex-wrap justify-center gap-6">
          {additionalBenefits.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-5 py-3 bg-muted rounded-full"
            > {/* Contenedor de beneficio adicional */}
              <item.icon className="w-5 h-5 text-primary" /> {/* Icono de beneficio adicional */}
              <span className="font-medium text-foreground">{item.text}</span> {/* Texto de beneficio adicional */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
