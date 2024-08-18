export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="px-60">
        <article>{children}</article>
      </div>
    </>
  );
}
