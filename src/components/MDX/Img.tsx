/* eslint-disable @next/next/no-img-element */
"use client";
import type { ComponentProps } from "react";
import { useEffect, useRef } from "react";
import type { Zoom } from "medium-zoom";
import MediumZoom from "medium-zoom";

export default function Img(props: ComponentProps<"img">) {
  const imgEl = useRef<HTMLImageElement>(null);
  const zoom = useRef<Zoom>();

  useEffect(() => {
    zoom.current = MediumZoom(imgEl.current!);
  }, []);

  if (!props.src) return <img {...props} />;

  const src = props.src.startsWith("ipfs")
    ? `/images/${props.src.slice(7)}.png`
    : props.src;

  const handleClick = () => {
    zoom.current!.open();
  };

  return (
    <picture className="flex justify-center">
      <img
        {...props}
        className="w-[85%]"
        src={src}
        ref={imgEl}
        onClick={handleClick}
      />
    </picture>
  );
}
