"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageManagerProps {
  onAddImage: (imageUrl: string) => void;
  onDeleteImage: (index: number) => void;
}

export default function ImageManager({
  onAddImage,
  onDeleteImage,
}: ImageManagerProps) {
  const [imageUrl, setImageUrl] = useState("");

  const handleAddImage = () => {
    if (imageUrl) {
      onAddImage(imageUrl);
      setImageUrl("");
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Button onClick={handleAddImage}>Add Image</Button>
      </div>
      <Button variant="destructive" onClick={() => onDeleteImage(-1)}>
        Delete Current Image
      </Button>
    </div>
  );
}
