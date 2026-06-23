"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { usePlaylists } from "@/hooks/usePlaylists";
import { useCompanyStore } from "@/stores/company.store";

import type { Playlist } from "@/types";

import { toast } from "sonner";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSuccess?: () => void;

  playlist?: Playlist | null;
}

export default function PlaylistDialog({
  open,
  onOpenChange,
  onSuccess,
  playlist,
}: Props) {

  const company =
    useCompanyStore(
      state => state.company
    );

  const {
    create,
    update,
  } = usePlaylists();

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  useEffect(() => {

    if (!playlist) {

      setName("");

      setDescription("");

      return;

    }

    setName(
      playlist.name
    );

    setDescription(
      playlist.description ?? ""
    );

  }, [playlist]);

  useEffect(() => {

  if (!open) {

    setName("");

    setDescription("");

  }

}, [open]);


  async function handleSave() {

    if (!company) return;

    if (!name.trim()) {

      toast.error(
        "Nama playlist wajib diisi"
      );

      return;

    }

    try {

      setLoading(true);

      if (playlist) {

        await update(
          playlist.playlistId,
          {
            name,

            description,

            updatedAt:
              new Date(),
          }
        );

      } else {

        await create({

          playlistId:
            crypto.randomUUID(),

          companyId:
            company.companyId,

          name,

          description,

          productIds: [],

          sortOrder: 0,

          isDefault: false,

          createdAt:
            new Date(),

          updatedAt:
            new Date(),

        });

      }

      toast.success(
        "Playlist berhasil disimpan"
      );

      onSuccess?.();

      onOpenChange(false);

    } catch (err) {

      console.error(err);

      toast.error(
        "Gagal menyimpan playlist"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent className="max-w-3xl">

        <DialogHeader>

          <DialogTitle>

            {playlist
              ? "Edit Playlist"
              : "Playlist Baru"}

          </DialogTitle>

        </DialogHeader>

        <div className="space-y-5">

          <Input

            placeholder="Nama Playlist"

            value={name}

            onChange={e =>
              setName(
                e.target.value
              )
            }

          />

          <Textarea

            rows={3}

            placeholder="Deskripsi"

            value={description}

            onChange={e =>
              setDescription(
                e.target.value
              )
            }

          />

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Batal
          </Button>

          <Button
            disabled={loading}
            onClick={handleSave}
          >
            {loading
              ? "Menyimpan..."
              : "Simpan"}
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}