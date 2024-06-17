import { Index } from "../components/Index";
import { getNotesByTag } from "~/data";

export default async function BlogPage() {
  const { list } = getNotesByTag("blog");

  return <Index list={list} path="blog" />;
}
