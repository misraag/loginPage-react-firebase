import React, { useEffect, useState } from "react";
import styles from './Home.module.css';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function Home ({user, handleLogout}) {

    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const userImageCollection = `images_${user.uid}`;

    const handleFileChange = (e) => {
        setSelectedImage(e.target.files[0]);
    }

    const handleLogoutClick = () => {
        handleLogout();
    }

    const handleImageUpload = async () => {
        try {
            if(selectedImage) {
                const storageRef = firebase.storage().ref(`/${userImageCollection}/${selectedImage.name}`);
                await storageRef.put(selectedImage);
                const downloadURL = await storageRef.getDownloadURL();
                await firebase.firestore().collection(userImageCollection).add({
                    url: downloadURL,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
            } else {
                console.log("No image is selected for upload");
            }
        } catch (error) {
            console.log("Image upload error: ", error.message);
        }
    }

    const fetchImages = async () => {
        try {
            console.log("Fetching images for UID: ", user.uid);
            const snapshot = await firebase.firestore().collection(userImageCollection).orderBy('timestamp', 'desc').get();
            const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
            console.log('fetched images: ', data);
            setImages(data);

        } catch (error) {
            console.log("Fetch Images Error: ", error.message);
        }
    }

    const fetchInitialImages = async () => {
        //fetch already uploaded images 
        await fetchImages();
    }

    useEffect( () => {

        //Subscribe to real-time updates
        const unsubscribe = firebase.firestore().collection(userImageCollection).orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            const data  = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
            setImages(data);
        })

        fetchInitialImages();

        return () => unsubscribe();
    }, [user, userImageCollection]);

    return(
        <div className="Home">
            <nav>
                <h1>WELCOME TO YOUR GALLERY</h1>
                <input type="file" accept="image/*" onChange={(handleFileChange)}/>
                <button onClick={handleImageUpload}>Upload</button>
                <button onClick={handleLogoutClick}>Logout</button>
            </nav>
            
            <div className={styles.imagesection}>
                {images.map((image) => (
                    <div className={styles.singleimage} key={image.id}>
                        <img src={image.url} alt={`User Uploaded ${image.id}`} />   
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;