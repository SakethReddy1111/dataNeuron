import React, { useEffect } from 'react';
import ResizableDiv1 from './resizableComponent1';
import ResizableDiv2 from './resizableComponent2';
import ResizableDiv3 from './resizableComponent3';

const ResizableLayout = () => {

  // const [area, setArea] = useEffect({width:0, height:0})

  // useEffect(()=>{
  //   let width = window.innerWidth
  //   let height = window.innerHeight

  //   setArea({width, height})
  // }, [area])


  return (
    <div id="container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div id="header" style={{ display: 'flex' }}>
        <ResizableDiv1 case={1} />
        <ResizableDiv2 case={2} />
      </div>
      <div>
        <ResizableDiv3 case={3} />
      </div>
    </div>
  );
};

export default ResizableLayout;
