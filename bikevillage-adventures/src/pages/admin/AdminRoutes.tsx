import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Trash2, Edit, Map } from "lucide-react";

const AdminRoutes = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Gestión de Rutas</h2>
                    <p className="text-muted-foreground">Administra las rutas disponibles en la plataforma.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Ruta
                </Button>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input placeholder="Buscar rutas..." />
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Distancia</TableHead>
                            <TableHead>Dificultad</TableHead>
                            <TableHead>Puntos</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[1, 2, 3].map((i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <Map className="w-4 h-4 text-muted-foreground" />
                                    Ruta del Valle
                                </TableCell>
                                <TableCell>12.5 km</TableCell>
                                <TableCell>Media</TableCell>
                                <TableCell>150 pts</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminRoutes;
