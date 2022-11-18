import React from "react";
import Card from "../components/Card/Card";


function Home({ items, searchValue, cartItems, onChangeSearchInput, onAddToFavorite, onAddToCart, setSearchValue, isLoading }) {

    const renderItems = () => {
        const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (
            isLoading
                ? [...Array(12)]
                : filtredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                // added={isItemAdded(item && item.id)}
                loading={isLoading}
                {...item}
            />
        ));
    };

    return (
        <div className="content p-40">
            <div className="swiper mb-40 d-flex">
                <div className="swiperLeft">
                    <img src="/img/icon-img.png" alt="icon-img"/>
                    <h2>Stan Smith, <span>Forever!</span></h2>
                    <button className="cu-p">Купить</button>
                </div>
                <div>
                    <img src="/img/sneakers-img.png" alt="sneakers-img"/>
                </div>
            </div>

            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue('')}
                            className="clear cu-p"
                            src="/img/btn-remove.svg"
                            alt="Clear"
                        />
                    )}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;