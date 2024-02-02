import React, { useEffect, useState, forwardRef, useImperativeHandle  } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import axios from "axios";

const ResizableDiv = forwardRef((props, ref) => {
  const [size, setSize] = useState({
    width: 100,
    height: 100,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    getSize();
    getData()
    window.addEventListener("resize", getSize);
  }, []);

  useImperativeHandle(ref, () => ({
    getData,
  }), []);

  const getSize = () => {
    let obj = {
      height: (window.innerHeight / 2) - 10,
      width : (window.innerWidth / 4) - 10
    };

    setSize(obj);
  };

  const getData = async()=>{
    try{

      let url = process.env.REACT_APP_BASE_URL+'logs/getTodoLogs'
      let data = await axios.get(url)

      setData(data.data.data)
    }catch(er){
      console.log(er)
    }
  }

  return (
    <ResizableBox
      width={size.width}
      height={size.height}
      //   onResize={onResize}
      resizeHandles={["ne", "nw", "se", "sw", "n", "e", "s", "w"]}
      minConstraints={[100, 50]}
      //   maxConstraints={[500, 300]}
    >
      <div
        style={{
          position: "relative",
          border: "1px solid #ddd",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          flexDirection:"column",
          justifyContent: "center",
        }}
      >
        {/* Your content goes here */}
        <h4>Total Data</h4>
        {
          data.length?
            data.map((d,i)=>{
              return (<div id = {i}>
                <p>{d.method} : {d.count}</p>
              </div>)
            })
          :
          <p>No data added</p>
        }
      </div>
    </ResizableBox>
  );
});

export default ResizableDiv;
