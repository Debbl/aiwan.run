import Link from "next/link";

export function MarkdownLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <footer className="px-8 py-3 md:px-10 lg:px-32 xl:px-64">
        <Link href="/blog" className="text-gray-600 underline">
          cd ..
        </Link>
      </footer>
    </>
  );
}
