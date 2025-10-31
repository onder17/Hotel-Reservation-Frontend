import { useState } from "react";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RegisterRequest } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import RegisterAnimation from "@/assets/register-animation.json";
import Lottie from "lottie-react";

export default function RegisterPage() {
  const { register, handleSubmit, reset } = useForm<RegisterRequest & { passwordConfirm: string }>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterRequest & { passwordConfirm: string }) => {
    if (data.password !== data.passwordConfirm) {
      setErrorMessage("Şifreler eşleşmiyor!");
      return;
    }
    
    setErrorMessage(null);
    setLoading(true);


    registerUser(data)
      .then(() => {
        console.log("Register Success");
        reset();
        navigate("/login");
      })
      .catch((error) => {
        console.error("Register Error", error);
        setErrorMessage(error.response?.data?.message || "Sunucuya bağlanırken bir hata oluştu!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left - Görsel / Bilgilendirme */}
          <div className="hidden lg:flex flex-col gap-6 pr-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl dark:shadow-none">
              <Lottie animationData={RegisterAnimation} loop={true} className="w-fit h-fit" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Yeni Hesap Oluşturun</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Kayıt olun ve rezervasyon sistemine erişmeye başlayın.</p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-lg dark:bg-slate-900 dark:border-slate-800">
              <CardHeader className="space-y-1 p-6">
                <CardTitle className="text-2xl dark:text-white">Kayıt Ol</CardTitle>
                <CardDescription className="dark:text-slate-400">Yeni bir hesap oluşturmak için bilgilerinizi girin.</CardDescription>
              </CardHeader>

              <CardContent className="p-6 pt-0">
                {errorMessage && (
                  <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-md">
                    {errorMessage}
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Label htmlFor="fname" className="text-sm dark:text-slate-300">Ad</Label>
                    <Input id="fname" type="text" placeholder="Adınız" className="mt-2" {...register("fname", { required: true })} />
                  </div>

                  <div>
                    <Label htmlFor="lname" className="text-sm dark:text-slate-300">Soyad</Label>
                    <Input id="lname" type="text" placeholder="Soyadınız" className="mt-2" {...register("lname", { required: true })} />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm dark:text-slate-300">E-posta</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="mt-2" {...register("email", { required: true })} />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm dark:text-slate-300">Şifre</Label>
                    <Input id="password" type="password" placeholder="Şifreniz" className="mt-2" {...register("password", { required: true })} />
                  </div>

                  <div>
                    <Label htmlFor="passwordConfirm" className="text-sm dark:text-slate-300">Şifre Tekrar</Label>
                    <Input id="passwordConfirm" type="password" placeholder="Şifrenizi tekrar girin" className="mt-2" {...register("passwordConfirm", { required: true })} />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
                  </Button>

                  <div className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
                    Zaten hesabınız var mı? <Link to="/login" className="text-sky-600 hover:underline">Giriş Yap</Link>
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
