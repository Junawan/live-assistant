"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ProductToolbar from "@/components/products/ProductToolbar";
import ProductGrid from "@/components/products/ProductGrid";

import { useProducts } from "@/hooks/useProducts";

import ProductDialog from "@/components/products/ProductDialog";
import ImportProductDialog from "@/components/products/ImportProductDialog";
import GenerateAIDialog from "@/components/products/GenerateAIDialog";
import { Product } from "@/types";

export default function ProductsPage() {
  const {
    products,
    loading,
    refresh,
} = useProducts();

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const [importOpen, setImportOpen] =
  useState(false);

  const [generateOpen, setGenerateOpen] =
  useState(false);

  const [selectedProduct, setSelectedProduct] =
  useState<Product | undefined>(undefined);

const [deleteProduct, setDeleteProduct] =
  useState<Product | null>(null);

  return (
    <div className="space-y-6">
      <ProductToolbar
    search={search}
    onSearchChange={setSearch}

    onCreate={() => setOpen(true)}

    onImport={() => setImportOpen(true)}

    onExport={() => {}}

    onGenerateAI={() =>
        setGenerateOpen(true)
    }
/>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              Memuat produk...
            </div>
          ) : (
            <ProductGrid
    products={filteredProducts}
    onRefresh={refresh}
    onEdit={(product) => {
        setSelectedProduct(product);
        setOpen(true);
    }}
    onDelete={(product) => {
        setDeleteProduct(product);
    }}
/>
          )}
        </CardContent>
      </Card>

      <ImportProductDialog
  open={importOpen}
  onOpenChange={setImportOpen}
/>

<GenerateAIDialog
  open={generateOpen}
  onOpenChange={setGenerateOpen}
  products={products}
  onSuccess={refresh}
/>

      <ProductDialog
    open={open}
    onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
            setSelectedProduct(undefined);
        }
    }}
    product={selectedProduct}
    onSuccess={refresh}
/>
    </div>
  );
}