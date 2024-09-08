"use client";
import { omit } from "@debbl/utils";
import MediumZoom from "medium-zoom";
import NextImage from "next/image";
import { useEffect, useRef } from "react";
import type { Zoom } from "medium-zoom";
import type { StaticImageData } from "next/image";
import type { ComponentProps } from "react";

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
      <NextImage
        key={imageProps.src}
        ref={imgRef}
        {...imageProps}
        alt="image"
      />
    </picture>
  );
}
