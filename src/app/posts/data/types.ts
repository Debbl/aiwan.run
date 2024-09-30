import type { CompileMDXResult } from "next-mdx-remote/rsc";

export type Category = "blog" | "til";

export interface Frontmatter {
  title: string;
  date: string;
  duration: string;
  author?: string;
  description?: string;
}

export interface Post extends CompileMDXResult<Frontmatter> {
  url: string;
  slug: string;
  path: string;
  source: string;
  category: Category;
}

export type Posts = Post[];
