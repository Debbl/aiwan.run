import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { useMDXComponent } from "~/hooks/useMDXComponent";
import { postUtils } from "~/utils";
import { format } from "~/utils/time";

const { posts, getPostBySlug } = postUtils("TIL");

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Find the post for the current page.
  const post = getPostBySlug(params.slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function TILPage({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = getPostBySlug(params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post.body.code);

  const { title, description, date, duration } = post;
  const time = new Date(date);
  const dateStr = format(time, "yyyy-MM-dd");

  return (
    <>
      <header className="text-center">
        <h1 className="text-6xl">{title}</h1>
        <h3 className="text-gray-400">{description}</h3>
        <div>
          <span>{dateStr}</span>
          <span>{" · "}</span>
          <span>{`${duration}min`}</span>
        </div>
      </header>

      <main className="markdown-body px-1 md:px-10 lg:px-32 xl:px-64">
        <MDXContent />
      </main>
    </>
  );
}
