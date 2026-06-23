"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useParams, useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { productRepository } from "@/repositories/product/ProductRepository";

import type { Product } from "@/types";

import { getPlaylistByIdUseCase } from "@/di";
import type { Playlist } from "@/types";

export default function TeleprompterPage() {

  const router = useRouter();

  const params = useParams();

const playlistId =
    params.playlistId as string;

  const productId =
    params.productId as string;

  const [loading, setLoading] =
    useState(true);

  const [product, setProduct] =
    useState<Product | null>(null);

    const [fontSize, setFontSize] =
    useState(42);

const [speed, setSpeed] =
    useState(1.0);

const [playing, setPlaying] =
    useState(false);

    const contentRef =
  useRef<HTMLDivElement>(null);

const animationRef =
  useRef<number | null>(null);

const lastTimeRef =
  useRef<number>(0);

  const [playlist, setPlaylist] =
    useState<Playlist | null>(null);

  useEffect(() => {

    load();

  }, []);

  async function load() {

    const p =
        await productRepository.findById(
            productId
        );

    const list =
        await getPlaylistByIdUseCase.execute(
            playlistId
        );

    setProduct(p);

    setPlaylist(list);

    setLoading(false);

}

  useEffect(() => {

    if (!playing) {

        if (animationRef.current) {

            cancelAnimationFrame(
                animationRef.current
            );

            animationRef.current = null;

        }

        return;

    }

    function animate(time: number) {

        if (!contentRef.current) return;

        if (lastTimeRef.current === 0) {

            lastTimeRef.current = time;

        }

        const delta =
            time - lastTimeRef.current;

        lastTimeRef.current = time;

        contentRef.current.scrollTop +=
            speed * delta * 0.06;

        animationRef.current =
            requestAnimationFrame(
                animate
            );

    }

    animationRef.current =
        requestAnimationFrame(
            animate
        );

    return () => {

        if (animationRef.current) {

            cancelAnimationFrame(
                animationRef.current
            );

        }

        lastTimeRef.current = 0;

    };

}, [playing, speed]);

  if (loading) {

    return (

      <div className="flex h-screen items-center justify-center">

        Memuat...

      </div>

    );

  }

  if (!product) {

    return (

      <div className="flex h-screen items-center justify-center">

        Produk tidak ditemukan

      </div>

    );

  }

  const currentIndex =
    playlist?.productIds.indexOf(
        productId
    ) ?? -1;

    function goPrev() {

    if (
        !playlist ||
        currentIndex <= 0
    ) {
        return;
    }

    router.push(

`/dashboard/playlists/${playlistId}/teleprompter/${
playlist.productIds[currentIndex-1]
}`

    );

}

function goNext() {

    if (
        !playlist ||
        currentIndex >=
        playlist.productIds.length - 1
    ) {
        return;
    }

    router.push(

`/dashboard/playlists/${playlistId}/teleprompter/${
playlist.productIds[currentIndex+1]
}`

    );

}

  return (

    <div className="mx-auto max-w-5xl p-8 space-y-6">

      <Button
        variant="outline"
        onClick={() => router.back()}
      >

        <ArrowLeft className="mr-2 h-4 w-4"/>

        Kembali

      </Button>

      <div>

        <h1 className="text-3xl font-bold">

          {product.title}

        </h1>
        <p className="text-muted-foreground">

Produk

{" "}

{currentIndex + 1}

{" / "}

{playlist?.productIds.length ?? 0}

</p>

      </div>

      {product.image && (

        <img
          src={product.image}
          alt={product.title}
          className="h-60 rounded-xl object-cover"
        />

      )}

      <div
    className="
    rounded-xl
    border
    bg-black
    text-white
    overflow-hidden
    "
>

    <div
    ref={contentRef}
    className="
    h-[70vh]
        overflow-y-auto
        p-10
        leading-[2.3]
        whitespace-pre-wrap
        "
        style={{
    fontSize,
}}
    >

        {product.teleprompterText ||

            "Produk ini belum memiliki script AI."}

    </div>

</div>

<div
    className="
    mt-5
    flex
    flex-wrap
    items-center
    justify-center
    gap-3
    "
>

<Button
    variant="outline"
    onClick={goPrev}
    disabled={currentIndex<=0}
>

◀ Prev

</Button>

<Button
    onClick={() =>
        setPlaying((prev) => !prev)
    }
>

    {playing ? (
        <>
            ⏸ Pause
        </>
    ) : (
        <>
            ▶ Play
        </>
    )}

</Button>

<Button
    variant="outline"
    onClick={goNext}
    disabled={
        !playlist ||
        currentIndex >=
        playlist.productIds.length-1
    }
>

Next ▶

</Button>

<Button
    variant="outline"
    onClick={()=>
        setFontSize(v=>v-2)
    }
>

A-

</Button>

<div
    className="
    flex
    items-center
    gap-2
    "
>

<Button
    variant="outline"
    onClick={()=>
        setSpeed(v=>
            Math.max(
                0.5,
                v-0.5
            )
        )
    }
>

−

</Button>

<div
    className="
    w-14
    text-center
    "
>

{speed.toFixed(1)}x

</div>

<Button
    variant="outline"
    onClick={()=>
        setSpeed(v=>
            Math.min(
                10,
                v+0.5
            )
        )
    }
>

+

</Button>

</div>

<Button
    variant="outline"
    onClick={()=>
        setFontSize(v=>v+2)
    }
>

A+

</Button>

</div>

    </div>

  );

}