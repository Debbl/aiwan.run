import { Index } from "../components/Index";
import { getNotesByTag } from "~/data";

export default async function BlogPage() {
  const { list } = getNotesByTag("TIL");

  return <Index list={list} />;
}
