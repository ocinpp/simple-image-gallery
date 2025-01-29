"use client";

import { useRef, useEffect } from "react";

interface ThumbnailsProps {
  images: string[];
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
}

export default function Thumbnails({
  images,
  currentIndex,
  onThumbnailClick,
}: ThumbnailsProps) {
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[
        currentIndex
      ] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentIndex]);

  return (
    <div
      ref={thumbnailsRef}
      className="flex overflow-x-auto space-x-2 p-2 bg-black bg-opacity-50 h-24"
    >
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => onThumbnailClick(index)}
          className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all duration-200 ${
            index === currentIndex
              ? "ring-2 ring-white scale-110"
              : "opacity-50 hover:opacity-100"
          }`}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
