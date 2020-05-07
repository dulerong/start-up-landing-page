import React, {useState, useEffect} from 'react';
import ImageCard from './components/ImageCard'
import ImageSearch from './components/ImageSearch'

function App() {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [term, setTerm] = useState('')

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=16235203-07d9daff3004aa82d6bc9f766&q=${term}&image_type=photo`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [term])

  return (
    <div className='container mx-auto'>
      <ImageSearch searchText={(text) => {setTerm(text)}}/>

      {!isLoading && images.length == 0 ? 'No images found!' : ""}

      {isLoading ? 'Please wait...' : <div className='grid grid-cols-3 gap-4'>
        {images.map((image, index) => (
          <ImageCard key={index} image={image}/>
        ))}
      </div>}
    </div>
  );
}

export default App;