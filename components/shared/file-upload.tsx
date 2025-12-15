// components/shared/file-upload.tsx
"use client";

import { useCallback, useState } from "react";
import { Upload, X, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MAX_FILE_SIZE } from "@/lib/constants";
import Image from "next/image";

interface FileUploadProps {
  value?: File | string;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  label?: string;
  disabled?: boolean;
  preview?: boolean;
}

export function FileUpload({
  value,
  onChange,
  accept = "image/*",
  maxSize = MAX_FILE_SIZE,
  label = "Upload file",
  disabled = false,
  preview = true,
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof value === "string" ? value : null
  );

  const handleFileChange = useCallback(
    (file: File | null) => {
      setError(null);

      if (!file) {
        onChange(null);
        setPreviewUrl(null);
        return;
      }

      if (file.size > maxSize) {
        setError(
          `Ukuran file maksimal ${(maxSize / 1024 / 1024).toFixed(0)}MB`
        );
        return;
      }

      onChange(file);

      if (preview && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange, maxSize, preview]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileChange(file);
      }
    },
    [handleFileChange]
  );

  const handleRemove = () => {
    handleFileChange(null);
  };

  const currentFile = value instanceof File ? value : null;

  return (
    <div className="space-y-2">
      {previewUrl ? (
        <div className="relative">
          <Image
            src={previewUrl}
            alt="Preview"
            className="h-full w-full rounded-lg object-cover"
            width={640}
            height={400}
          />
          {!disabled && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : currentFile ? (
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <FileIcon className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{currentFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(currentFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          {!disabled && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors",
            disabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:border-primary",
            error && "border-destructive"
          )}
        >
          <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
          <p className="mb-2 text-sm font-medium">{label}</p>
          <p className="mb-4 text-xs text-muted-foreground">
            Drag & drop atau klik untuk memilih file
          </p>
          <input
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file);
            }}
            disabled={disabled}
            className="hidden"
            id="file-upload"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            asChild
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              Pilih File
            </label>
          </Button>
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
