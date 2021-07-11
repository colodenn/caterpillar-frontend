import { Editor, createEditorState, BLOCK_BUTTONS } from "medium-draft";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "medium-draft/lib/index.css";
// import mediumDraftExporter from "medium-draft/lib/exporter";
// import { convertToRaw } from "draft-js";
// import mediumDraftImporter from "medium-draft/lib/importer";

function Textarea(props) {
  const [editor, setEditor] = useState(createEditorState());
  useEffect(() => {}, [props.data]);

  const onChange = (editorState) => {
    setEditor(editorState);
    // props.update(JSON.stringify(editorState));
  };
  const blockButtons = [
    {
      label: "H1",
      style: "header-one",
      icon: "header",
      description: "Heading 1",
    },
    {
      label: "H2",
      style: "header-two",
      icon: "header",
      description: "Heading 2",
    },
  ].concat(BLOCK_BUTTONS);
  return (
    <>
      <div className="height px-2 ">
        <Editor
          blockButtons={blockButtons}
          sideButtons={[]}
          editorState={editor}
          onChange={onChange}
        />
        {/* <button onClick={() => console.log(JSON.stringify(editor))}>
          test
        </button> */}
      </div>
      <style jsx>{`
        h1 {
          font-size: 5rem;
        }

        h2 {
          font-size: 3.5rem;
        }
        .DraftEditor-root {
          height: 100px;
          overflow: hidden;
        }
        /* width */
        ::-webkit-scrollbar {
          width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #888;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .height {
          height: calc(100% - 3.4rem);
        }
      `}</style>
    </>
  );
}

export default dynamic(() => Promise.resolve(Textarea), { ssr: false });
