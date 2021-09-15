import { ResponsiveCalendar } from "@nivo/calendar";

const Calendar = (props) => {
  // find largest and lowest date in props.data
  let maxDate = Date.parse(props.data[0].day);
  let minDate = Date.parse(props.data[0].day);
  props.data.forEach((d) => {
    if (Date.parse(d.day) > maxDate) {
      maxDate = Date.parse(d.day);
    }
    if (Date.parse(d.day) < minDate) {
      minDate = Date.parse(d.day);
    }
  });

  return (
    <div className="w-full h-full">
      <ResponsiveCalendar
        data={props.data}
        from={new Date(minDate)}
        to={new Date(maxDate)}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={80}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        isInteractive={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
};

export default Calendar;
