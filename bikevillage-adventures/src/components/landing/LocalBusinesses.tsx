import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Store, Coffee, Utensils, ShoppingBag, Dumbbell, Cake, ChevronDown, ChevronUp } from "lucide-react";


// Lista de prueba de los diferentes comercios colaboradores con sus descuentos
const businesses = [
  { name: "Café Central", icon: Coffee, discount: "15% dto" },
  { name: "Restaurante Sol", icon: Utensils, discount: "10% dto" },
  { name: "Tienda Verde", icon: ShoppingBag, discount: "20% dto" },
  { name: "Gym Fit", icon: Dumbbell, discount: "1 día gratis" },
  { name: "Pastelería Luna", icon: Cake, discount: "2x1 café" },
  { name: "Mercado Local", icon: Store, discount: "5€ dto" },
];


/**
 * Componente LocalBusinesses
 * 
 * Muestra la sección de comercios colaboradores y permite a nuevos negocios unirse.
 * Incluye un formulario desplegable ("Acordeón") para que los comercios interesados
 * envíen una solicitud de contacto con sus datos.
 */
const LocalBusinesses = () => {
  // Estado para controlar la visibilidad del formulario de contacto
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Maneja el envío del formulario de solicitud de colaboración
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Solicitud enviada correctamente", {
      description: "Nos pondremos en contacto contigo pronto para verificar tu negocio."
    });
    setIsFormOpen(false);
  };

  return (
    <section id="comercios" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comercios colaboradores
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Colaboramos con los negocios de tu ciudad para ofrecerte las mejores recompensas.
          </p>
        </div>

        {/* 
          Sección comentada temporalmente: Grid de comercios destacados.
          Puede descomentarse para mostrar los logos o nombres de comercios actuales.
        */}
        {/*<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-12">
          {businesses.map((business, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <business.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium text-foreground text-sm mb-1">{business.name}</p>
              <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                {business.discount}
              </span>
            </div>
          ))} 
        </div>*/}

        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-6">
              ¿Tienes un negocio local? Únete a nuestra red de comercios colaboradores.
            </p>
            {/* Botón para desplegar/ocultar el formulario */}
            <Button
              variant="outline"
              size="lg"
              className="font-medium border-2"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              <Store className="w-5 h-5 mr-2" />
              Quiero ser colaborador
              {isFormOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </div>

          {/* Formulario desplegable con animación de altura/opacidad */}
          <div className={`grid transition-all duration-300 ease-in-out ${isFormOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
              <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Nombre del comercio</Label>
                      <Input id="businessName" placeholder="Ej: Cafetería Central" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Persona de contacto</Label>
                      <Input id="contactName" placeholder="Tu nombre" required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" placeholder="contacto@negocio.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" type="tel" placeholder="+34 600 000 000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje (Opcional)</Label>
                    <Textarea id="message" placeholder="Cuéntanos sobre tu negocio..." />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-cta shadow-button font-medium">
                    Enviar solicitud
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalBusinesses;
