import { ResponsivePie } from "@nivo/pie";

const Piechart = (props) => {
  const data = props.dat;

  if (data === undefined || data === "") {
    return <h1>loading</h1>;
  } else {
    return (
      <div className="height">
        <ResponsivePie
          data={props.dat}
          margin={{ top: 40, right: 90, bottom: 40, left: 90 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextColor="#333333"
          radialLabelsLinkColor={{ from: "color" }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#333333"
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "ruby",
              },
              id: "dots",
            },
            {
              match: {
                id: "c",
              },
              id: "dots",
            },
            {
              match: {
                id: "go",
              },
              id: "dots",
            },
            {
              match: {
                id: "python",
              },
              id: "dots",
            },
            {
              match: {
                id: "scala",
              },
              id: "lines",
            },
            {
              match: {
                id: "lisp",
              },
              id: "lines",
            },
            {
              match: {
                id: "elixir",
              },
              id: "lines",
            },
            {
              match: {
                id: "javascript",
              },
              id: "lines",
            },
          ]}
          legends={[]}
        />
        <style jsx>{`
          .height {
            height: calc(100%);
            width: calc(100%);
          }
          .border-b-1 {
            border-bottom: 1px solid #e8e8ef;
          }

          .border-r-1 {
            border-right: 1px solid #e8e8ef;
          }

          .backgroundTile {
            background-image: url("/tile.png");
            background-repeat: repeat;
            background-size: 30px 30px;
            background-color: #fbfbfb;
          }
        `}</style>
      </div>
    );
  }
};

export default Piechart;
