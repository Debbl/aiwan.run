import Footer from "~/components/Footer";

const Index: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex gap-2">
        <a href="https://blog.aiwan.run/">Blog</a>
        <a href="https://github.com/Debbl/">GitHub</a>
        <a href="mailto:me@aiwan.run">Email</a>
        <a href="https://space.bilibili.com/174865648">Bilibili</a>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
