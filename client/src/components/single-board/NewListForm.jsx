import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import createList from "../../features/lists/lists";

const NewListForm = () => {
  const { value: title, bind: bindTitle } = useInput("");

  const dispatch = useDispatch();

  const addList = useCallback(
    (newList, callback) => {
      dispatch(createList(newList, callback));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      const newList = { title };
      addList(newList, props.onCloseClick(new Event("click")));
    },
    [addList, props, title]
  );

  return (
    <div>
    <header>
      <span>Create List</span>
      <a
        href="#"
        className="icon-sm icon-close"
        onClick={props.onCloseClick}
      ></a>
    </header>
    <div className="content">
      <form onSubmit={handleSubmit}>
        <dl>
          <dt>Title</dt>
          <dd>
            <input
              type="text"
              placeholder='Like "Publishing Calendar"...'
              value={title}
              {...bindTitle}
            />
          </dd>
        </dl>
        <button className="button" type="submit">
          Create
        </button>
      </form>
    </div>
  </div>
  )
}