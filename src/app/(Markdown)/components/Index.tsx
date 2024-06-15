import Link from "next/link";
import type { List } from "~/data";
import { format } from "~/utils/time";

export function Index({ list }: { list: List }) {
  return (
    <main className="mt-20 flex flex-col items-center">
      <div className="mt-10">
        <ul>
          {list.map((note) => {
            const { content } = note.metadata;

            return (
              <li key={note.noteId} className="text-xl hover:text-primary">
                <Link href={`/blog/${content.slug}`}>
                  <span>{content.title}</span>
                  <span className="ml-6 text-sm">
                    <span>
                      {format(new Date(note.createdAt), "yyyy-MM-dd")}
                    </span>
                    <span>{" · "}</span>
                    <span>{`${content.duration}min`}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
