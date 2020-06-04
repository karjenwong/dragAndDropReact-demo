import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState([
    [1, 2],
    [3, 4, 5, 6],
  ]);
  const [dragging, setDragging] = React.useState(false);
  const dragItem = React.useRef();
  const itemTarget = React.useRef();
  const dragNode = React.useRef();

  const onDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
    console.log("start dragging" + dragItem.current);
  };
  const handleDragEnd = () => {
    console.log("drag end");
    if (itemTarget.current) {
      let values = [itemTarget.current.pop(), dragItem.current.pop()];

      [dragItem.current, itemTarget.current].forEach(([i, j], index) => {
        data[i][j] = values[index];
      });

      setData(data);
    }

    //clean up
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragNode.current = null;
    dragItem.current = null;
    itemTarget.current = null;
  };
  const handleDragEnter = (e, params) => {
    if (JSON.stringify(params) !== JSON.stringify(dragItem.current)) {
      itemTarget.current = params;
    }
  };
  const displayCards = data.map((x, i) => {
    return (
      <div className="dnd-group" key={i}>
        {x.map((y, j) => (
          <div
            key={j}
            className="card dragMove"
            draggable
            onDragStart={(e) => onDragStart(e, [i, j, y])}
            onDragEnter={(e) => handleDragEnter(e, [i, j, y])}
          >
            {y}
          </div>
        ))}
      </div>
    );
  });
  return (
    <div className="App">
      <header className="App-header">
        <div className="drag-n-drop">{displayCards}</div>
      </header>
    </div>
  );
}

export default App;
