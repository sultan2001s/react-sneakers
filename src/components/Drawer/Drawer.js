import React from 'react';
import axios from "axios";
import Info from '../info';
import {useCart} from '../../hooks/useCart'
import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
    const {cartItems, setCartItems, totalPrice} = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrder, setIsOrder] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://63538f16ccce2f8c02f8df4f.mockapi.io/orders', {
                items: cartItems
            });
            setOrderId(data.id);
            setIsOrder(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('%https://63538f16ccce2f8c02f8df4f.mockapi.io/basket%' + item.id);
                await delay(1000)
            }
        } catch (error) {
            // alert('Ошибка при создании заказа :(');
        }
        setIsLoading(false)
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">Корзина
                    <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove"/>
                </h2>

                {
                    items.length > 0 ?
                        <div className="basket d-flex flex-column flex">
                            <div className="items flex">
                                {items.map((obj) => (
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <div style={{ backgroundImage: `url(${obj.imageUrl})`}}
                                             className="cartItemImg ">
                                        </div>

                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img className={styles.removeBtn} onClick={() => onRemove(obj.id)} src="/img/btn-remove.svg" alt="Remove"/>
                                    </div>
                                ))}
                                <ul className="cartTotalBlock">
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{totalPrice / 100 * 5} руб.</b>
                                    </li>
                                    <button disabled={isLoading} className="greenButton" onClick={onClickOrder}>Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>
                                </ul>
                        </div>
                    </div> :
                        <Info title={isOrder ? "Заказ оформлен!" : "Корзина пустая"}
                              description={isOrder ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                              image={isOrder ? "/img/ordering.jpg" : "/img/empty-cart.jpg"} />
                }
            </div>
        </div>
    );
};

export default Drawer;