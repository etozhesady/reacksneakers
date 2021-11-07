import React from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Drawer from './components/Drawer';

function App() {
  const [cartOpened, setCartOpened] = React.useState(false)
  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer  onClose={() => setCartOpened(false)} /> : null}
      <Header onClickCart={() => setCartOpened(true)}/>

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск" />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          <Card
            title="Абибас"
            price="1337"
            imageUrl="/img/sneakers/1.jpg"
            onClickFavorite={() => console.log('Добавили в закладки')}
            onClickPlus={() => console.log('Добавили в корзину')}
          />

        </div>

      </div>
    </div>
  );
}

export default App;