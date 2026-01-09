import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, ExternalLink, Store } from "lucide-react";

// Datos de ejemplo para los comercios locales
const STORES = [
      {
            id: 1,
            name: "Café Central",
            category: "Gastronomía",
            discount: "10% OFF",
            address: "Calle Mayor 123",
            distance: "0.2 km",
            image: "coffee",
            color: "bg-orange-100 text-orange-600"
      },
      {
            id: 2,
            name: "BikeShop Pro",
            category: "Ciclismo",
            discount: "Partner",
            address: "Av. Libertad 45",
            distance: "1.5 km",
            image: "bike",
            color: "bg-blue-100 text-blue-600"
      },
      {
            id: 3,
            name: "Gym FitLife",
            category: "Deporte",
            discount: "Matrícula Gratis",
            address: "Plaza España 8",
            distance: "0.8 km",
            image: "dumbbell",
            color: "bg-green-100 text-green-600"
      },
      {
            id: 4,
            name: "Librería Read",
            category: "Ocio",
            discount: "5% OFF",
            address: "Calle Luna 22",
            distance: "0.5 km",
            image: "book",
            color: "bg-purple-100 text-purple-600"
      },
      {
            id: 5,
            name: "Restaurante Sabor",
            category: "Gastronomía",
            discount: "Postre Gratis",
            address: "Paseo del Río 10",
            distance: "2.1 km",
            image: "utensils",
            color: "bg-red-100 text-red-600"
      },
      {
            id: 6,
            name: "Cines Plaza",
            category: "Ocio",
            discount: "2x1 Jueves",
            address: "Centro Comercial Sur",
            distance: "3.0 km",
            image: "film",
            color: "bg-pink-100 text-pink-600"
      }
];

/**
 * Componente Stores
 * 
 * Este componente muestra un directorio de comercios locales asociados.
 * Incluye funcionalidad de búsqueda por nombre y filtrado por categorías (Gastronomía, Ciclismo, etc.).
 * Muestra cada comercio en una tarjeta detallada con su oferta o descuento.
 */
const Stores = () => {
      // Estado para la categoría seleccionada
      const [selectedCategory, setSelectedCategory] = useState("Todos");
      // Estado para el término de búsqueda
      const [searchQuery, setSearchQuery] = useState("");

      // Filtra los comercios según la categoría y búsqueda
      const filteredStores = STORES.filter((store) => {
            const matchesCategory = selectedCategory === "Todos" || store.category === selectedCategory;
            const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
      });

      return (
            <div className="flex-1 p-8 space-y-8 animate-fade-in overflow-auto">
                  {/* Encabezado con título y barra de búsqueda */}
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div>
                              <h2 className="text-3xl font-bold tracking-tight">Comercios Locales</h2>
                              <p className="text-muted-foreground">Descubre descuentos exclusivos en tu ciudad.</p>
                        </div>

                        <div className="relative w-full md:w-72">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                    placeholder="Buscar comercios..."
                                    className="pl-9 bg-background"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                              />
                        </div>
                  </div>

                  {/* Filtros de Categoría */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                        {["Todos", "Gastronomía", "Ciclismo", "Deporte", "Ocio"].map((cat) => (
                              <Button
                                    key={cat}
                                    variant={selectedCategory === cat ? "default" : "outline"}
                                    size="sm"
                                    className="rounded-full"
                                    onClick={() => setSelectedCategory(cat)}
                              >
                                    {cat}
                              </Button>
                        ))}
                  </div>

                  {/* Rejilla de Comercios */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStores.map((store) => (
                              <Card key={store.id} className="hover:shadow-md transition-shadow">
                                    <div className={`h-32 ${store.color} flex items-center justify-center relative`}>
                                          <Store className="w-12 h-12 opacity-50" />
                                          <Badge className="absolute top-3 right-3 bg-white text-black hover:bg-white/90 shadow-sm">
                                                {store.discount}
                                          </Badge>
                                    </div>
                                    <CardHeader className="pb-3">
                                          <div className="flex justify-between items-start">
                                                <div>
                                                      <CardTitle className="text-xl">{store.name}</CardTitle>
                                                      <CardDescription className="flex items-center gap-1 mt-1">
                                                            <MapPin className="w-3 h-3" />
                                                            {store.address}
                                                      </CardDescription>
                                                </div>
                                                <Badge variant="secondary" className="text-xs">
                                                      {store.category}
                                                </Badge>
                                          </div>
                                    </CardHeader>
                                    <CardFooter className="border-t pt-4 flex items-center justify-between">
                                          <span className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {store.distance}
                                          </span>
                                          <Button size="sm" variant="outline">
                                                Ver Detalles <ExternalLink className="w-3 h-3 ml-2" />
                                          </Button>
                                    </CardFooter>
                              </Card>
                        ))}
                  </div>
            </div>
      );
};

export default Stores;
