import path from "node:path";

// eslint-disable-next-line n/prefer-global/process
export const cwd = process.cwd();
export const rootPath = path.join(cwd, "src/app/posts");
export const __imagesPath = path.join(cwd, "src/app/posts/__images.ts");
