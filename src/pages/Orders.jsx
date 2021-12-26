import axios from 'axios'
import React from 'react'
import Card from "../components/Card"
import AppContext from '../context';

function Orders() {
  const {onAddToCart, onAddToFavorite} = React.useContext(AppContext)
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
  async function fetchOrders() {
    const { data } = await axios.get("https://61881df0057b9b00177f9bbb.mockapi.io/orders");
    setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
    setIsLoading(false)
  }
  fetchOrders()
  }, [])
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            Мои заказы
          </h1>
        </div>
        <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
              <Card key={index}
              loading={isLoading}
              {...item}
              />
            ))}
        </div>
      </div>
    )
}

export default Orders