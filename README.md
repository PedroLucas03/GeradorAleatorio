Documentação do código do projeto em React com integração de uma API

Gerando Imagens Aleatórias de Cachorros e Gatos

Este projeto React é um aplicativo que exibe imagens aleatórias de cachorros e gatos, obtidas de APIs externas. O objetivo é demonstrar a integração com APIs e a manipulação de estados e efeitos colaterais em um componente funcional React. O usuário pode atualizar as imagens clicando nos botões correspondentes.
O componente importa o React e os hooks useEffect e useState da biblioteca react. Também importa dois arquivos de estilo CSS, App.css e index.css, para estilizar o componente.
import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';

Utilizei o hook useState para gerenciar três estados:
•	dogImage: armazena a URL da imagem aleatória do cachorro.
•	catImage: armazena a URL da imagem aleatória do gato.
•	error: armazena mensagens de erro, caso ocorra algum problema ao buscar as imagens.
  const [dogImage, setDogImage] = useState('');
  const [catImage, setCatImage] = useState('');
  const [error, setError] = useState('');

fetchDogImage: Esta função faz uma requisição para a API https://dog.ceo/api/breed/beagle/images/random para obter uma imagem aleatória de um cachorro da raça Beagle. Se a resposta for bem-sucedida, a URL da imagem é armazenada em dogImage. Caso contrário, a mensagem de erro é armazenada em error.
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

fetchCatImage: Semelhante à função acima, esta função faz uma requisição para a API https://api.thecatapi.com/v1/images/search para obter uma imagem aleatória de um gato. Armazena a URL da imagem em catImage ou a mensagem de erro em error.


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

Utilizei o hook useEffect para chamar as funções fetchDogImage e fetchCatImage quando o componente é montado pela primeira vez. 
  useEffect(() => {
    fetchDogImage();
    fetchCatImage();
  }, []);

O método render do componente retorna um JSX que define a estrutura visual:
•	Um título principal.
•	Uma mensagem de erro, se houver.
•	Dois blocos para exibir as imagens dos cachorros e gatos, cada um com um botão para atualizar a imagem.

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
