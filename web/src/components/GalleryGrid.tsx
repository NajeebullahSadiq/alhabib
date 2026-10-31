import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export function GalleryGrid({ images, limit }: { images: { src: string; alt: string }[]; limit?: number }) {
  const [index, setIndex] = useState(-1);
  const shown = limit ? images.slice(0, limit) : images;

  return (
    <>
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
        {shown.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(imageIndex)}
            className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border-0 bg-mist p-0"
          >
            <img src={image.src} alt={image.alt} className="w-full" loading="lazy" />
          </button>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index < 0 ? 0 : index}
        slides={shown.map((image) => ({ src: image.src, alt: image.alt }))}
      />
    </>
  );
}
