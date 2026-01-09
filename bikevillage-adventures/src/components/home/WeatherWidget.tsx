import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Wind, Droplets, ThermometerSun } from "lucide-react";

export const WeatherWidget = () => {
    return (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border-none shadow-md">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <CloudSun className="w-5 h-5 text-yellow-500" />
                    El Tiempo en Piladea
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-white dark:bg-slate-700 p-3 rounded-full shadow-sm">
                            <ThermometerSun className="w-8 h-8 text-orange-500" />
                        </div>
                        <div>
                            <span className="text-4xl font-bold tracking-tighter">24°</span>
                            <p className="text-sm text-muted-foreground font-medium">Mayormente Soleado</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-700/60 p-2 rounded-lg">
                        <Wind className="w-4 h-4 text-blue-500" />
                        <div>
                            <p className="text-xs text-muted-foreground">Viento</p>
                            <p className="font-semibold text-sm">12 km/h NE</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-700/60 p-2 rounded-lg">
                        <Droplets className="w-4 h-4 text-cyan-500" />
                        <div>
                            <p className="text-xs text-muted-foreground">Humedad</p>
                            <p className="font-semibold text-sm">45%</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        ¡Condiciones perfectas para una ruta larga!
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
