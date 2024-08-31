"use client";
import type { ComponentProps } from "react";
import type { StaticImageData } from "next/image";
import NextImage from "next/image";
import { useEffect, useRef } from "react";
import MediumZoom from "medium-zoom";
import type { Zoom } from "medium-zoom";
import { omit } from "@debbl/utils";

export function Image(
  props: ComponentProps<"img"> & {
    images?: Record<string, any>;
    imgKey?: string;
  },
) {
  const imgKey = props.imgKey;
  const staticImgData = props.images?.find((i: any) => i.key === imgKey) as {
    key: string;
    path: string;
    props: StaticImageData;
  };

  const imageProps = omit(staticImgData.props, ["blurWidth", "blurHeight"]);

  const imgRef = useRef<HTMLImageElement>(null);
  const zoom = useRef<Zoom>();

  useEffect(() => {
    zoom.current = MediumZoom(imgRef.current!);
  }, []);

  return (
    <picture className="flex justify-center px-12">
      <NextImage ref={imgRef} {...imageProps} alt="image" />
    </picture>
  );
}
