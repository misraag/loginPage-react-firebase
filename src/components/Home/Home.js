import React, { useEffect, useState } from "react";
import styles from './Home.module.css';

function Home (user, handleLogout) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const userImageCollection = `images_${user.uid}`;

    const handleFileChange = (e) => {
        setSelectedImage(e.target.files[0]);
    }

    const handleLogoutClick = () => {
        handleLogout();
    }

    const handleImageUpload = () => {
        
    }

    useEffect( () => {

        //Subscribe to real-time updates

    },[user, userImageCollection]);

    return(
        <div className="Home">
            <nav>
                <h1>WELCOME TO YOUR GALLERY</h1>
                <input type="file" accept="image/*" onChange={(handleFileChange)}/>
                <button onClick={handleImageUpload}>Upload</button>
                <button onClick={handleLogoutClick}>Logout</button>
            </nav>
            
            <div>
                {images.map((image) => {
                    <div key={image.id}>
                        <img src="image.url" alt={`User Uploaded ${image.id}`} />   
                    </div>
                })}
            </div>
        </div>
    );
}

export default Home;