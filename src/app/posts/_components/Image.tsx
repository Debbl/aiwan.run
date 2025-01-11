"use client";
import { omit } from "@debbl/utils";
import NextImage from "next/image";
import Zoom from "react-medium-image-zoom";
import type { StaticImageData } from "next/image";
import type { ComponentProps } from "react";

export function Image({
  images,
  imgKey,
}: ComponentProps<"img"> & {
  images?: Record<string, any>;
  imgKey?: string;
}) {
  const staticImgData = images?.find((i: any) => i.key === imgKey) as {
    key: string;
    path: string;
    props: StaticImageData;
  };

  const imageProps = omit(staticImgData.props, ["blurWidth", "blurHeight"]);

  return (
    <picture className="flex justify-center px-12">
      <Zoom
        zoomMargin={40}
        zoomImg={{
          src: imageProps.src,
          alt: "",
        }}
        ZoomContent={(data) => <>{data.img}</>}
        wrapElement="span"
      >
        <NextImage key={imageProps.src} {...imageProps} alt="image" />
      </Zoom>
    </picture>
  );
}
