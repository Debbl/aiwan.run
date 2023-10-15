export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="markdown-body px-11">{children}</main>;
}
