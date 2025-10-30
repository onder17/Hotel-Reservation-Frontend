import { useState } from "react";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { LoginRequest } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { register, handleSubmit, reset } = useForm<LoginRequest>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onSubmit = async (data: LoginRequest) => {
    setErrorMessage(null);
    setLoading(true);

    login(data).then(token => {
      console.log("Login Success");
      reset();
      return token;
    }).catch((error) => {
      console.error("Login Error", error);
      setErrorMessage(error.response?.data?.message || "Sunucuya bağlanırken bir hata oluştu!");
    }).finally(() => { setLoading(false); });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left - Görsel / Bilgilendirme */}
          <div className="hidden lg:flex flex-col gap-6 pr-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl dark:shadow-none">
              <div className="w-full h-80 bg-[url('/images/login-illustration.jpg')] bg-center bg-cover"></div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Hoş geldiniz!</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Hesabınıza giriş yapın ve panonuzu görüntüleyin. Hala bir hesabınız yoksa kayıt ol seçeneği ile başlayabilirsiniz.</p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-lg dark:bg-slate-900 dark:border-slate-800">
              <CardHeader className="space-y-1 p-6">
                <CardTitle className="text-2xl dark:text-white">Giriş Yap</CardTitle>
                <CardDescription className="dark:text-slate-400">Hesabınıza erişmek için e-posta ve şifrenizi kullanın.</CardDescription>
              </CardHeader>

              <CardContent className="p-6 pt-0">
                {errorMessage && (
                  <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-md">
                    {errorMessage}
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                  <div>
                    <Label htmlFor="email" className="text-sm dark:text-slate-300">E-posta</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="mt-2" {...register("email", { required: true })} />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm dark:text-slate-300">Şifre</Label>
                    <Input id="password" type="password" placeholder="Şifreniz" className="mt-2" {...register("password", { required: true })} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 dark:text-slate-300">
                      <Checkbox id="remember" />
                      <span className="text-sm">Beni Hatırla</span>
                    </Label>

                    <button type="button" className="text-sm text-sky-600 hover:underline">
                      Şifremi unuttum
                    </button>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                  </Button>

                  <div className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
                    Hesabınız yok mu? <a href="#" className="text-sky-600 hover:underline">Kayıt Ol</a>
                  </div>

                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
