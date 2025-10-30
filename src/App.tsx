import AppRouter from "@/routes/AppRouter";
import { AuthProvider } from "@/context/AuthProvider";
import { AuthInterceptor } from "@/lib/AuthInterceptor";
import { ThemeProvider } from "./context/ThemeProvider";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system">
        <AuthInterceptor />
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  );
}
