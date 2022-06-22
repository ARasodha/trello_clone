import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import { fetchBoard } from "../../features/boards/boards";
import { updateList } from "../../features/lists/lists";
import AllCards from './AllCards'

const List = ({ list }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const [toggleListTitle, setToggleListTitle] = useState(false);
  const [listTitle, setListTitle] = useState(list.title)

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch, id])

  const handleToggleListTitle = () => {
    setToggleListTitle(!toggleListTitle);
  }

  const handleUpdateListTitle = (e) => {
    setListTitle(e.target.value);
  }

  const handleListTitleSubmit = (e) => {
    if (e.key === 'Enter') {
    dispatch(updateList({id: list._id, newTitle: listTitle}));
    handleToggleListTitle();
    }
  }

  return (
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {toggleListTitle ? 
              <input className="list-title" value={listTitle} onChange={handleUpdateListTitle} onKeyPress={handleListTitleSubmit} /> :
            <p className="list-title" onClick={handleToggleListTitle}>{listTitle}</p>}
          </div>
          <AllCards listId={list._id} />
        </div>
      </div>
    </div>
  )
}

export default List;