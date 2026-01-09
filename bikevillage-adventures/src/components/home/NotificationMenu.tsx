import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

// Interfaz que define la estructura de una notificación
interface Notification {
    id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
}

// Datos de ejemplo para las notificaciones
const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        title: "¡Bienvenido!",
        message: "Gracias por unirte a Piladea.",
        date: "Hace 2 horas",
        read: false,
    },
    {
        id: "2",
        title: "Nueva recompensa",
        message: "Has desbloqueado una nueva insignia: Explorador Novato.",
        date: "Hace 1 día",
        read: false,
    },
    {
        id: "3",
        title: "Evento próximo",
        message: "No te pierdas la ruta grupal este fin de semana.",
        date: "Hace 2 días",
        read: true,
    },
];

/**
 * Componente NotificationMenu
 * 
 * Muestra un menú desplegable con las notificaciones del usuario.
 * Incluye un indicador visual (punto rojo) si hay notificaciones no leídas.
 * Muestra la lista de notificaciones con título, mensaje y fecha.
 */
export const NotificationMenu = () => {
    // Calcula la cantidad de notificaciones no leídas
    const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {/* Indicador de notificaciones no leídas */}
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                    {MOCK_NOTIFICATIONS.length > 0 ? (
                        MOCK_NOTIFICATIONS.map((notification) => (
                            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                                <div className="flex justify-between w-full items-start mb-1">
                                    <span className={`font-medium ${!notification.read ? "text-primary" : ""}`}>
                                        {notification.title}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{notification.date}</span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {notification.message}
                                </p>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No tienes notificaciones
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
