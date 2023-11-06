import { useState} from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { imagesData } from "../data/images";
import { gridLayout } from "../gridLayout/GridLayout";

const Gallery = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState(imagesData);
  const [layout, setLayout] = useState(gridLayout);
  console.log(layout[layout.length-1]);

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <div className="bg-gray-100 container mx-auto">
        <h1 className="text-5xl font-semibold text-center uppercase">Responsive Image Gallery</h1>
      <div className="flex justify-between px-10">
        <h2>{selectedImages.length}</h2>
        <button
         
          className="bg-red-500 text-white p-2 rounded-lg"
        >
          Delete
        </button>
      </div>
      <div className="">
        <GridLayout
          className="layout mx-auto"
          layout={layout}
          cols={5}
          preventCollision={false}
          rowHeight={200}
          width={1200}
          onLayoutChange={onLayoutChange}
        >
          {images.map((image) => (
            <div
              key={image.id}
              className="image-item relative border"
            >
              <img
                src={image.src}
                alt={image.id}
                className={`w-full h-full object-cover hover:opacity-0 ${
                  image.id === "featured" ? "featured" : ""
                }`}
              />
              <input
                type="checkbox"
                checked={selectedImages.includes(image)}
              
                className="absolute w-6 h-6 top-2 left-2"
              />
            </div>
          ))}
          <div key="upload" className="image-item border p-2">
            <label
              htmlFor="fileInput"
              className="w-full h-full border-dashed border-2 cursor-pointer flex items-center justify-center"
            >
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
               
              />
              <span>Upload Image</span>
            </label>
          </div>
        </GridLayout>
      </div>
    </div>
  );
};

export default Gallery;
