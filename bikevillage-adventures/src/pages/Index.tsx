import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import LocalBusinesses from "@/components/landing/LocalBusinesses";
import AppPreview from "@/components/landing/AppPreview";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import { useLocation } from "react-router-dom";

/**
 * Componente Index
 * 
 * Este es el componente principal de la página de aterrizaje (Landing Page).
 * Muestra todas las secciones de la landing (Navbar, Hero, Cómo Funciona, etc.)
 * y renderiza condicionalmente los modales de Login, Registro y Recuperación de contraseña 
 * basándose en la ruta actual.
 */
const Index = () => {
  const location = useLocation();

  // Determinar qué modal mostrar según la ruta
  const isLoginOpen = location.pathname === "/login";
  const isRegisterOpen = location.pathname === "/register";
  const isForgotPasswordOpen = location.pathname === "/forgot-password";

  return (
    <div className="min-h-screen bg-background">
      {/* Barra de navegación superior */}
      <Navbar />

      <main>
        {/* Sección Hero con el mensaje principal */}
        <HeroSection />

        {/* Sección explicativa de funcionamiento */}
        <HowItWorks />

        {/* Sección de beneficios de usar la app */}
        <Benefits />

        {/* Sección mostrando negocios locales asociados */}
        <LocalBusinesses />

        {/* Vista previa de la aplicación móvil/web */}
        <AppPreview />

        {/* Llamada a la acción final */}
        <CTASection />
      </main>

      {/* Pie de página */}
      <Footer />

      {/* Renderizado condicional de modales */}
      {isLoginOpen && <Login />}
      {isRegisterOpen && <Register />}
      {isForgotPasswordOpen && <ForgotPassword />}
    </div >
  );
};

export default Index;
