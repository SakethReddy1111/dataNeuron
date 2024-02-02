import React, { useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizableDiv = (props) => {

    // const {case} = props
  const [size, setSize] = useState({ 
    width: 100, 
    height: 100
});

useEffect(()=>{
    getSize()
    window.addEventListener('resize', getSize);

}, [])

const getSize = ()=>{
    console.log("im called")
    let obj = {
        height : (window.innerHeight/2)-10
    }

    if(props.case==3){
        obj.width = window.innerWidth-10
    }else{
        obj.width = (window.innerWidth/2)-10

    }

    setSize(obj)
}

//   const onResize = (event, { size }) => {
//     console.log(window.innerWidth)
//     setSize(size);
//   };

  return (
    <ResizableBox
      width={size.width}
      height={size.height}
    //   onResize={onResize}
      resizeHandles={['ne', 'nw', 'se', 'sw', 'n', 'e', 's', 'w']}
      minConstraints={[100, 50]}
    //   maxConstraints={[500, 300]}
    >
      <div
        style={{
          position: 'relative',
          border: '1px solid #ddd',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Your content goes here */}
        <p>This is a resizable div</p>
      </div>
    </ResizableBox>
  );
};

export default ResizableDiv;
