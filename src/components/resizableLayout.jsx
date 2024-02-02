import React, { useRef } from "react";
import ResizableDiv1 from "./resizableComponent1";
import ResizableDiv2 from "./resizableComponent2";
import ResizableDiv3 from "./resizableComponent3";

const ResizableLayout = () => {
  const childRef1 = useRef(null);
  const childRef2 = useRef(null);
  const childRef3 = useRef(null);

  const getAllData = async () => {
    // Call the function in the child component using the ref
    if (childRef2.current) {
      childRef2.current.getData();
    }
    if (childRef1.current) {
      setTimeout(() => {
        childRef1.current.getData();
      }, 120);
    }
  };

  const updateTodo = (data) => {
    console.log(data);
    if (childRef3.current) {
      childRef3.current.setText(data);
    }
  };

  return (
    <div id="container" style={{ display: "flex", flexDirection: "column" }}>
      <div id="header" style={{ display: "flex" }}>
        <ResizableDiv1 case={1} ref={childRef1} />
        <ResizableDiv2
          case={2}
          updateTodo={updateTodo}
          getAllData={getAllData}
          ref={childRef2}
        />
      </div>
      <div>
        <ResizableDiv3 case={3} getAllData={getAllData} ref={childRef3} />
      </div>
    </div>
  );
};

export default ResizableLayout;
