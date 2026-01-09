import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Coins, Gift, Tag, Clock, ArrowRight } from "lucide-react";

// Datos de ejemplo para el catálogo de recompensas disponibles
const CATALOG_ITEMS = [
      {
            id: 1,
            title: "Café Gratis",
            description: "Canjeable en Café Central. Válido por un café de especialidad.",
            points: 500,
            image: "coffee",
            category: "Gastronomía"
      },
      {
            id: 2,
            title: "15% Descuento en Taller",
            description: "Válido para reparaciones en BikeShop Local.",
            points: 1200,
            image: "wrench",
            category: "Servicios"
      },
      {
            id: 3,
            title: "Entrada de Cine",
            description: "Entrada válida para cualquier película en Cines Plaza.",
            points: 2000,
            image: "film",
            category: "Ocio"
      }
];

// Datos de ejemplo para los cupones que el usuario ya ha canjeado
const MY_COUPONS = [
      {
            id: 101,
            title: "2x1 en Helados",
            store: "Heladería Ice",
            code: "ICE-2X1-998",
            expiry: "2024-12-31",
            status: "active"
      },
      {
            id: 102,
            title: "5€ de Descuento",
            store: "Librería Read",
            code: "LIB-5EU-123",
            expiry: "2024-11-30",
            status: "used"
      }
];

/**
 * Componente Rewards
 * 
 * Este componente gestiona el sistema de recompensas y canje de puntos.
 * Muestra el saldo actual de puntos del usuario y divide la vista en dos pestañas:
 * - Catálogo: Premios disponibles para canjear.
 * - Mis Cupones: Historial de cupones canjeados (activos y usados).
 */
const Rewards = () => {
      return (
            <div className="flex-1 p-8 space-y-8 animate-fade-in overflow-auto">
                  {/* Encabezado con título y saldo de puntos */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                              <h2 className="text-3xl font-bold tracking-tight">Recompensas</h2>
                              <p className="text-muted-foreground">Canjea tus puntos por premios exclusivos.</p>
                        </div>

                        {/* Tarjeta de visualización de puntos */}
                        <Card className="bg-primary text-primary-foreground border-none shadow-lg">
                              <CardContent className="p-6 flex items-center gap-4">
                                    <div className="p-3 bg-white/20 rounded-full">
                                          <Coins className="w-8 h-8" />
                                    </div>
                                    <div>
                                          <p className="text-sm font-medium opacity-90">Tus Puntos</p>
                                          <p className="text-3xl font-bold">1,250</p>
                                    </div>
                              </CardContent>
                        </Card>
                  </div>

                  {/* Sistema de pestañas para navegar entre Catálogo y Cupones */}
                  <Tabs defaultValue="catalog" className="space-y-6">
                        <TabsList>
                              <TabsTrigger value="catalog" className="flex items-center gap-2">
                                    <StoreIcon className="w-4 h-4" />
                                    Catálogo
                              </TabsTrigger>
                              <TabsTrigger value="coupons" className="flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    Mis Cupones
                              </TabsTrigger>
                        </TabsList>

                        <TabsContent value="catalog" className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {CATALOG_ITEMS.map((item) => (
                                          <Card key={item.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                                                <div className="h-40 bg-muted flex items-center justify-center relative group">
                                                      <Gift className="w-12 h-12 text-muted-foreground group-hover:scale-110 transition-transform" />
                                                      <Badge className="absolute top-4 right-4 bg-background text-foreground hover:bg-background">
                                                            {item.category}
                                                      </Badge>
                                                </div>
                                                <CardHeader>
                                                      <CardTitle>{item.title}</CardTitle>
                                                      <CardDescription>{item.description}</CardDescription>
                                                </CardHeader>
                                                <CardFooter className="mt-auto pt-0 flex items-center justify-between">
                                                      <div className="flex items-center gap-1.5 font-bold text-primary">
                                                            <Coins className="w-4 h-4" />
                                                            {item.points}
                                                      </div>
                                                      <Button size="sm" className="bg-gradient-cta shadow-button">
                                                            Canjear
                                                      </Button>
                                                </CardFooter>
                                          </Card>
                                    ))}
                              </div>
                        </TabsContent>

                        <TabsContent value="coupons" className="space-y-4">
                              <div className="grid gap-4">
                                    {MY_COUPONS.map((coupon) => (
                                          <Card key={coupon.id} className="flex flex-col sm:flex-row items-center p-4 gap-4">
                                                <div className={`p-3 rounded-full ${coupon.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                                      <Tag className="w-6 h-6" />
                                                </div>

                                                <div className="flex-1 text-center sm:text-left">
                                                      <h4 className="font-bold text-lg">{coupon.title}</h4>
                                                      <p className="text-sm text-muted-foreground">{coupon.store}</p>
                                                </div>

                                                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                                                      <div className="text-center sm:text-right">
                                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground justify-center sm:justify-end">
                                                                  <Clock className="w-3 h-3" />
                                                                  Caduca: {coupon.expiry}
                                                            </div>
                                                            <p className="font-mono text-sm bg-muted px-2 py-1 rounded mt-1">
                                                                  {coupon.code}
                                                            </p>
                                                      </div>

                                                      <Button variant={coupon.status === 'active' ? 'default' : 'secondary'} disabled={coupon.status !== 'active'}>
                                                            {coupon.status === 'active' ? 'Ver QR' : 'Canjeado'}
                                                            {coupon.status === 'active' && <ArrowRight className="w-4 h-4 ml-2" />}
                                                      </Button>
                                                </div>
                                          </Card>
                                    ))}
                              </div>
                        </TabsContent>
                  </Tabs>
            </div>
      );
};

// Componente auxiliar de icono para la pestaña de tienda
function StoreIcon(props: React.SVGProps<SVGSVGElement>) {
      return (
            <svg
                  {...props}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
            >
                  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                  <path d="M2 7h20" />
                  <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
            </svg>
      )
}

export default Rewards;
