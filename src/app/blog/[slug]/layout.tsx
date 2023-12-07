import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <footer className="px-1 py-3 md:px-10 lg:px-32 xl:px-64">
        <Link href="/til" className="text-gray-600 underline">
          cd ..
        </Link>
      </footer>
    </>
  );
}
