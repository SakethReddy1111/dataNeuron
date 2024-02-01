import React from "react";
import Splitter from "./splitter";
import { useResizable } from "react-resizable-layout";
import { cn } from "../utils/cn";

const ResizableLayout = ()=> {
  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps
  } = useResizable({
    axis: "y",
    initial: 150,
    min: 50,
    reverse: true
  });


  const {
    isDragging: isTerminalDragging2,
    position: terminalH2,
    splitterProps: terminalDragBarProps2
  } = useResizable({
    axis: "y",
    initial: 300,
    min: 50,
    reverse: true
  });

  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps
  } = useResizable({
    axis: "x",
    initial: 250,
    min: 50
  });
  const {
    isDragging: isPluginDragging,
    position: pluginW,
    splitterProps: pluginDragBarProps
  } = useResizable({
    axis: "x",
    initial: 200,
    min: 50,
    reverse: true
  });

  return (
    <div    
      className={
        "flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"
      }
    >
      <div className={"flex grow"}>
        <div
          className={cn("shrink-0 contents", isFileDragging && "dragging")}
          style={{ width: fileW }}
        >
          File Tree
        </div>
        <Splitter isDragging={isFileDragging} {...fileDragBarProps} />
        <div className={"flex grow"}>
          <div className={"grow bg-darker contents"}>Editor</div>
          
        </div>
      </div>
      <Splitter
        dir={"horizontal"}
        isDragging={isTerminalDragging}
        {...terminalDragBarProps}
      />
      <div
        className={cn(
          "shrink-0 bg-darker contents",
          isTerminalDragging && "dragging"
        )}
        style={{ height: terminalH }}
      >
        Terminal
      </div>
      <Splitter
        dir={"horizontal"}
        isDragging={isTerminalDragging2}
        {...terminalDragBarProps2}
      />
    </div>
  );
};

export default ResizableLayout;
