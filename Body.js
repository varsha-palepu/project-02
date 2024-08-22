import React, { useState } from 'react';
import { useEffect } from 'react';
const Body = () => {
  const [dragTile, setDragTile] = useState([]); // to add all dragged items.
  const[draggedItem,setDraggedItem]=useState('type');
  const [dragged,setDragged]=useState(false);
  const [labelText,setLabelText]=useState(""); // to update the input text labels entered.
  const [labelTextArea,setLabelTextArea]=useState(""); // to update the text area labels entered.
  const [itemIndex,setItemIndex]=useState(null);

  const handleDragStart = (e, item) => {
    const data = JSON.stringify({ item }); //to pass data as array to the below syntax you need to stringify it first.
    e.dataTransfer.setData('text', data); // array of objects that are dragged are passed here.
    console.log("Dragged", item);
    setDraggedItem(item);
    setDragged(false);
  };
  useEffect(() => {
    console.log("Updated dragged item", draggedItem);
  }, [draggedItem]);

  const handleDragOver = (e) => {
    e.preventDefault(); // this will avoid redirectly to an unsual url etc when you drag and drop things.
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItems = e.dataTransfer.getData('text'); // Retrieving data after you drop.
    const { item } = JSON.parse(droppedItems); // since we stringyfied the data above we need to parse the droppedItems JSON to extract the item
    const updatedDroppedItems = [...dragTile, { item ,label:''}]; //using a spread operator to create a copy of the array as it doesnot update the array directly.
    setDragTile(updatedDroppedItems);
    console.log("Dropped", item);
    setDragged(true); // Update state to show label input.
    setItemIndex(dragTile.length); // to get the element's index
  };
  const handleLabel=(e)=>{
    if(draggedItem=== "Text field"){
    setLabelText(e.target.value);
    }
    else if(draggedItem === "Text Area"){
    setLabelTextArea(e.target.value);
    }
  }
  const handleLabelSave=()=>{
    setDragTile(prevTiles => {
      // Update the label for the item at the specified index.
      const updatedTiles = [...prevTiles];
      if(draggedItem === "Text field"){
      updatedTiles[itemIndex] = { ...updatedTiles[itemIndex], label: labelText };
      }
      else if(draggedItem === "Text Area"){
        updatedTiles[itemIndex] = { ...updatedTiles[itemIndex], label: labelTextArea };
        console.log("txt area label", labelTextArea);
      }
      return updatedTiles;
    });
    setLabelText("");
    setLabelTextArea("");
    setItemIndex(null);
  }

  return (
    <div className="flex">
      <div className="w-[25%] py-4">
        <div className="flex justify-center h-16 px-2 py-2">
          <div
            className="text-[15px] bg-gray-100 text-center hover:bg-gray-200 p-4 rounded w-[75%] h-full"
            draggable
            onDragStart={(e) => handleDragStart(e, 'Text field')}>
            Text field
          </div>
        </div>
        <div className="flex justify-center h-16 px-2 py-2">
          <div
            className="text-[15px] bg-gray-100 text-center hover:bg-gray-200 p-4 rounded w-[75%] h-full"
            draggable
            onDragStart={(e) => handleDragStart(e, 'DropDown')}>
            DropDown
          </div>
        </div> 
        <div className="flex justify-center h-16 px-2 py-2">
          <div
            className="text-[15px] bg-gray-100 text-center hover:bg-gray-200 p-4 rounded w-[75%] h-full"
            draggable
            onDragStart={(e) => handleDragStart(e, 'Text Area')}>
            Text Area
          </div>
         </div>
      </div>
      <div className="w-[50%] p-4 flex-wrap" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)}>
        {dragTile.map((item, index) => ( // iterating over the dragged items and displaying them.
          <div key={index}>
            {item.item === 'Text field' && (
              <div className="m-4 p-4 flex">
              <span className="flex items-center" style={{ minWidth: '100px' }}>
                <label>{item.label}</label>
              </span>
              <input
                type="text"
                className="border border-solid border-black w-[300px] rounded-md h-[35px] p-4 text-center"
                placeholder="Enter text"
              />
            </div>            
            )}
            {item.item === 'DropDown' && (
              <div className="m-4 p-4 text-center">
                <select className="border border-solid border-black w-[400px] rounded-md h-[35px]">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
            )}
            {item.item === 'Text Area' && (
              <div className="m-4 p-4 flex">
                <span className="flex items-center" style={{ minWidth: '110px' }}>
                 <label>{item.label}</label>
                 </span>
                <textarea className="border border-solid border-black w-[300px] rounded-md h-[100px]"></textarea>
              </div>
            )}
          </div>
        ))}
        {dragTile.length === 0 && <div className="text-center">No tiles dragged</div>}
      </div>
      <div className=" w-[25%]">
        <div>{dragged && draggedItem ==="Text field"  && <input type="text" value={labelText} className="border border-solid border-black w-[300px] rounded-md h-[35px] m-12 p-4"
                  placeholder="Enter the label for dropped input text" onChange={handleLabel} onBlur={handleLabelSave}
                />}
        </div>
        <div>{dragged && draggedItem ==="Text Area"  && <input type="text" value={labelTextArea} className="border border-solid border-black w-[300px] rounded-md h-[35px] m-12 p-4"
                  placeholder="Enter the label for dropped text area" onChange={handleLabel} onBlur={handleLabelSave}
                />}
        </div>
      </div>
    </div>
  );
};

export default Body;
