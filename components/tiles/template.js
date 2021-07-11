const Template = (props) => {
  return (
    <div className="p-4">
      <select className="border mr-8 rounded" name="template" id="template">
        <option value="default">Default</option>
        <option value="all">All</option>
      </select>
      <button
        onClick={props.add}
        className="bg-blue-400 rounded px-4 py-2 text-white"
      >
        Use
      </button>
    </div>
  );
};

export default Template;
