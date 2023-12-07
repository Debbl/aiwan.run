import type { SandpackInternal } from "@codesandbox/sandpack-react/types";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import MDXSandpack from "~/components/MDXSandpack";
import { format } from "~/utils/time";

interface SandpackChildrenProps {
  filename?: string;
  children: { props: { children: string } };
}

type SandpackInternalParams = Parameters<SandpackInternal>[0];

interface SandpackProps extends SandpackInternalParams {
  children:
    | Array<{
        props: SandpackChildrenProps;
      }>
    | { props: SandpackChildrenProps };
}

export async function generateStaticParams() {
  return allPosts
    .filter((p) => p.category === "blog")
    .map((post) => ({
      slug: post.slug,
    }));
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = allPosts.find((post) => {
    return post._raw.flattenedPath === `blog/${params.slug}`;
  });

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
        <MDXContent
          components={{
            Sandpack: (props: SandpackProps) => {
              const { children, ..._props } = props;

              const files: Record<string, string> = {};

              if (Array.isArray(children)) {
                children.forEach((child) => {
                  const filename = child.props.filename || "index.js";
                  const fileContent = child.props.children.props.children;
                  files[filename] = fileContent;
                });
              } else {
                const filename = children.props.filename || "index.js";
                const fileContent = children.props.children.props.children;
                files[filename] = fileContent;
              }

              return <MDXSandpack files={files} {..._props} />;
            },
          }}
        />
      </main>
    </>
  );
}
