import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    Game: {
      name: "Game",
      url: "https://game.aiwan.run/",
      desc: "some games",
      content: [
        {
          name: "Minesweeper",
          link: "https://game.aiwan.run/minesweeper/",
          desc: "A minesweeper game use react.",
        },
        {
          name: "Tic tac toe",
          link: "https://game.aiwan.run/tictactoe/",
          desc: "A Tic-tac-toe game use solid.js.",
        },
        {
          name: "Game of Life",
          link: "https://game.aiwan.run/game-of-life/",
          desc: "A Game-of-Life game use react",
        },
        {
          name: "Bubble Wrap",
          link: "https://game.aiwan.run/bubble-wrap/",
          desc: "A Bubble Wrap game use react",
        },
        {
          name: "Self driving car",
          link: "https://car.aiwan.run",
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
          name: "Tools",
          link: "https://tools.aiwan.run/",
          desc: "A tool collection.",
        },
        {
          name: "Code Diff",
          link: "https://tools.aiwan.run/code-diff/",
          desc: "A code diff tool.",
        },
        {
          name: "Bilibili ShortLink Converter",
          link: "https://bili-shortlink.vercel.app/",
          desc: "Bilibili shortLink converter.",
        },
        {
          name: "Peppa Pig Quotes",
          link: "https://peppa.aiwan.run",
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
          name: "Ai",
          link: "https://ai.aiwan.run/",
          desc: "A free client first AI apps.",
        },
        {
          name: "V",
          link: "https://v.aiwan.run/",
          desc: "some visualization",
        },
        {
          name: "Emoji Kitchen",
          link: "https://emoji.aiwan.run/",
          desc: "A emoji kitchen.",
        },
        {
          name: "Reader Markdown",
          link: "https://rm.aiwan.run/",
          desc: "A markdown reader by web.",
        },
      ],
    },
  });
}
