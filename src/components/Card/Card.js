import React from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss';
import AppContext from "../../context";

import plusImg from '../img/btn-plus.svg'
import onChecked from '../img/btn-checked.svg'
import heartImg from '../img/heart-liked.svg'
import unlikedImg from '../img/heart-unliked.svg'

function Card({ id, onFavorite, imageUrl, title, price, onPlus, favorited = false, added = false, loading = false}) {
    const {isItemAdded} = React.useContext(AppContext);
    // const [isAdded, setIsAdded] = React.useState(added);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = {id, parentId: id, title, imageUrl, price};


    const onClickPlus = () => {
        onPlus(obj);

    };

    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
            {
                loading ?  <ContentLoader
                    speed={3}
                    width={160}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="0" y="0" rx="10" ry="10" width="160" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="160" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader> :
                    <>
                        {onFavorite && <div className={styles.favorite} onClick={onClickFavorite}>
                            <img className={isFavorite ? `${heartImg}` : `${unlikedImg}`} src={isFavorite ? `${heartImg}` : `${unlikedImg}`} alt="Unliked"/>
                        </div>}
                        <img width="100%" height={135} src={imageUrl} alt="Sneakers"/>
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>{price} руб.</b>
                            </div>
                            {onPlus && <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? `${onChecked}` : `${plusImg}` } alt="Plus"/>}
                        </div>
                    </>
            }

        </div>

    );
};

export default Card;