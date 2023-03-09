import React from "react";
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([])
  useEffect(()=> {
    const params = {
      method: "flickr.photos.search",
      api_key: "4485a3097041ffdfca3af9e1a86de689",
      text: searchText,
      sort: "",
      per_page: 100,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
    //farm id => secret server
    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp)=> {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgData)=> {
        return fetchFlickrImageUrl(imgData, 'q');
      });
      setImageData(arr);
    }).catch((err)=> {
        console.log(`error ${err} occured while fetching data from API`); // 
    }).finally(()=> {
        console.log(`I am finally`);
    })
  }, [searchText]);
  const fetchFlickrImageUrl = (photo, size)=> {
    //farm66.staticflickr.com/server/id_
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size) {
      url += `_${size}`;
    }
    url += '.jpg';
    return url
  }
  return (
    <>
    <div id="mainDiv">
      <h1 className="SnapShot_heading" >Snapshot-App</h1>
    <input onChange={(e)=> {searchData.current = e.target.value} } id="mainInput" placeholder="Search here" />
    <button className="searchBtn" onClick={()=> {setSearchText(searchData.current)}}>Search</button>
    <section>
      <button className="defaultSearchBtn" onClick={()=> {setSearchText("mountains")}}>
        Mountains
      </button>
      <button className="defaultSearchBtn" onClick={()=> {setSearchText("beaches")}}>
        Beaches
      </button>
      <button className="defaultSearchBtn" onClick={()=> {setSearchText("birds")}}>
        Birds
      </button>
      <button className="defaultSearchBtn" onClick={()=> {setSearchText("food")}}>
        Food & Eateries
      </button>
    </section>
    </div> 
    <div id="image_container">
      <section className='imageContainer'>    
      {imageData.map((imageurl, key)=> {
        return (
          <article className='flickr_Image'>
            <img src={imageurl} key={key} alt="resultIMG" />
          </article>
        )
      })} 
  </section>
  </div>    
    </>
  );
}

export default App;