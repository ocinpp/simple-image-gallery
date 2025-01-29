"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import ImageViewer from "./ImageViewer";
import Thumbnails from "./Thumbnails";
import ImageManager from "./ImageManager";
import { getImages, addImage, deleteImage } from "@/utils/imageUtils";
import { Button } from "@/components/ui/button";

interface GalleryProps {
  enableImageManagement?: boolean;
}

export default function Gallery({
  enableImageManagement = false,
}: GalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setImages(getImages());
  }, []);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  }, [images.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleAddImage = (imageUrl: string) => {
    const updatedImages = addImage(imageUrl);
    setImages(updatedImages);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = deleteImage(index);
    setImages(updatedImages);
    if (currentIndex >= updatedImages.length) {
      setCurrentIndex(updatedImages.length - 1);
    }
  };

  const toggleThumbnails = () => {
    setShowThumbnails((prev) => !prev);
  };

  return (
    <div className="h-screen flex flex-col relative">
      <div className="flex-grow relative">
        {images.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xl mb-4">
              No images in the gallery. Add some images to get started!
            </p>
          </div>
        ) : (
          <ImageViewer
            image={images[currentIndex]}
            onPrevious={handlePrevious}
            onNext={handleNext}
            direction={direction}
            className="z-0"
          />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Button
          variant="outline"
          size="sm"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10 h-6 px-2 py-1"
          onClick={toggleThumbnails}
        >
          {showThumbnails ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronUp className="h-3 w-3" />
          )}
        </Button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showThumbnails ? "h-24" : "h-0"
          }`}
        >
          <Thumbnails
            images={images}
            currentIndex={currentIndex}
            onThumbnailClick={handleThumbnailClick}
          />
        </div>
      </div>
      {enableImageManagement && (
        <ImageManager
          onAddImage={handleAddImage}
          onDeleteImage={handleDeleteImage}
        />
      )}
    </div>
  );
}
