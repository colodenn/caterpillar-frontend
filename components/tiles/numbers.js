const Numbers = (props) => {
  return (
    <div className="flex h-full mx-auto my-auto justify-center items-center">
      <p className="  font-bold text-3xl align-middle py-4">{props.number}</p>
    </div>
  );
};

export default Numbers;
