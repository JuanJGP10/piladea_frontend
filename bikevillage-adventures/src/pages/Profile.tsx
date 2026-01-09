import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MapPin, Trophy, Coins, Settings, Bell, Shield } from "lucide-react";

/**
 * Componente Profile
 * 
 * Este componente muestra y permite editar la información del perfil del usuario.
 * Incluye estadísticas generales (distancia, puntos, logros) y pestañas para:
 * - Resumen: Actividad reciente
 * - Configuración: Edición de datos personales
 */
const Profile = () => {
      return (
            <div className="flex-1 p-8 space-y-8 animate-fade-in">
                  {/* Encabezado del Perfil */}
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex items-center gap-6">
                              <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                    <h2 className="text-3xl font-bold tracking-tight">Mauro G.</h2>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                          <MapPin className="w-4 h-4" />
                                          <span>Madrid, España</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full w-fit">
                                          <Trophy className="w-3 h-3" />
                                          <span>Nivel 12 - Explorador Experto</span>
                                    </div>
                              </div>
                        </div>

                        <div className="flex-1 w-full md:w-auto flex justify-end">
                              <Button variant="outline">
                                    Editar perfil
                              </Button>
                        </div>
                  </div>

                  {/* Tarjetas de Estadísticas Principales */}
                  <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Distancia Total</CardTitle>
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                              </CardHeader>
                              <CardContent>
                                    <div className="text-2xl font-bold">1,234 km</div>
                                    <p className="text-xs text-muted-foreground">+20.1% del mes pasado</p>
                              </CardContent>
                        </Card>
                        <Card>
                              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Puntos Ganados</CardTitle>
                                    <Coins className="h-4 w-4 text-accent" />
                              </CardHeader>
                              <CardContent>
                                    <div className="text-2xl font-bold">12,500</div>
                                    <p className="text-xs text-muted-foreground">5 cupones disponibles</p>
                              </CardContent>
                        </Card>
                        <Card>
                              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Logros</CardTitle>
                                    <Trophy className="h-4 w-4 text-primary" />
                              </CardHeader>
                              <CardContent>
                                    <div className="text-2xl font-bold">15/24</div>
                                    <p className="text-xs text-muted-foreground">3 desbloqueados esta semana</p>
                              </CardContent>
                        </Card>
                  </div>

                  {/* Pestañas de Contenido */}
                  <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                              <TabsTrigger value="overview">Resumen</TabsTrigger>
                              <TabsTrigger value="settings">Configuración</TabsTrigger>
                        </TabsList>

                        {/* Pestaña: Resumen de Actividad */}
                        <TabsContent value="overview" className="space-y-4">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>Actividad Reciente</CardTitle>
                                          <CardDescription>
                                                Tus últimas rutas y actividades en Piladea.
                                          </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                          {[1, 2, 3].map((i) => (
                                                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                                      <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                                  <MapPin className="w-5 h-5 text-primary" />
                                                            </div>
                                                            <div>
                                                                  <p className="font-medium">Ruta del Centro Histórico</p>
                                                                  <p className="text-sm text-muted-foreground">Hace 2 días • 5.2 km</p>
                                                            </div>
                                                      </div>
                                                      <div className="font-bold text-accent">+50 pts</div>
                                                </div>
                                          ))}
                                    </CardContent>
                              </Card>
                        </TabsContent>

                        {/* Pestaña: Configuración de Perfil */}
                        <TabsContent value="settings" className="space-y-4">
                              <Card>
                                    <CardHeader>
                                          <CardTitle>Información Personal</CardTitle>
                                          <CardDescription>
                                                Actualiza tu información personal y de contacto.
                                          </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                          <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                      <Label htmlFor="firstName">Nombre</Label>
                                                      <Input id="firstName" defaultValue="Mauro" />
                                                </div>
                                                <div className="space-y-2">
                                                      <Label htmlFor="lastName">Apellidos</Label>
                                                      <Input id="lastName" defaultValue="G." />
                                                </div>
                                          </div>
                                          <div className="space-y-2">
                                                <Label htmlFor="email">Correo electrónico</Label>
                                                <Input id="email" type="email" defaultValue="mauro@example.com" />
                                          </div>
                                          <Button>Guardar cambios</Button>
                                    </CardContent>
                              </Card>
                        </TabsContent>
                  </Tabs>
            </div>
      );
};

export default Profile;
