import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
      Bell,
      Moon,
      Sun,
      Globe,
      Shield,
      Smartphone,
      Mail
} from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Componente Settings
 * 
 * Este componente permite al usuario personalizar diversas configuraciones de la aplicación:
 * - Apariencia: Tema claro, oscuro o del sistema.
 * - Notificaciones: Preferencias de email y push.
 * - General: Idioma.
 * - Privacidad: Ajustes de visibilidad del perfil.
 * 
 * Utiliza el hook useTheme para gestionar el tema global de la aplicación.
 */
const Settings = () => {
      const { theme, setTheme } = useTheme();

      return (
            <div className="flex-1 p-8 space-y-8 animate-fade-in max-w-4xl mx-auto">
                  <div>
                        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
                        <p className="text-muted-foreground">Gestiona tus preferencias de la aplicación.</p>
                  </div>

                  <div className="space-y-6">
                        {/* Configuración de Apariencia */}
                        <Card>
                              <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                          <Sun className="w-5 h-5" />
                                          Apariencia
                                    </CardTitle>
                                    <CardDescription>
                                          Personaliza el tema de la aplicación.
                                    </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4">
                                          {/* Opción Tema Claro */}
                                          <div
                                                onClick={() => setTheme("light")}
                                                className={cn(
                                                      "cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-accent",
                                                      theme === "light" ? "border-primary bg-accent" : "border-transparent bg-muted"
                                                )}
                                          >
                                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                                                      <Sun className="w-6 h-6" />
                                                </div>
                                                <span className="font-medium">Claro</span>
                                          </div>

                                          {/* Opción Tema Oscuro */}
                                          <div
                                                onClick={() => setTheme("dark")}
                                                className={cn(
                                                      "cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-accent",
                                                      theme === "dark" ? "border-primary bg-accent" : "border-transparent bg-muted"
                                                )}
                                          >
                                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-200">
                                                      <Moon className="w-6 h-6" />
                                                </div>
                                                <span className="font-medium">Oscuro</span>
                                          </div>

                                          {/* Opción Tema del Sistema */}
                                          <div
                                                onClick={() => setTheme("system")}
                                                className={cn(
                                                      "cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-accent",
                                                      theme === "system" ? "border-primary bg-accent" : "border-transparent bg-muted"
                                                )}
                                          >
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 dark:bg-blue-900 dark:text-blue-300">
                                                      <Smartphone className="w-6 h-6" />
                                                </div>
                                                <span className="font-medium">Sistema</span>
                                          </div>
                                    </div>
                              </CardContent>
                        </Card>

                        {/* Configuración de Notificaciones */}
                        <Card>
                              <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                          <Bell className="w-5 h-5" />
                                          Notificaciones
                                    </CardTitle>
                                    <CardDescription>
                                          Elige cómo quieres recibir las actualizaciones.
                                    </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                          <div className="space-y-0.5">
                                                <Label className="text-base flex items-center gap-2">
                                                      <Mail className="w-4 h-4" /> Notificaciones por Email
                                                </Label>
                                                <div className="text-sm text-muted-foreground">
                                                      Recibe resúmenes semanales y ofertas.
                                                </div>
                                          </div>
                                          <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                          <div className="space-y-0.5">
                                                <Label className="text-base flex items-center gap-2">
                                                      <Smartphone className="w-4 h-4" /> Notificaciones Push
                                                </Label>
                                                <div className="text-sm text-muted-foreground">
                                                      Avisos inmediatos sobre tu actividad.
                                                </div>
                                          </div>
                                          <Switch defaultChecked />
                                    </div>
                              </CardContent>
                        </Card>

                        {/* Configuración General */}
                        <Card>
                              <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                          <Globe className="w-5 h-5" />
                                          General
                                    </CardTitle>
                                    <CardDescription>
                                          Preferencias de idioma y región.
                                    </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                          <div className="space-y-0.5">
                                                <Label className="text-base">Idioma</Label>
                                                <div className="text-sm text-muted-foreground">
                                                      Selecciona el idioma de la interfaz.
                                                </div>
                                          </div>
                                          <Button variant="outline" size="sm">Español</Button>
                                    </div>
                              </CardContent>
                        </Card>

                        {/* Configuración de Privacidad */}
                        <Card>
                              <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                          <Shield className="w-5 h-5" />
                                          Privacidad
                                    </CardTitle>
                                    <CardDescription>
                                          Controla la visibilidad de tu perfil.
                                    </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                          <div className="space-y-0.5">
                                                <Label className="text-base">Perfil Público</Label>
                                                <div className="text-sm text-muted-foreground">
                                                      Permitir que otros usuarios vean tus estadísticas.
                                                </div>
                                          </div>
                                          <Switch defaultChecked />
                                    </div>
                              </CardContent>
                        </Card>
                  </div>
            </div>
      );
};

export default Settings;
