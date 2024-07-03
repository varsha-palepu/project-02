import React, { useState } from 'react';

const Body = () => {
  const [dragTile, setDragTile] = useState([]); // to add all dragged items.

  const handleDragStart = (e, item) => {
    const data = JSON.stringify({ item }); //to pass data as array to the below syntax you need to stringify it first.
    e.dataTransfer.setData('text', data); // array of objects that are dragged are passed here.
    console.log("Dragged", item);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // this will avoid redirectly to an unsual url etc when you drag and drop things.
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItems = e.dataTransfer.getData('text'); // Retrieving data after you drop.
    const { item } = JSON.parse(droppedItems); // since we stringyfied the data above we need to parse the droppedItems JSON to extract the item
    const updatedDroppedItems = [...dragTile, { item }]; //using a spread operator to create a copy of the array as it doesnot update the array directly.
    setDragTile(updatedDroppedItems);
    console.log("Dropped", updatedDroppedItems); 
  };

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
      <div className="w-[75%] p-4" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e)}>
        {dragTile.map((item, index) => ( // iterating over the dragged items and displaying them.
          <div key={index}>
            {item.item === 'Text field' && (
              <div className="m-4 p-4 text-center">
                <input
                  type="text"
                  className="border border-solid border-black w-[400px] rounded-md h-[35px]"
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
              <div className="m-4 p-4 text-center">
                <textarea className="border border-solid border-black w-[400px] rounded-md h-[100px]"></textarea>
              </div>
            )}
          </div>
        ))}
        {dragTile.length === 0 && <div className="text-center">No tiles dragged</div>}
      </div>
    </div>
  );
};

export default Body;
