import { useRef, useState } from "react";
import { imagesData } from "../data/images";

const Gallery = () => {
  const [items, setItems] = useState(imagesData);
  const [selectedItems, setSelectedItems] = useState([]);

  const dragItem = useRef();
  const dragOverItem = useRef();

  // Function for uploading new image
  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const newItem = {
        id: `image-${items.length + 1}`,
        link: URL.createObjectURL(uploadedFile),
      };
      setItems([...items, newItem]);
      e.target.value = null;
    }
  };

  // Function for selecting/unselecting items
  const toggleCheckbox = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== index)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, index]);
    }
  };

  // Function for deleting selected items
  const deleteSelectedItems = () => {
    const updatedItems = items.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setItems(updatedItems);
    setSelectedItems([]);
  };

  //Function when drag is started
  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  //Function when drag is entered
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  // Function when draggable item is dropped
  const drop = () => {
    const copyListItems = [...items];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setItems(copyListItems);
  };

  return (
    <div className="bg-[#EBEFF5] min-h-screen w-screen flex items-center justify-center">
      <div className="lg:w-1/2 md:w-3/4 w-full p-4 rounded-lg shadow bg-white">
        <div className="flex justify-between items-center mb-5">
          <div>
            {selectedItems.length > 0 ? (
              <span className="text-xl font-bold">
                {selectedItems.length}{" "}
                {selectedItems.length === 1 ? "file" : "files"} selected
              </span>
            ) : (
              <span className="text-xl font-bold">Gallery</span>
            )}
          </div>
          <div>
            {selectedItems.length > 0 && (
              <button
                className="text-red-500 text-lg p-2 rounded-lg font-bold"
                onClick={deleteSelectedItems}
              >
                Delete Files
              </button>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2  gap-4 md:gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative draggable group cursor-grab ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              draggable
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
            >
              <label htmlFor={`checkbox-${index}`}>
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  className={
                    "absolute top-4 left-4 h-5 w-5 cursor-pointer accent-blue-500 group-hover:opacity-100" +
                    " " +
                    (selectedItems.length > 0 ? "opacity-100" : "opacity-0")
                  }
                  checked={selectedItems.includes(index)}
                  onChange={() => toggleCheckbox(index)}
                />
              </label>

              <img
                src={item.link}
                alt=""
                className="object-cover border rounded-md w-full h-full"
              />
            </div>
          ))}

          <div className="col-span-full h-full md:col-span-1 flex min-h-[5rem] items-center justify-center border-dashed border-2 border-gray-300">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer flex justify-center items-center h-full w-full "
            >
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                onChange={handleUpload}
              />
              <div className="text-center w-full">
                <p className="text-gray-500">Add Image</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
