import { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { imagesData } from "../data/images";
import { gridLayout } from "../gridLayout/GridLayout";

const Gallery = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState(imagesData);
  const [layout, setLayout] = useState(gridLayout);
  const [showSelectedItems, setShowSelectedItems] = useState(false);
  const [showdeleteBtn, setShowdeleteBtn] = useState(false);
  console.log(layout[layout.length - 1]);

  const handleCheckboxChange = (url) => {
    console.log(selectedImages.includes(url));
    if (selectedImages.includes(url)) {
      console.log(url);
      setSelectedImages(
        selectedImages.filter((selectedUrl) => selectedUrl !== url)
      );
    } else {
      setSelectedImages([...selectedImages, url]);
    }

    setShowSelectedItems(true)
  };

  const handleDeleteClick = () => {
    console.log("working");
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image)
    );
    setImages(updatedImages);
    setSelectedImages([]); 
  };

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      const imageObject = {
        id: `image${images.length + 1}`,
        src: URL.createObjectURL(uploadedImage),
        file: uploadedImage,
      };

      setImages([...images, imageObject]);

      let lastItem = layout[layout.length - 2].x;
      if (lastItem < 4) {
        lastItem = lastItem + 1;
      } else {
        lastItem = 0;
      }

      const newItemLayout = {
        i: imageObject.id,
        x: lastItem,
        y: 2,
        w: 1,
        h: 1,
      };

      setLayout([...layout, newItemLayout]);
    }
  };

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <div className="bg-[#EBEFF5] overflow-hidden">
      <div className=" bg-white w-8/12 rounded-md mx-auto my-5 py-5 px-16">
        <div className="flex justify-between w-[800px] mb-5">
          {showSelectedItems ? (
            <>
              <h2 className="text-xl font-bold">
                {selectedImages.length} Files Selected
              </h2>
              <button
                onClick={handleDeleteClick}
                className="text-red-500 text-lg p-2 rounded-lg font-bold"
              >
                Delete Files
              </button>
            </>
          ) : (
            <h2 className="text-xl font-bold">Gallery</h2>
          )}
        </div>
        <div className="mx-auto">
          <GridLayout
            className="layout"
            layout={layout}
            cols={5}
            preventCollision={false}
            rowHeight={120}
            width={800}
            onLayoutChange={onLayoutChange}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="relative border rounded-md w-[110px] h-[110px]"
              >
                <img
                  src={image.src}
                  alt={image.id}
                  className="rounded-md w-full h-full"
                />
                <input
                  type="checkbox"
                  checked={selectedImages.includes(image)}
                  onChange={() => handleCheckboxChange(image)}
                  className="absolute top-5 left-5 w-4 h-4"
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
                  onChange={handleImageUpload}
                />
                <span>Upload Image</span>
              </label>
            </div>
          </GridLayout>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
