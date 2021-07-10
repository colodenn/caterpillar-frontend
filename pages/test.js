import Piechart from "../components/charts/piechart";
import Texteditor from "../components/tiles/texteditor";
export default function Home() {
  return (
    <>
      <div className="background h-screen overflow-hidden">
        <Piechart
          dat={[
            {
              id: "ruby",
              label: "ruby",
              value: 426,
              color: "hsl(80, 70%, 50%)",
            },
            {
              id: "stylus",
              label: "stylus",
              value: 116,
              color: "hsl(45, 70%, 50%)",
            },
            {
              id: "elixir",
              label: "elixir",
              value: 374,
              color: "hsl(36, 70%, 50%)",
            },
            {
              id: "go",
              label: "go",
              value: 79,
              color: "hsl(99, 70%, 50%)",
            },
            {
              id: "make",
              label: "make",
              value: 405,
              color: "hsl(70, 70%, 50%)",
            },
          ]}
        />
      </div>

      <style jsx>{`
        .background {
          background: radial-gradient(
            66.35% 213.61% at 77.27% 52.1%,
            rgba(160, 158, 252, 0.52) 0%,
            rgba(254, 199, 255, 0.74) 100%
          );
        }
        #huge {
          font-size: 500px;
          transform: rotate(45deg);
          letter-spacing: -0.105em;
          line-height: 66.5%;
        }
      `}</style>
    </>
  );
}
