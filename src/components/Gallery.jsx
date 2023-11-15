import { useState } from "react";
import { imagesData } from "../data/images";

const Gallery = () => {
  const [items, setItems] = useState(imagesData);

  return (
    <div className="bg-[#EBEFF5] min-h-screen w-screen flex items-center justify-center">
      <div className="lg:w-1/2 md:w-3/4 w-full p-4 rounded-lg shadow bg-white">
        <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2  gap-4 md:gap-6">
          {items.map((item, index) => (
            <div key={index}>
              <img
                src={item.link}
                alt=""
                className="object-cover border rounded-md "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
