"use client";

import { useState, useEffect, useRef } from "react";
import { animate, inView, stagger } from "motion/react";
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
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScale(1);
  }, []);

  useEffect(() => {
    if (imageRef.current && overlayRef.current) {
      animate(
        imageRef.current,
        { opacity: [0, 1], scale: [0.8, 1] },
        { duration: 0.5, easing: [0.25, 0.1, 0.25, 1] }
      );

      animate(
        overlayRef.current,
        {
          clipPath: [
            "polygon(100% 100%, 100% 100%, 100% 100%)",
            "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          ],
        },
        { duration: 0.5, easing: [0.25, 0.1, 0.25, 1] }
      );
    }
  }, [image]);

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale * 1.5, 5));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale / 1.5, 1));
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipDirection("left");
    onPrevious();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipDirection("right");
    onNext();
  };

  return (
    <div className="relative h-full bg-black overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `scale(${scale})` }}
      >
        <img
          ref={imageRef}
          src={image || "/placeholder.svg"}
          alt="Gallery image"
          className="max-w-full max-h-full object-contain"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black opacity-0"
          style={{ clipPath: "polygon(100% 100%, 100% 100%, 100% 100%)" }}
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
