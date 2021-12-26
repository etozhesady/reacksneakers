import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios/";

import Header from "./components/Header";
import Drawer from "./components/Drawer/index.js";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get("https://61881df0057b9b00177f9bbb.mockapi.io/items");
        const cartResponse = await axios.get("https://61881df0057b9b00177f9bbb.mockapi.io/cart");
        const favsResponse = await axios.get("https://61881df0057b9b00177f9bbb.mockapi.io/favs");

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favsResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://61881df0057b9b00177f9bbb.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post("https://61881df0057b9b00177f9bbb.mockapi.io/cart", obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://61881df0057b9b00177f9bbb.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://61881df0057b9b00177f9bbb.mockapi.io/favs/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post("https://61881df0057b9b00177f9bbb.mockapi.io/favs", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в закладки");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/reactsneakers"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />

          <Route path="/reactsneakers/favorites" exact element={<Favorites />} />
          <Route path="/reactsneakers/orders" exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
