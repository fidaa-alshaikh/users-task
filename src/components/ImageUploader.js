import React from 'react';
import ImageUploading from "react-images-uploading";
import default_image from "../assets/images/default_image.png";
import add_image from "../assets/images/add_image.jpg";

import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';


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
                         <img src={add_image} alt=""
                         onClick={(e) => { e.preventDefault(); onImageUpload() }}
                          style={{
                            width: "160px",
                            height: "130px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            cursor: "pointer"
                          }} />
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
                                    {/* <button onClick={(e) => { e.preventDefault(); onImageUpdate(0);  }}>Update</button>
                                    <button onClick={(e) => { e.preventDefault(); onImageRemove(0); onImageRemove1() }}>Remove</button> */}
                                
                             
                             <IconButton aria-label="edit" color="primary" size="large" onClick={(e) => { e.preventDefault(); onImageUpdate(0);  }}>
                               <AddCircleIcon fontSize="inherit" />
                             </IconButton>
                           
                             <IconButton aria-label="delete" color="primary" size="large" onClick={(e) => { e.preventDefault(); onImageRemove(0); onImageRemove1() }}>
                               <CancelIcon fontSize="inherit" />
                             </IconButton>
                           

                       
                                </div>



                            </div>
                        }

                


                    </div>
                )}
            </ImageUploading>

        </div>
    )
}
