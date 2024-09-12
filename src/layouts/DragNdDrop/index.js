// src/Drag.js
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropTypes from "prop-types";
import { Box, Grid} from "@mui/material";


const ItemTypes = {
  BLOCK: "block",
};

const Block = ({ id, text, index, moveBlock }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BLOCK,
      item: { id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, index]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BLOCK,
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveBlock(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    }),
    [index]
  );

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "16px",
        margin: "4px",
        backgroundColor: "lightblue",
        cursor: "move",
        display: "inline-block",
      }}
    >
      {text}
    </div>
  );
};

Block.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveBlock: PropTypes.func.isRequired,
};

const Drag = () => {
  const [blocks, setBlocks] = useState([
    { id: 1, text: "Block 1" },
    { id: 2, text: "Block 2" },
    { id: 3, text: "Block 3" },
    { id: 4, text: "Block 4" },
  ]);

  const moveBlock = (fromIndex, toIndex) => {
    const updatedBlocks = [...blocks];
    const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
    updatedBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(updatedBlocks);
  };

  return (
    <DndProvider  backend={HTML5Backend}>
      <div
       className="grid grid-cols-1 bg-white shadow-lg rounded-lg p-6 md:ml-72 md:pr-10"
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          {blocks.map((block, index) => (
            <Block
              key={block.id}
              id={block.id}
              text={block.text}
              index={index}
              moveBlock={moveBlock}
            />
          ))}
        </div>
      </div>
  
    </DndProvider>
  );
};

export default Drag;
