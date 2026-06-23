"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  Search,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { getPlaylistUseCase } from "@/di";
import { getProductsByIdsUseCase } from "@/di";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

import type {
  Playlist,
  Product,
} from "@/types";
import { useGeneratePlaylistAI } from "@/hooks/useGeneratePlaylistAI";

import { Input } from "@/components/ui/input";

export default function PlaylistDetailPage() {

  const router = useRouter();
  const ai = useGeneratePlaylistAI();

  const { playlistId } = useParams<{
    playlistId: string;
  }>();

  const [loading, setLoading] =
    useState(true);

  const [playlist, setPlaylist] =
    useState<Playlist | null>(null);

  const [products, setProducts] =
    useState<Product[]>([]);

    const [search, setSearch] = useState("");

  useEffect(() => {

    load();

  }, [playlistId]);

  const filteredProducts =
  products.filter((product, index) => {

    const keyword =
      search.trim().toLowerCase();

    if (!keyword) return true;

    return (

      product.title
        .toLowerCase()
        .includes(keyword)

      ||

      String(index + 1)
        .startsWith(keyword)

    );

  });

  async function load() {

    setLoading(true);

    const playlist =
      await getPlaylistUseCase.execute(
        playlistId
      );

    if (!playlist) {

      setLoading(false);

      return;

    }

    setPlaylist(playlist);

    const products =
      await getProductsByIdsUseCase.execute(
        playlist.productIds
      );

    setProducts(products);

    setLoading(false);

  }

  if (loading) {

    return (
      <div className="flex h-64 items-center justify-center">
        Memuat playlist...
      </div>
    );

  }

  if (!playlist) {

    return (
      <div className="flex h-64 items-center justify-center">
        Playlist tidak ditemukan.
      </div>
    );

  }

  return (

    <div className="space-y-6">

      <Button
        variant="outline"
        onClick={() =>
          router.back()
        }
      >
        <ArrowLeft className="mr-2 h-4 w-4" />

        Kembali
      </Button>

      <div>

        <h1 className="text-3xl font-bold">
          {playlist.name}
        </h1>

        <p className="text-muted-foreground">

          {playlist.description}

        </p>

      </div>

      <div className="flex gap-3">

        <Badge>

          {products.length} Produk

        </Badge>

        <Badge>

          {
            products.filter(
              p => p.teleprompterText?.trim()
            ).length
          } AI Siap

        </Badge>

      </div>

      <div className="flex gap-3">

<Button
    variant="outline"
    onClick={() =>
        router.push(
            `/dashboard/playlists/${playlist.playlistId}/products`
        )
    }
>

<Plus className="mr-2 h-4 w-4"/>

Tambah Produk

</Button>

      {!ai.running ? (

<Button
    onClick={() =>
        ai.generate(
            products,
            load
        )
    }
>

<Sparkles className="mr-2 h-4 w-4"/>

Generate AI Playlist

</Button>

) : (

<Button
    variant="destructive"
    onClick={ai.stop}
>

Stop Generate

</Button>

)}

</div>

<div className="relative max-w-md">

    <Search
        className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        h-4
        w-4
        text-muted-foreground
        "
    />

    <Input

        className="pl-9"

        placeholder="Cari nama atau nomor..."

        value={search}

        onChange={(e)=>
            setSearch(
                e.target.value
            )
        }

    />

</div>
{ai.running && (

<Card>

<CardContent className="space-y-5 p-6">

<div>

<h3 className="font-semibold">
Sedang Generate AI...
</h3>

<p className="text-sm text-muted-foreground">

Produk yang sedang diproses

</p>

</div>

<Progress
value={
(ai.progress / Math.max(ai.total, 1))
* 100
}
/>

<div className="flex justify-between text-sm">

<span>

{ai.progress} / {ai.total}

</span>

<span>

{Math.round(
(ai.progress /
Math.max(ai.total,1))
*100
)}%

</span>

</div>

<div className="rounded-lg border p-4">

<div className="text-xs text-muted-foreground">

Produk Saat Ini

</div>

<div className="font-medium mt-1">

{ai.currentProduct}

</div>

</div>

<div className="grid grid-cols-2 gap-4">

<div className="rounded-lg border p-4">

<div className="text-xs text-muted-foreground">

Berhasil

</div>

<div className="text-2xl font-bold text-green-600">

{ai.success}

</div>

</div>

<div className="rounded-lg border p-4">

<div className="text-xs text-muted-foreground">

Gagal

</div>

<div className="text-2xl font-bold text-red-600">

{ai.failed}

</div>

</div>

</div>

</CardContent>

</Card>

)}

      <div className="grid gap-4
grid-cols-2
md:grid-cols-3
xl:grid-cols-5
2xl:grid-cols-6">

    {filteredProducts.map((product, index) => (

        <button
            key={product.productId}
            onClick={() =>
    router.push(
    `/dashboard/playlists/${playlistId}/teleprompter/${product.productId}`
)
}
            className="
            relative
            rounded-xl
            border
            bg-background
            p-4
            text-left
            transition-all
            hover:shadow-lg
            hover:-translate-y-1
            "
        >

            {/* Nomor */}

            <div
    className="
    absolute
    top-2
    left-3
    text-5xl
    font-black
    text-red-600
    leading-none
    select-none
    "
>
    {index + 1}
</div>

            {/* Foto */}

            <div className="mt-6 flex justify-center">

                <img
                    src={product.image}
                    alt={product.title}
                    className="
                    h-20
                    w-20
                    rounded-lg
                    object-cover
                    "
                />

            </div>

            {/* Nama */}

            <div
                className="
                mt-4
                line-clamp-2
                text-center
                font-semibold
                min-h-[48px]
                "
            >

                {product.title}

            </div>

            {/* Status */}

            <div className="mt-3 flex justify-center">

                {product.teleprompterText?.trim() ? (

                    <span
                        className="
                        rounded-full
                        bg-green-600
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-white
                        "
                    >

                        AI SIAP

                    </span>

                ) : (

                    <span
                        className="
                        rounded-full
                        border
                        px-3
                        py-1
                        text-xs
                        "
                    >

                        BELUM AI

                    </span>

                )}

            </div>

        </button>

    ))}

</div>

    </div>

  );

}