import Image from "next/image";
import Link from "next/link";
import { Icon } from "~/icons";
import type { IconType } from "~/icons";

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
      {
        name: "Self driving car",
        link: "https://car.aiwan.run",
        favicon: "https://car.aiwan.run/favicon.svg",
        desc: "A self driving car game with neural network.",
      },
    ],
  },
  Tools: {
    name: "Tools",
    url: "https://tools.aiwan.run/",
    desc: "some tools",
    content: [
      {
        name: "Code Diff",
        link: "https://tools.aiwan.run/code-diff/",
        favicon: "https://tools.aiwan.run/code-diff/icon.svg",
        desc: "A code diff tool.",
      },
      {
        name: "Bilibili ShortLink Converter",
        link: "https://bili-shortlink.vercel.app/",
        favicon: "https://bili-shortlink.vercel.app/favicon.svg",
        desc: "Bilibili shortLink converter.",
      },
      {
        name: "Peppa Pig Quotes",
        link: "https://peppa.aiwan.run",
        favicon: "https://peppa.aiwan.run/favicon.svg",
        desc: "A tool for leaning English by Peppa Pig.",
      },
    ],
  },
  Toys: {
    name: "Toys",
    url: "/",
    desc: "some toys",
    content: [
      {
        name: "V",
        link: "https://v.aiwan.run/",
        favicon: "https://v.aiwan.run/favicon.svg",
        desc: "some visualization",
      },
      {
        name: "Emoji Kitchen",
        link: "https://emoji.aiwan.run/",
        favicon: "https://emoji.aiwan.run/favicon.svg",
        desc: "A emoji kitchen.",
      },
      {
        name: "Reader Markdown",
        link: "https://rm.aiwan.run/",
        favicon: "https://rm.aiwan.run/favicon.svg",
        desc: "A markdown reader by web.",
      },
    ],
  },
};

const FindMeLinks: {
  "url": string;
  "name": string;
  "data-umami-event": string;
  "icon": IconType;
}[] = [
  {
    "url": "https://github.com/Debbl/",
    "name": "Github",
    "data-umami-event": "click-github-link",
    "icon": "GithubAlt",
  },
  {
    "url": "https://space.bilibili.com/174865648/",
    "name": "哔哩哔哩",
    "data-umami-event": "click-bilibili-link",
    "icon": "BilibiliLine",
  },
  {
    "url": "mailto:me@aiwan.run",
    "name": "Email",
    "data-umami-event": "click-email-link",
    "icon": "Email",
  },
];

export default function Home() {
  return (
    <main className="relative flex-1 overflow-y-scroll">
      <div className="mb-10 flex flex-col items-center">
        <div className="mt-20">
          <Icon icon="Avatar" className="size-12 cursor-pointer rounded-full" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-24 md:grid-cols-2">
          {Object.entries(projects).map(([_, project]) => (
            <div key={project.name}>
              <Link
                href={project.url}
                className="text-center text-lg font-bold transition-colors hover:text-primary"
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
                          alt={item.name}
                          src={item.favicon ?? ""}
                          width={16}
                          height={16}
                          className="mr-1 inline-block size-4"
                        />
                      </div>
                      <div>
                        <Link
                          href={item.link}
                          className="text-sm transition-colors hover:text-primary"
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
          ))}

          <div className="row-start-3">
            <h3 className="text-lg font-bold">Find Me</h3>
            <div className="mt-4 flex items-center gap-x-4">
              {FindMeLinks.map((i) => (
                <Link
                  key={i.name}
                  href={i.url}
                  data-umami-event={i["data-umami-event"]}
                  className="inline-flex items-center border-b px-2 transition-colors hover:border-primary"
                >
                  <Icon className="size-6" icon={i.icon} />
                  {i.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
