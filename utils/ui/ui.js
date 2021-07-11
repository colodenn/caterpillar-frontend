import Numbers from "../../components/tiles/numbers";
import Template from "../../components/tiles/template";
import ImagePetri from "../../components/tiles/image";
import Timestamp from "../../components/tiles/timestamps";
import Datatable from "../../components/tiles/datatable";
import Piechart from "../../components/charts/piechart";
import PieDropdown from "../../components/tiles/PieDropdown";
import Textarea from "../../components/tiles/texteditor";

export function tiles(exp, el, addAll, updateText) {
  var html = <h1>test</h1>;
  switch (exp) {
    case "image":
      html = <ImagePetri src={el.data} />;
      break;

    case "number":
      html = <Numbers number={el.data} />;
      break;

    case "template":
      html = <Template add={() => addAll()} />;
      break;

    case "custompiechart":
      if (el.data.length == 0) {
        html = <PieDropdown />;
      } else {
        html = <Piechart dat={el.data} />;
      }
      break;

    case "piechart":
      html = <Piechart dat={el.data} />;

      break;

    case "timestamps":
      html = <Timestamp start={el.data[0]} end={el.data[1]} />;
      break;

    case "table":
      html = <Datatable rows={el.data} header={el.data[0]} />;
      break;
    default:
      html = (
        <Textarea data={el.data} update={(data) => updateText(data, el.i)} />
      );

      break;
  }
  return html;
}
