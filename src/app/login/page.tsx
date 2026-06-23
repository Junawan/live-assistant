"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {

  const router = useRouter();

  const { login, loading } =
    useLogin();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin() {

    const ok = await login(
      email,
      password
    );

    if (!ok) return;

    router.replace(
      "/dashboard"
    );

  }

  return (

    <div
      className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-muted
      "
    >

      <Card
        className="
        w-full
        max-w-md
        space-y-5
        p-8
        "
      >

        <h1
          className="
          text-2xl
          font-bold
          "
        >

          Login

        </h1>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
        />

        <Button
          className="w-full"
          onClick={handleLogin}
          disabled={loading}
        >

          {loading
            ? "Masuk..."
            : "Login"}

        </Button>

      </Card>

    </div>

  );

}