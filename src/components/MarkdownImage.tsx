/* eslint-disable @next/next/no-img-element */
"use client";
import type { ImgHTMLAttributes } from "react";
import { useEffect, useRef } from "react";
import type { Zoom } from "medium-zoom";
import MediumZoom from "medium-zoom";

export function MarkdownImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const imgEl = useRef<HTMLImageElement>(null);
  const zoom = useRef<Zoom>();

  useEffect(() => {
    zoom.current = MediumZoom(imgEl.current!);
  }, []);

  const handleClick = () => {
    zoom.current!.open();
  };

  return <img ref={imgEl} src={props.src} onClick={handleClick} />;
}
