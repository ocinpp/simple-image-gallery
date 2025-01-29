"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageViewerProps {
  image: string;
  onPrevious: () => void;
  onNext: () => void;
  direction: number;
  className?: string;
}

export default function ImageViewer({
  image,
  onPrevious,
  onNext,
  direction,
  className = "",
}: ImageViewerProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setScale(1);
  }, []);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prevScale) => Math.min(prevScale * 1.5, 5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prevScale) => Math.max(prevScale / 1.5, 1));
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPrevious();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNext();
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
  };

  return (
    <div className={`relative h-full bg-black overflow-hidden ${className}`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={image}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.2 },
            ease: "easeInOut",
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              onNext();
            } else if (swipe > swipeConfidenceThreshold) {
              onPrevious();
            }
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          <img
            src={image || "/placeholder.svg"}
            alt="Gallery image"
            className="max-w-full max-h-full object-contain select-none"
            style={{
              transform: `scale(${scale})`,
              transition: "transform 0.2s",
            }}
            draggable="false"
          />
        </motion.div>
      </AnimatePresence>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 left-2 z-20"
        onClick={handleZoomIn}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 left-12 z-20"
        onClick={handleZoomOut}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20"
        onClick={handleNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
