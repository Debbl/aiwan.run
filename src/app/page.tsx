import { Icon } from "~/icons";
import Avatar from "~/icons/Avatar";

export default function Home() {
  const links = [
    { name: "Blog", url: "https://blog.aiwan.run/" },
    { name: "GitHub", url: "https://github.com/Debbl/" },
    { name: "Game", url: "https://game.aiwan.run/" },
    { name: "V", url: "https://v.aiwan.run/" },
    { name: "Email", url: "mailto:me@aiwan.run" },
    { name: "Bilibili", url: "https://space.bilibili.com/174865648" },
  ];
  return (
    <main className="flex-1">
      <div className="flex h-full flex-col items-center justify-center">
        <div>
          <Icon
            icon={Avatar}
            className="h-12 w-12 cursor-pointer rounded-full"
          />
        </div>
        <div className="mt-3 flex gap-6">
          {links.map((l) => (
            <a
              key={l.name}
              data-umami-event={`click-${l.name.toLocaleLowerCase()}-link`}
              href={l.url}
            >
              {l.name}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
