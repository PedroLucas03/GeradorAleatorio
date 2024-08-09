import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';

function App() {
  const [dogImage, setDogImage] = useState('');
  const [catImage, setCatImage] = useState('');
  const [error, setError] = useState('');

  const fetchDogImage = () => {
    const url = 'https://dog.ceo/api/breed/beagle/images/random';

    fetch(url)
      .then((r) => {
        if (!r.ok) {
          throw new Error('Erro ao buscar imagem de cachorro');
        }
        return r.json();
      })
      .then((data) => setDogImage(data.message))
      .catch((err) => setError(err.message));
  };

  const fetchCatImage = () => {
    const url = 'https://api.thecatapi.com/v1/images/search';

    fetch(url)
      .then((r) => {
        if (!r.ok) {
          throw new Error('Erro ao buscar imagem de gato');
        }
        return r.json();
      })
      .then((data) => setCatImage(data[0].url))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetchDogImage();
    fetchCatImage();
  }, []);

  return (
    <article>
      <h1>Imagens de Cachorros e Gatos Aleatórias</h1>
      {error && <p className='error'>{error}</p>}
      <div className='imagem'>
        <h2>Cachorro</h2>
        <img src={dogImage} alt="Imagem Aleatória de Cachorro" />
        <div className='botao'>
          <button className='botao' onClick={fetchDogImage}>Nova Imagem</button>
        </div>
      </div>
      <div className='imagem'>
        <h2>Gato</h2>
        <img src={catImage} alt="Imagem Aleatória de Gato" />
        <div className='botao'>
          <button onClick={fetchCatImage}>Nova Imagem</button>
        </div>
      </div>
    </article>
  );
}

export default App;
