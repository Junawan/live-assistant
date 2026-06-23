"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRegister } from "@/hooks/useRegister";

const schema = z.object({
  companyName: z
    .string()
    .min(3, "Nama perusahaan minimal 3 karakter"),

  fullName: z
    .string()
    .min(3, "Nama minimal 3 karakter"),

  email: z
    .string()
    .email("Email tidak valid"),

  password: z
    .string()
    .min(6, "Password minimal 6 karakter"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    register,
    loading,
    error,
  } = useRegister();

  const onSubmit = async (data: FormData) => {
    const success = await register(data);

    if (success) {
      router.replace("/dashboard");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <Card className="w-full max-w-md space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold">
            Daftar Live Assistant
          </h1>

          <p className="text-muted-foreground">
            Mulai Trial Gratis 14 Hari
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <Input
              placeholder="Nama Perusahaan"
              {...formRegister("companyName")}
            />

            {errors.companyName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Nama Lengkap"
              {...formRegister("fullName")}
            />

            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email"
              {...formRegister("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...formRegister("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Membuat akun..."
              : "Daftar"}
          </Button>
        </form>
      </Card>
    </main>
  );
}