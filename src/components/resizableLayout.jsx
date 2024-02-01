import React, { useEffect } from 'react';
import ResizableDiv from './imageHolders';

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
        <ResizableDiv case={1} />
        <ResizableDiv case={2} />
      </div>
      <div>
        <ResizableDiv case={3} />
      </div>
    </div>
  );
};

export default ResizableLayout;
