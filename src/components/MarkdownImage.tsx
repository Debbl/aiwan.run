"use client";
import type { ImgHTMLAttributes } from "react";
import { useRef } from "react";
import MediumZoom from "medium-zoom";

export function MarkdownImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const imgEl = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    MediumZoom(imgEl.current!).open();
  };
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={imgEl} src={props.src} onClick={handleClick} />;
}
