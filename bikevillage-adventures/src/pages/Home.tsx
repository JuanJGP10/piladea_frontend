import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/home/AppSidebar";
import MapPlaceholder from "@/components/home/MapPlaceholder";
import { NotificationMenu } from "@/components/home/NotificationMenu";
import Profile from "@/pages/Profile";
import Rewards from "@/pages/Rewards";
import Stores from "@/pages/Stores";
import Settings from "@/pages/Settings";
import MyRoutes from "@/pages/MyRoutes";
import Dashboard from "@/pages/Dashboard";
import { Bell, Coins, User, LogOut, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Componente Home
 * 
 * Este componente actúa como el layout principal para la zona autenticada de la aplicación.
 * Gestiona la barra lateral de navegación (Sidebar), el encabezado superior y el enrutamiento
 * de las sub-páginas internas (Dashboard, Mapa, Perfil, etc.).
 */
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we are on the map page
  const isMapPage = location.pathname.includes('/map');

  return (
    <SidebarProvider>
      <div className="h-[100dvh] flex w-full bg-background overflow-hidden">
        {/* Barra lateral de navegación */}
        <AppSidebar />

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Encabezado Principal - Hidden on Map Page */}
          {!isMapPage && (
            <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-lg font-semibold text-foreground">Mapa</h1>
              </div>

              <div className="flex items-center gap-3">
                {/* Visualización de Puntos Acumulados */}
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">1,250 pts</span>
                </div>

                {/* Menú de Notificaciones */}
                <NotificationMenu />

                {/* Menú de Usuario (Perfil, Configuración, Cerrar Sesión) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border overflow-hidden">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/home/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/home/settings")}>
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      <span>Configuración</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => navigate("/")}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
          )}



          {/* Área de Contenido Principal - Enrutamiento Interno */}
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="map" element={<div className="h-full w-full"><MapPlaceholder /></div>} />
              <Route path="profile" element={<Profile />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="stores" element={<Stores />} />
              <Route path="routes" element={<MyRoutes />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Home;
