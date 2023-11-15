import { useState } from "react";
import { imagesData } from "../data/images";

const Gallery = () => {
  const [items, setItems] = useState(imagesData);

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

  return (
    <div className="bg-[#EBEFF5] min-h-screen w-screen flex items-center justify-center">
      <div className="lg:w-1/2 md:w-3/4 w-full p-4 rounded-lg shadow bg-white">
        <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2  gap-4 md:gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative draggable group cursor-grab ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={item.link}
                alt=""
                className="object-cover border rounded-md "
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
