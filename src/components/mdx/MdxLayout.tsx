export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="px-16">
      <article>{children}</article>
    </main>
  );
}
