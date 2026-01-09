import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bike, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
} from "@/components/ui/dialog";

/**
 * Componente ForgotPassword
 * 
 * Este componente muestra un modal para recuperar la contraseña.
 * El usuario ingresa su correo electrónico y se simula el envío de un enlace de recuperación.
 */
const ForgotPassword = () => {
      const navigate = useNavigate();
      // Estado para controlar el valor del input de email
      const [email, setEmail] = useState("");
      // Estado para controlar si el formulario ha sido enviado
      const [isSubmitted, setIsSubmitted] = useState(false);

      // Maneja el envío del formulario
      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            // Aquí iría la lógica real de recuperación de contraseña
            console.log("Password reset requested for:", email);

            // Simular éxito en el envío
            setIsSubmitted(true);
      };

      return (
            <Dialog open onOpenChange={(open) => !open && navigate("/")}>
                  <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-card/95 backdrop-blur-md border-border/50">
                        <div className="p-6">
                              <DialogHeader className="mb-6">
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                                <Bike className="w-6 h-6 text-primary-foreground" />
                                          </div>
                                    </div>

                                    {!isSubmitted ? (
                                          // Vista inicial: Solicitud de email
                                          <>
                                                <DialogTitle className="text-2xl font-bold text-center">
                                                      Recuperar contraseña
                                                </DialogTitle>
                                                <DialogDescription className="text-center">
                                                      Introduce tu email y te enviaremos las instrucciones.
                                                </DialogDescription>
                                          </>
                                    ) : (
                                          // Vista de éxito: Confirmación de envío
                                          <>
                                                <DialogTitle className="text-2xl font-bold text-center flex flex-col items-center gap-2">
                                                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                                                      <span>¡Enviado!</span>
                                                </DialogTitle>
                                                <DialogDescription className="text-center">
                                                      Hemos enviado un enlace de recuperación a <strong>{email}</strong>. Por favor, revisa tu bandeja de entrada.
                                                </DialogDescription>
                                          </>
                                    )}
                              </DialogHeader>

                              {!isSubmitted ? (
                                    // Formulario de recuperación
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                          <div className="space-y-2">
                                                <Label htmlFor="email">Correo electrónico</Label>
                                                <div className="relative">
                                                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                      <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="tu@email.com"
                                                            className="pl-9"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                      />
                                                </div>
                                          </div>

                                          <Button type="submit" className="w-full shadow-button bg-gradient-cta hover:opacity-90">
                                                Enviar enlace
                                          </Button>
                                    </form>
                              ) : (
                                    // Botón para volver al login tras envío exitoso
                                    <Button
                                          onClick={() => navigate("/login")}
                                          className="w-full"
                                          variant="outline"
                                    >
                                          Volver a iniciar sesión
                                    </Button>
                              )}

                              <div className="mt-6 text-center">
                                    <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 transition-colors">
                                          <ArrowLeft className="w-4 h-4" />
                                          Volver al inicio de sesión
                                    </Link>
                              </div>
                        </div>
                  </DialogContent>
            </Dialog>
      );
};

export default ForgotPassword;
