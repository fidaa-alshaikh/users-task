import React from 'react';
import ImageUploading from "react-images-uploading";
import default_image from "../assets/images/default_image.png";
// import default_image2 from "api/users/images/";
export default function ImageUploader(props) {

    const { selectedImage, setSelectedImage } = props;

    const onChange = (imageList) => {
        // data for submit

        setSelectedImage(imageList);
     
    };

    const onImageRemove1 = () => {
        const image = [{data_url: default_image}];
        setSelectedImage(image);

    };

    return (
        <div className="App">
            <ImageUploading
                value={selectedImage}
                onChange={onChange}
                dataURLKey="data_url"

            >
                {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        {selectedImage?
                        <></>
                        :
                        <button
                        onClick={(e) => { e.preventDefault(); onImageUpload() }}
                    >
                        Click or Drop here
                       </button>
                        }

                        &nbsp;
                        {selectedImage &&

                            <div key={0} className="image-item">
                                <img src={selectedImage[0]?.data_url} alt="" style={{
                        width: "130px",
                        height: "130px",
                        objectFit: "cover",
                        borderRadius: "50%"
                      }} />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={(e) => { e.preventDefault(); onImageUpdate(0);  }}>Update</button>
                                    <button onClick={(e) => { e.preventDefault(); onImageRemove(0); onImageRemove1() }}>Remove</button>
                                </div>
                            </div>
                        }

                


                    </div>
                )}
            </ImageUploading>

        </div>
    )
}
