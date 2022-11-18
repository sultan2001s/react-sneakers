import React from "react";
import Card from "../components/Card/Card";
import axios from "axios";
import AppContext from "../context";

function Orders({items=[]}) {
    const {onAddToCart, onAddToFavorite} = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https://63538f16ccce2f8c02f8df4f.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            } catch (error) {
                alert('Ошибка при запросе заказов')
            }
        })();
    }, []);

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои покупки</h1>
            </div>
            <div className="d-flex flex-wrap">
                {(isLoading
                    ? [...Array(12)]
                    : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Orders;