import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MapPin, Flame, Leaf, Trophy, ArrowRight, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WeatherWidget } from "@/components/home/WeatherWidget";

// Datos de ejemplo para el gráfico de actividad semanal
const WEEKLY_DATA = [
    { day: "Lun", km: 12 },
    { day: "Mar", km: 8 },
    { day: "Mié", km: 15 },
    { day: "Jue", km: 0 },
    { day: "Vie", km: 22 },
    { day: "Sáb", km: 45 },
    { day: "Dom", km: 30 },
];

// Datos de ejemplo para la actividad reciente del usuario
const RECENT_ACTIVITY = [
    { id: 1, name: "Ruta del Lago", date: "Hoy", distance: "12.5 km", time: "45 min" },
    { id: 2, name: "Subida al Mirador", date: "Ayer", distance: "8.2 km", time: "35 min" },
    { id: 3, name: "Paseo Urbano", date: "Hace 2 días", distance: "5.0 km", time: "20 min" },
];

/**
 * Componente Dashboard
 * 
 * Este componente muestra la vista principal del usuario autenticado.
 * Incluye un resumen de estadísticas, gráfico de actividad semanal,
 * progreso hacia el siguiente objetivo y actividad reciente.
 */
const Dashboard = () => {
    // Hook de navegación para redirigir a otras rutas
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-8 animate-fade-in">
            {/* Encabezado del Dashboard con saludo y botón de acceso rápido al mapa */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Hola, Mauro 👋</h2>
                    <p className="text-muted-foreground">Aquí tienes el resumen de tu actividad semanal.</p>
                </div>
                <Button onClick={() => navigate("/home/map")}>
                    <MapPin className="mr-2 h-4 w-4" />
                    Ver Mapa
                </Button>
            </div>

            {/* Sección de Estadísticas Rápidas (tarjetas con iconos) */}
            <div className="grid gap-4 md:grid-cols-3">
                {/* Tarjeta de Distancia Semanal */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Distancia Semanal</CardTitle>
                        <Activity className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">132 km</div>
                        <p className="text-xs text-muted-foreground">+12% vs semana anterior</p>
                    </CardContent>
                </Card>

                {/* Tarjeta de Calorías Quemadas */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Calorías Quemadas</CardTitle>
                        <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4,250 kcal</div>
                        <p className="text-xs text-muted-foreground">¡Excelente trabajo!</p>
                    </CardContent>
                </Card>

                {/* Tarjeta de CO2 Ahorrado */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">CO2 Ahorrado</CardTitle>
                        <Leaf className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15.4 kg</div>
                        <p className="text-xs text-muted-foreground">Equivalente a 2 árboles</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Gráfico de Actividad Semanal usando Recharts */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Actividad Diaria</CardTitle>
                        <CardDescription>Kilómetros recorridos en los últimos 7 días</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={WEEKLY_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="day"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'var(--accent)', opacity: 0.1 }}
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--popover))',
                                            color: 'hsl(var(--popover-foreground))',
                                            borderRadius: '8px',
                                            border: '1px solid hsl(var(--border))',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Bar dataKey="km" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {/* Tarjeta de Próximo Objetivo */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                Próximo Objetivo
                            </CardTitle>
                            <CardDescription>Nivel 13 - Maestro de la Ruta</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span>Progreso actual</span>
                                <span className="font-medium">1,250 / 1,500 pts</span>
                            </div>
                            <Progress value={83} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                                Te faltan 250 puntos para subir de nivel. ¡Completa 2 rutas más!
                            </p>
                        </CardContent>
                    </Card>

                    {/* Lista de Actividad Reciente */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Actividad Reciente</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {RECENT_ACTIVITY.map((activity) => (
                                    <div key={activity.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                                <MapPin className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{activity.name}</p>
                                                <p className="text-xs text-muted-foreground">{activity.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-sm">{activity.distance}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full mt-4 text-primary" onClick={() => navigate("/home/routes")}>
                                Ver todas las rutas <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
