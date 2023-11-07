import Link from "next/link";
import Image from "next/image";
import { Icon } from "~/icons";
import Avatar from "~/icons/Avatar";

type Projects = Record<
  string,
  {
    name: string;
    url: string;
    desc: string;
    content: {
      name: string;
      link: string;
      favicon: string;
      desc: string;
    }[];
  }
>;

const projects: Projects = {
  Game: {
    name: "Game",
    url: "https://game.aiwan.run/",
    desc: "some games",
    content: [
      {
        name: "Minesweeper",
        link: "https://game.aiwan.run/minesweeper/",
        favicon: "https://game.aiwan.run/minesweeper/vite.svg",
        desc: "A minesweeper game use react.",
      },
      {
        name: "Tic tac toe",
        link: "https://game.aiwan.run/tictactoe/",
        favicon: "https://game.aiwan.run/tictactoe/logo.png",
        desc: "A Tic-tac-toe game use solid.js.",
      },
      {
        name: "Game of Life",
        link: "https://game.aiwan.run/game-of-life/",
        favicon: "https://game.aiwan.run/game-of-life/favicon.png",
        desc: "A Game-of-Life game use react",
      },
      {
        name: "Bubble Wrap",
        link: "https://game.aiwan.run/bubble-wrap/",
        favicon: "https://game.aiwan.run/bubble-wrap/favicon.png",
        desc: "A Bubble Wrap game use react",
      },
    ],
  },
  V: {
    name: "V",
    url: "https://v.aiwan.run/",
    desc: "some visualization",
    content: [],
  },
  Tools: {
    name: "Tools",
    url: "https://tools.aiwan.run/",
    desc: "some tools",
    content: [
      {
        name: "Code Diff",
        link: "https://tools.aiwan.run/code-diff/",
        favicon: "https://tools.aiwan.run/code-diff/logo.svg",
        desc: "A code diff tool.",
      },
      {
        name: "Bilibili ShortLink Converter",
        link: "https://bili-shortlink.vercel.app/",
        favicon: "https://bili-shortlink.vercel.app/favicon.svg",
        desc: "Bilibili shortLink converter.",
      },
    ],
  },
  Toys: {
    name: "Toys",
    url: "/",
    desc: "some toys",
    content: [
      {
        name: "Emoji Kitchen",
        link: "https://emoji.aiwan.run/",
        favicon: "https://emoji.aiwan.run/favicon.svg",
        desc: "A emoji kitchen.",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="flex-1">
      <div className="mb-10 flex h-full flex-col items-center">
        <div className="mt-20">
          <Icon
            icon={Avatar}
            className="h-12 w-12 cursor-pointer rounded-full"
          />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-24 md:grid-cols-2">
          {Object.keys(projects).map((key) => {
            const project = projects[key];

            return (
              <div key={project.name}>
                <Link
                  href={project.url}
                  className="text-center text-lg font-bold hover:text-[#eab308]"
                >
                  {project.name}
                </Link>
                <div className="text-sm text-gray-400">{project.desc}</div>

                <ul className="mt-2">
                  {project.content.map((item) => (
                    <li className="my-3" key={item.name}>
                      <div className="flex items-center gap-x-3">
                        <div>
                          <Image
                            unoptimized
                            alt={item.name}
                            src={item.favicon ?? ""}
                            width={16}
                            height={16}
                            className="mr-1 inline-block h-4 w-4"
                          />
                        </div>
                        <div>
                          <Link
                            href={item.link}
                            className="text-sm hover:text-[#eab308]"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs">{item.desc}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
