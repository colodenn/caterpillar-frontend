const Timestamp = (props) => {
  return (
    <div className="flex my-auto mx-auto justify-center items-center">
      <div>
        <p className="text-lg font-normal">
          <span className="font-medium">Start:</span> {props.start}
        </p>
        <p className="text-lg font-normal">
          <span className="font-medium">End:</span> {props.end}
        </p>
      </div>
    </div>
  );
};

export default Timestamp;
