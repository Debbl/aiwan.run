const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="markdown-body px-1 md:px-10 lg:px-32 xl:px-64">
      {children}
    </main>
  );
};

export default Main;
