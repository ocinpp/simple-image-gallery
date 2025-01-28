"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageViewerProps {
  image: string;
  onPrevious: () => void;
  onNext: () => void;
  isFlipping: boolean;
}

export default function ImageViewer({
  image,
  onPrevious,
  onNext,
  isFlipping,
}: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [flipDirection, setFlipDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    setScale(1); // Reset zoom when image changes
  }, []);

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 1));
  };

  const handlePrevious = () => {
    setFlipDirection("left");
    onPrevious();
  };

  const handleNext = () => {
    setFlipDirection("right");
    onNext();
  };

  return (
    <div className="relative aspect-video bg-black mb-4 overflow-hidden">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
          isFlipping
            ? `scale-90 opacity-0 ${
                flipDirection === "left"
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`
            : "scale-100 opacity-100 translate-x-0"
        }`}
        style={{ transform: `scale(${scale})` }}
      >
        <img
          src={image || "/placeholder.svg"}
          alt="Gallery image"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 left-2"
        onClick={handleZoomIn}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 left-12"
        onClick={handleZoomOut}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={handleNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
