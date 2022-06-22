import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import List from './List'
import { createList } from '../../features/lists/lists';

const AllLists = ({ boardId }) => {
  const dispatch = useDispatch();

  const lists = useSelector((state) => state.lists).filter(list => list.boardId === boardId);
  const [showListForm, setShowListForm] = useState(false);
  const [inputFormValue, setInputFormValue] = useState('');

  const listFormClass = showListForm ? 'new-list selected' : 'new-list';

  const handleToggleListForm = (e) => {
    if (e.target.tagName === 'INPUT' && showListForm) {
      return
    }
    setShowListForm(!showListForm);
  }

  const handleFormInput = (e) => {
    setInputFormValue(e.target.value)

  }

  const handleSubmitListForm = (e) => {
    const newList = {
      boardId: id,
      list: {
        title: inputFormValue
      }
    }

    dispatch(createList(newList));

    setInputFormValue('');
  }

  return (
    <>
        <div id="list-container" className="list-container">
          <div id="existing-lists" className="existing-lists">
            {lists.map(list => {
              return <List list={list} />
            })}
          </div>
          <div id="new-list" className={listFormClass} onClick={handleToggleListForm}>
            <span>Add a list...</span>
            <input type="text" onChange={handleFormInput} value={inputFormValue} placeholder="Add a list..." />
            <div>
              <input type="submit" className="button" value="Save" onClick={handleSubmitListForm} />
              <i className="x-icon icon" onClick={handleToggleListForm}></i>
            </div>
          </div>
        </div>
    </>

  )
}

export default AllLists;