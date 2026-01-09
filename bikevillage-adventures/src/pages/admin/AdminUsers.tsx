import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Edit, Trash2, Eye, Map, Gift, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

// Mock Data
const USERS = [
    {
        id: 1,
        name: "Mauro Miralles",
        email: "mauro@example.com",
        role: "Usuario",
        status: "Activo",
        joinDate: "2024-01-15",
        avatar: "MG",
        stats: { routes: 12, distance: "156 km", rewards: 3 }
    },
    {
        id: 2,
        name: "Ana López",
        email: "ana.lopez@example.com",
        role: "Premium",
        status: "Activo",
        joinDate: "2024-02-01",
        avatar: "AL",
        stats: { routes: 8, distance: "92 km", rewards: 1 }
    },
    {
        id: 3,
        name: "Carlos Ruiz",
        email: "carlos.r@example.com",
        role: "Usuario",
        status: "Inactivo",
        joinDate: "2023-11-20",
        avatar: "CR",
        stats: { routes: 25, distance: "340 km", rewards: 8 }
    },
];

const USER_ROUTES = [
    { id: 1, name: "Ruta del Lago", date: "2024-03-10", distance: "12.5 km", status: "Completada" },
    { id: 2, name: "Subida al Mirador", date: "2024-03-08", distance: "8.2 km", status: "Completada" },
    { id: 3, name: "Paseo Urbano", date: "2024-03-05", distance: "5.0 km", status: "Completada" },
];

const USER_REWARDS = [
    { id: 1, name: "Descuento Café Central", code: "CAFE10", status: "Canjeada", date: "2024-02-15" },
    { id: 2, name: "Mantenimiento Gratis", code: "BIKEFIX", status: "Disponible", date: "-" },
];

const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<typeof USERS[0] | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const filteredUsers = USERS.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        toast.success("Usuario eliminado correctamente (Simulación)");
    };

    const handleEdit = (id: number) => {
        toast.info("Abrir modal de edición (Simulación)");
    };

    const openUserDetails = (user: typeof USERS[0]) => {
        setSelectedUser(user);
        setIsSheetOpen(true);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
                    <p className="text-muted-foreground">Administra los usuarios registrados y ver su actividad.</p>
                </div>
                <Button>Nuevo Usuario</Button>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Usuario</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha Registro</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                                        <AvatarFallback>{user.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.role === "Premium" ? "default" : "secondary"}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {user.status}
                                    </span>
                                </TableCell>
                                <TableCell>{user.joinDate}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => openUserDetails(user)}>
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(user.id)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(user.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                    {selectedUser && (
                        <>
                            <SheetHeader className="mb-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-16 h-16">
                                        <AvatarImage src={`https://avatar.vercel.sh/${selectedUser.email}`} />
                                        <AvatarFallback>{selectedUser.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <SheetTitle className="text-2xl">{selectedUser.name}</SheetTitle>
                                        <SheetDescription>{selectedUser.email}</SheetDescription>
                                        <div className="flex gap-2 mt-2">
                                            <Badge>{selectedUser.role}</Badge>
                                            <Badge variant="outline">ID: #{selectedUser.id}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </SheetHeader>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-muted/50 p-4 rounded-lg text-center">
                                    <Map className="w-5 h-5 mx-auto mb-2 text-primary" />
                                    <p className="text-2xl font-bold">{selectedUser.stats.routes}</p>
                                    <p className="text-xs text-muted-foreground">Rutas</p>
                                </div>
                                <div className="bg-muted/50 p-4 rounded-lg text-center">
                                    <Clock className="w-5 h-5 mx-auto mb-2 text-primary" />
                                    <p className="text-2xl font-bold">{selectedUser.stats.distance}</p>
                                    <p className="text-xs text-muted-foreground">Distancia</p>
                                </div>
                                <div className="bg-muted/50 p-4 rounded-lg text-center">
                                    <Gift className="w-5 h-5 mx-auto mb-2 text-primary" />
                                    <p className="text-2xl font-bold">{selectedUser.stats.rewards}</p>
                                    <p className="text-xs text-muted-foreground">Recompensas</p>
                                </div>
                            </div>

                            <Tabs defaultValue="routes" className="w-full">
                                <TabsList className="w-full">
                                    <TabsTrigger value="routes" className="flex-1">Rutas Completadas</TabsTrigger>
                                    <TabsTrigger value="rewards" className="flex-1">Recompensas</TabsTrigger>
                                </TabsList>
                                <TabsContent value="routes" className="mt-4 space-y-4">
                                    {USER_ROUTES.map(route => (
                                        <div key={route.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary/10 p-2 rounded-full">
                                                    <Map className="w-4 h-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{route.name}</p>
                                                    <p className="text-xs text-muted-foreground">{route.date} • {route.distance}</p>
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> {route.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="rewards" className="mt-4 space-y-4">
                                    {USER_REWARDS.map(reward => (
                                        <div key={reward.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-orange-100 p-2 rounded-full">
                                                    <Gift className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{reward.name}</p>
                                                    <p className="text-xs text-muted-foreground">Código: {reward.code}</p>
                                                </div>
                                            </div>
                                            <Badge variant={reward.status === "Canjeada" ? "secondary" : "outline"}>
                                                {reward.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default AdminUsers;
