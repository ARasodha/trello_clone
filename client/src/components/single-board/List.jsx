import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import { fetchBoard } from "../../features/boards/boards";
import Card from './Card'

const List = ({ list }) => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const cards = useSelector(state => state.cards).filter(card => card.boardId === id);

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch, id])
  console.log('Cards component cards', cards)
  return (
    <div className="list-wrapper">
              <div className="list-background">
                <div className="list">
                  <a className="more-icon sm-icon" href=""></a>
                  <div>
                    <p className="list-title">{list.title}</p>
                  </div>
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
                  <div className="add-dropdown add-bottom">
                    <div className="card">
                      <div className="card-info"></div>
                      <textarea name="add-card"></textarea>
                      <div className="members"></div>
                    </div>
                    <a className="button">Add</a>
                    <i className="x-icon icon"></i>
                    <div className="add-options">
                      <span>...</span>
                    </div>
                  </div>
                  <div className="add-card-toggle" data-position="bottom">
                    Add a card...
                  </div>
                </div>
              </div>
            </div>
  )
}

export default List;