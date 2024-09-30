import path from "node:path";
import { globbySync } from "globby";

// eslint-disable-next-line n/prefer-global/process
export const cwd = process.cwd();
export const postRootPath = path.join(cwd, "src/app/posts");

export const __imagesPath = path.join(cwd, "src/app/posts/data/__images.ts");
export const postsImagesPaths = globbySync(`${postRootPath}/**/*.png`);
