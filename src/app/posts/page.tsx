import { Meteors } from "~/components/magicui/Meteors";

export default async function Page() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 size-full overflow-hidden">
        <Meteors number={30} />
      </div>

      <main className="relative flex-1 overflow-y-scroll">
        <div className="flex min-h-full w-full items-center justify-center">
          <div className="flex w-fit flex-col items-start justify-center gap-y-8 py-8"></div>
        </div>
      </main>
    </>
  );
}
