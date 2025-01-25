import { ImageResponse } from "next/og";
import { getPosts } from "~/app/posts/_data";

export async function generateStaticParams() {
  const { posts } = await getPosts();

  return posts.map((post) => ({
    slug: `${post.pageName}.png`,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { posts } = await getPosts();

  const pageName = slug.slice(0, -4); // remove .png

  const post = posts.find((p) => p.pageName === pageName);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {post?.title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
