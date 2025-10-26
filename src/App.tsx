import AppRouter from "@/routes/AppRouter";
import { AuthProvider } from "@/context/AuthProvider";
import { AuthInterceptor } from "@/lib/AuthInterceptor";

export default function App() {
  return (
    <AuthProvider>
      <AuthInterceptor />
      <AppRouter />
    </AuthProvider>
  );
}
