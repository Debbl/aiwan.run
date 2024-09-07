import path from "node:path";
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { globbySync } from "globby";
import { __images } from "./__images";
import { __imagesPath, rootPath } from "./constants";

export const images = globbySync(`${rootPath}/**/*.png`).map((p) => {
  const pathArr = p.split("/");
  const imagesIndex = pathArr.findIndex((d) => d === "images");
  const key =
    `__img_${pathArr[imagesIndex - 1]}_${path.basename(p, ".png")}`.replaceAll(
      "-",
      "_",
    ) as keyof typeof __images;

  const hash = createHash("sha256")
    .update(key)
    .digest("hex")
    .substring(0, 7)
    .padStart(11, "img_") as keyof typeof __images;

  return {
    key: hash,
    path: `./${path.relative(path.join(__imagesPath, ".."), p)}`,
    props: __images[hash],
  };
});

const isNeedUpdate = images.some((i) => !__images[i.key]);
if (isNeedUpdate) {
  let str = "// this file is generated automatically\n";
  str += images.map((p) => `import ${p.key} from "${p.path}";`).join("\n");
  str += `\n\nexport const __images = {\n${images.map((i) => `  ${i.key},`).join("\n")}\n};\n`;

  writeFileSync(__imagesPath, str);
}
