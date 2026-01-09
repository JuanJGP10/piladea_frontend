import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, Store, Map, Gift, LogOut, Shield, Users } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const adminItems = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Comercios", url: "/admin/stores", icon: Store },
    { title: "Rutas", url: "/admin/routes", icon: Map },
    { title: "Recompensas", url: "/admin/rewards", icon: Gift },
    { title: "Usuarios", url: "/admin/users", icon: Users },
];

export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b border-border p-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-destructive rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-destructive-foreground" />
                    </div>
                    <span className="text-lg font-bold text-foreground">Admin</span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Gestión</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <NavLink
                                            to={item.url}
                                            end={item.url === "/admin"}
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

            <SidebarFooter className="border-t border-border p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Salir">
                            <NavLink
                                to="/home"
                                className="flex items-center gap-3 text-muted-foreground hover:bg-accent/50 rounded-lg transition-colors"
                            >
                                <LogOut className="w-5 h-5 flex-shrink-0" />
                                <span>Volver a la App</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

const AdminLayout = () => {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <AdminSidebar />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <header className="h-16 border-b border-border bg-card flex items-center px-4 shrink-0">
                        <SidebarTrigger />
                        <h1 className="ml-4 text-lg font-semibold text-foreground">Panel de Administración</h1>
                    </header>
                    <div className="flex-1 overflow-auto p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default AdminLayout;
