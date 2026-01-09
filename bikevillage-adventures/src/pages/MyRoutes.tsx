import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, Clock, Ruler, Trophy, ChevronRight } from "lucide-react";

// Interfaz que define la estructura de una ruta
interface Route {
    id: string;
    name: string;
    date: string;
    distance: string;
    duration: string;
    points: number;
    difficulty: "Fácil" | "Moderado" | "Difícil";
    image: string;
}

// Datos de ejemplo para las rutas completadas por el usuario
const MOCK_ROUTES: Route[] = [
    {
        id: "1",
        name: "Ruta Costera Matutina",
        date: "10 Dic, 2025",
        distance: "15.2 km",
        duration: "45 min",
        points: 150,
        difficulty: "Fácil",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: "2",
        name: "Desafío de Montaña",
        date: "08 Dic, 2025",
        distance: "28.5 km",
        duration: "1h 30min",
        points: 300,
        difficulty: "Difícil",
        image: "https://images.unsplash.com/photo-1519120944692-1a8d8cfc107f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: "3",
        name: "Paseo Urbano Nocturno",
        date: "05 Dic, 2025",
        distance: "10.0 km",
        duration: "40 min",
        points: 100,
        difficulty: "Moderado",
        image: "https://images.unsplash.com/photo-1496147539180-13929f8aa03a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
];

/**
 * Componente MyRoutes
 * 
 * Este componente muestra la lista de rutas realizadas por el usuario.
 * Presenta cada ruta como una tarjeta con información detallada (distancia, duración, puntos, dificultad)
 * y una imagen representativa.
 */
const MyRoutes = () => {
    return (
        <div className="p-6 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Mis Rutas</h2>
                    <p className="text-muted-foreground">Historial de tus aventuras en bicicleta</p>
                </div>
                <Button>
                    <Map className="mr-2 h-4 w-4" />
                    Nueva Ruta
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_ROUTES.map((route) => (
                    <Card key={route.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={route.image}
                                alt={route.name}
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                            />
                            <Badge className="absolute top-3 right-3" variant={route.difficulty === "Difícil" ? "destructive" : route.difficulty === "Moderado" ? "secondary" : "default"}>
                                {route.difficulty}
                            </Badge>
                        </div>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">{route.name}</CardTitle>
                            <CardDescription>{route.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-lg">
                                    <Ruler className="h-4 w-4 mb-1 text-primary" />
                                    <span className="text-xs font-medium">{route.distance}</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-lg">
                                    <Clock className="h-4 w-4 mb-1 text-primary" />
                                    <span className="text-xs font-medium">{route.duration}</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-lg">
                                    <Trophy className="h-4 w-4 mb-1 text-yellow-500" />
                                    <span className="text-xs font-medium">{route.points} pts</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full group">
                                Ver Detalles
                                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MyRoutes;
