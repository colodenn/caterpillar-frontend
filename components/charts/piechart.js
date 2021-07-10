import { ResponsivePie } from "@nivo/pie";

const Piechart = (props) => {
  const data = props.dat;

  if (data === undefined || data === "") {
    return <h1>loading</h1>;
  } else {
    return (
      <div>
        <h1>test</h1>
        <ResponsivePie
          data={[
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
          margin={{ top: 40, right: 90, bottom: 160, left: 90 }}
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
      </div>
    );
  }
};

export default Piechart;
