import { AiFillCamera, AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";
import S3 from "react-aws-s3";
import ImageUploading from "react-images-uploading";

import Button from "../Button";

import "./ImageUpload.css";

const ImageUpload = ({ email, setImageUrl, imageUrl, dontChangeState }) => {
  const [images, setImages] = useState([]);

  const onChange = (imageList) => {
    //changed state
    if (dontChangeState) {
      console.log(imageList);
    } else {
      setImages(imageList);
    }
  };

  const onUpload = async () => {
    const file = images[0].file;
    const fileName = `${email}/images/profile/${file.name}`;

    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };

    const ReactS3Client = new S3(config);

    const s3Data = await ReactS3Client.uploadFile(file, fileName);

    if (s3Data.status === 204) {
      //change
      if (dontChangeState) {
        console.log(s3Data.location);
      } else {
        setImageUrl(s3Data.location);
        setImages([]);
      }
    } else {
      console.log("Failed to upload image");
    }
  };

  return (
    <div className="App">
      <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          <div className="upload__image-wrapper">
            <div className="card-action-area text-center">
              {images.length !== 0 && (
                <>
                  <div>
                    <img
                      className="preview-image"
                      alt={images[0].name}
                      src={images[0]["data_url"]}
                    />
                    <div className="preview-title my-2">Image Preview</div>
                  </div>
                </>
              )}

              {imageList.length !== 0 && (
                <div className="d-flex gap-2 justify-content-center px-3">
                  <button className="logo-button" onClick={onImageRemoveAll}>
                    <span className="upload-logo">
                      <RiDeleteBin6Fill size="1.5rem" />
                    </span>
                  </button>

                  <button className="logo-button" onClick={onImageUpload}>
                    <span className="upload-logo">
                      <AiFillEdit size="1.5rem" />
                    </span>
                  </button>
                </div>
              )}
            </div>

            {imageList.length !== 0 && (
              <div className="d-flex gap-2 justify-content-center py-2">
                <Button
                  mode="primary"
                  label="UPLOAD"
                  size="medium"
                  onClick={onUpload}
                />
              </div>
            )}

            <div className="image-upload-actions">
              {imageList.length === 0 && (
                <button className="upload-btn" onClick={onImageUpload}>
                  <span className="upload-logo">
                    <AiFillCamera size="1.5rem" fill="black" />
                  </span>
                  SELECT PROFILE IMAGE
                </button>
              )}

              {imageUrl && (
                <div className="uploaded-image-div">
                  <img
                    alt={imageUrl}
                    className="preview-image"
                    src={imageUrl}
                  />
                  <div className="preview-title my-2">Uploaded Image</div>
                </div>
              )}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUpload;
