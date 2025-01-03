import { allPosts } from "../data";
import Content from "./Content";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = allPosts.find((p) => p.slug === slug)!;

  return <Content post={post} />;
}
