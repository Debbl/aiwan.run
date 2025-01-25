import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: "flex",
            borderRadius: 50,
            width: 100,
            height: 100,
            overflow: "hidden",
          }}
        >
          <svg
            viewBox="0 0 36 36"
            fill="none"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
          >
            <mask
              id="mask__beam"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="36"
              height="36"
            >
              <rect width="36" height="36" fill="#FFFFFF"></rect>
            </mask>
            <g mask="url(#mask__beam)">
              <rect width="36" height="36" fill="#f2e0a0"></rect>
              <rect
                x="0"
                y="0"
                width="36"
                height="36"
                transform="translate(-4 8) rotate(168 18 18) scale(1)"
                fill="#8cb0b0"
                rx="36"
              ></rect>
              <g transform="translate(0 4) rotate(-8 18 18)">
                <path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path>
                <rect
                  x="11"
                  y="14"
                  width="1.5"
                  height="2"
                  rx="1"
                  stroke="none"
                  fill="#000000"
                ></rect>
                <rect
                  x="23"
                  y="14"
                  width="1.5"
                  height="2"
                  rx="1"
                  stroke="none"
                  fill="#000000"
                ></rect>
              </g>
            </g>
          </svg>
        </div>

        <div style={{ marginTop: 8, fontSize: 14, color: "#64748b" }}>
          @Brendan Dash
        </div>
        <h4 style={{ marginTop: 4, fontSize: 30, color: "#020617" }}>
          aiwan.run
        </h4>
      </div>
    ),
    {
      width: 800,
      height: 400,
    },
  );
}
