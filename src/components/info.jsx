import React from 'react';
import AppContext from "../context";

import arrBtn from './img/arr-btn.svg'

const Info = ({title, image, description}) => {
    const {setCartOpened} = React.useContext(AppContext);
    const [isOrder, setIsOrder] = React.useState(false);
    const [isOrders, setIsOrders] = React.useState(false);

    const onClickOrder = () => {
        setIsOrder(true);
    };
    const onClickOrders = () => {
        setIsOrders(true);
    };

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src={image} alt="Empty"/>
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className="greenButton cu-p">
                <img src={arrBtn} alt="ArrBtn"/>
                Вернуться назад
            </button>
        </div>
    );
};

export default Info;