import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'cropperjs';
import axios from 'axios';


interface SelectProps {
  onResponseDataChange: (data: any) => void;
}


const Select = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  let cropper: Cropper | null = null;

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [position, setPosition] = useState<{ x: number; y: number; } | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(''); // State to store the URL of the uploaded image
  const [imageUploaded, setImageUploaded] = useState<File | null>(null);
  const [commentResponse, setCommentResponse] = useState<any>(null); // State to store the comment data from the server
  const handleUpload = () => {
    if (imageUploaded) {
      const formData = new FormData();
      formData.append('image', imageUploaded);
      axios.post('http://localhost:3000/api/v0/image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        setImageUrl(`http://localhost:3000/uploads/${res.data}`)
        axios.post('http://localhost:3000/api/v0/comment/', { image: `http://localhost:3000/uploads/${res.data}` }).then((res) => {
          console.log('ressssss', res.data);
          setCommentResponse(res.data);
        }
        ).catch((err) => {
          console.error(err);
        });

      })
      .catch((err) => {
        console.error(err);
      });
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl('');
    setImageUploaded(e.target.files![0]);
  };

  useEffect(() => {
    if (imageRef.current) {
      const handleImageLoad = () => {
        if (!showCommentBox && !cropper) {
          cropper = new Cropper(imageRef.current!, {
            aspectRatio: 0,
            crop(event: any) {
              setPosition(event.detail);
            },
            cropend() {
              setShowCommentBox(true);
            },
          });
        }
      };
      
      imageRef.current.addEventListener('load', handleImageLoad);

      return () => {
        if (imageRef.current) {
          imageRef.current.removeEventListener('load', handleImageLoad);
        }
      };
    }
  }, [showCommentBox , imageRef.current, imageUrl, imageUploaded]);

  const handleCommentSubmit = () => {
    const data = {
      image: imageUrl,
      comment,
      position,
    };
    console.log('dakkkkkkkkkta', data);
    axios.put(`http://localhost:3000/api/v0/comment/${commentResponse._id}`, data )
    
   
    setShowCommentBox(false);
    setComment('');
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="file"
          // onChange={(e) => {
          //   setImageUploaded(e.target.files![0]);
          // }}
          onChange={handleImageChange}
        />
        <button
          style={{
            width: '100px',
            height: '40px',
            backgroundColor: 'blue',
            color: 'white',
            cursor: 'pointer',
            marginTop: '20px',
          }}
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      {imageUrl && (
        <div>
          <img ref={imageRef} src={imageUrl} alt="Uploaded Image" 
         
          
          />
        </div>
      )}
      {showCommentBox && position && (
        <div
          style={{
            position: 'absolute',
            top: `${position.y}px`,
            left: `${position.x}px`,
            backgroundColor: '#fff',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Submit Comment</button>
        </div>
      )}
    </div>
  );
};

export default Select;
