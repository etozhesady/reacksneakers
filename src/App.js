import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios/";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://61881df0057b9b00177f9bbb.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://61881df0057b9b00177f9bbb.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://61881df0057b9b00177f9bbb.mockapi.io/cart", obj);
    setCartItems([...cartItems, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://61881df0057b9b00177f9bbb.mockapi.io/cart/${id}`);
    console.log(id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = (obj) => {
    axios.post("https://61881df0057b9b00177f9bbb.mockapi.io/favs", obj);
    setFavorites([...cartItems, obj]);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened ? (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      ) : null}

      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
