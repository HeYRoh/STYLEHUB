"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  externalImage?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className,
  externalImage = false,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  // If it's an external image or there was an error loading the Next.js Image
  if (externalImage || error) {
    return (
      <img
        src={
          error
            ? `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(
                alt
              )}`
            : src
        }
        alt={alt}
        className={className}
        onError={() => setError(true)}
      />
    );
  }

  // Otherwise use Next.js Image
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  );
}
