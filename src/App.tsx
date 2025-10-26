import AppRouter from "@/routes/AppRouter";
import { AuthProvider } from "@/context/AuthProvider";
import { RequestInterceptor } from "@/lib/RequestInterceptor";

export default function App() {
  return (
    <AuthProvider>
      <RequestInterceptor />
      <AppRouter />
    </AuthProvider>
  );
}
