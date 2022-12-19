export default function Home() {
  return (
    <>
      Hello world
      <p className="bg-red">scoped!</p>
      <style jsx>{`
        div {
          background-color: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
    </>
  );
}
