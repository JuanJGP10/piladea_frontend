import { Bike, Map, Gift, Store, User, Settings, LogOut, Trophy, History, Home } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

// Elementos principales de navegación del menú lateral
const mainItems = [
  { title: "Inicio", url: "/home", icon: Home },
  { title: "Mapa", url: "/home/map", icon: Map },
  { title: "Mis rutas", url: "/home/routes", icon: History },
  { title: "Recompensas", url: "/home/rewards", icon: Gift },
  { title: "Comercios", url: "/home/stores", icon: Store },
];

// Elementos relacionados con la cuenta del usuario
const accountItems = [
  { title: "Perfil", url: "/home/profile", icon: User },
  { title: "Configuración", url: "/home/settings", icon: Settings },
];

/**
 * Componente AppSidebar
 * 
 * Este componente renderiza la barra lateral de navegación de la aplicación.
 * Utiliza componentes de la UI para estructurar el contenido en grupos (Navegación, Cuenta).
 * Gestiona el estado de colapso para adaptar la interfaz.
 */
export function AppSidebar() {
  // Hook para acceder al estado de la barra lateral (colapsada o expandida)
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      {/* Cabecera de la barra lateral con el logo y nombre de la app */}
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Bike className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-foreground">Piladea</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Grupo de Navegación Principal */}
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/home"}
                      className="flex items-center gap-3 hover:bg-accent/50 rounded-lg transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grupo de Cuenta de Usuario */}
        <SidebarGroup>
          <SidebarGroupLabel>Cuenta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 hover:bg-accent/50 rounded-lg transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Pie de la barra lateral con botón de cerrar sesión */}
      <SidebarFooter className="border-t border-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Cerrar sesión">
              <NavLink
                to="/"
                className="flex items-center gap-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span>Cerrar sesión</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
