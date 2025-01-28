"use client";

import { useState, useEffect } from "react";
import ImageViewer from "./ImageViewer";
import Thumbnails from "./Thumbnails";
import ImageManager from "./ImageManager";
import { getImages, addImage, deleteImage } from "@/utils/ImageUtils";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    setImages(getImages());
  }, []);

  const handlePrevious = () => {
    setIsFlipping(true);
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
    setTimeout(() => setIsFlipping(false), 300);
  };

  const handleNext = () => {
    setIsFlipping(true);
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
    setTimeout(() => setIsFlipping(false), 300);
  };

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

  return (
    <div className="max-w-6xl mx-auto p-4">
      {images.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">
            No images in the gallery. Add some images to get started!
          </p>
          <ImageManager
            onAddImage={handleAddImage}
            onDeleteImage={handleDeleteImage}
          />
        </div>
      ) : (
        <>
          <ImageViewer
            image={images[currentIndex]}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isFlipping={isFlipping}
          />
          <Thumbnails
            images={images}
            currentIndex={currentIndex}
            onThumbnailClick={handleThumbnailClick}
          />
          <ImageManager
            onAddImage={handleAddImage}
            onDeleteImage={handleDeleteImage}
          />
        </>
      )}
    </div>
  );
}
