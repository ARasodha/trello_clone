import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from './Card';
import { createCard } from '../../features/cards/cards';

const AllCards = ({ listId, handleShowCardForm, showCardForm }) => {
  const [cardTitle, setCardTitle] = useState('');
  const cards = useSelector(state => state.cards).filter(card => card.listId === listId);

  const handleChangeTitle = (e) => {
    setCardTitle(e.target.value);
    console.log('handle change title', cardTitle);
  }

  const dispatch = useDispatch();

  const handleAddCard = (e) => {
    const newCard = { listId, card: { title: cardTitle} };
    dispatch(createCard(newCard, handleShowCardForm));
  }

  return (
    <>
      <div className="add-dropdown add-top">
      <div className="card"></div>
      <a className="button">Add</a>
      <i className="x-icon icon"></i>
      <div className="add-options">
        <span>...</span>
      </div>
      </div>
      <div id="cards-container" data-id="list-1-cards">
      {cards.map(card => {
        return <Card card={card} />
      })}
      </div>
      <div className={showCardForm ? "add-dropdown add-bottom active-card" : "add-dropdown add-bottom"}>
      <div className="card">
        <div className="card-info"></div>
        <textarea name="add-card" value={cardTitle} onChange={handleChangeTitle}></textarea>
        <div className="members"></div>
      </div>
      <a className="button" onClick={handleAddCard}>Add</a>
      <i className="x-icon icon" onClick={handleShowCardForm}></i>
      <div className="add-options">
        <span>...</span>
      </div>
      </div>
      <div className="add-card-toggle" data-position="bottom" onClick={handleShowCardForm}>
      Add a card...
      </div>
    </>
  ) 
}

export default AllCards;