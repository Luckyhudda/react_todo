/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AddBtn from "../AddBtn/AddBtn";
import Input from "../Input/Input";
import List from "../List/List";
import style from "./TodoList.module.css";
import ModalBox from "../ModalBox/ModalBox";

const itemList = "todoKey";

const TodoList = () => {
  const [item, setItem] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const initData = JSON.parse(localStorage.getItem(itemList)) || [];
    setItem(initData);
  }, []);

  useEffect(() => {
    localStorage.setItem(itemList, JSON.stringify(item));
  }, [item]);

  const updateText = (onChangeValue) => setText(onChangeValue);
  const updateItem = () => {
    if (text && text.trim()) {
      setItem([
        ...item,
        {
          name: text,
          editableName: text,
          isDone: false,
          isEditing: false,
          isSearch: true,
        },
      ]);
    }
    setText("");
  };

  // update data with Enter Key
  const clickEnter = (e) => {
    if (e.key === "Enter") {
      updateItem();
    }
  };

  // swaping
  const dataSwap = (initIndex, swapIndex) => {
    let items = [...item];
    [items[initIndex], items[swapIndex]] = [items[swapIndex], items[initIndex]];
    setItem(items);
  };
  const taskCompleted = (index) => {
    let items = [...item];
    items[index].isDone = true;
    setItem(items);
  };

  const deleteTask = (index) => {
    let items = [...item];
    items.splice(index, 1);
    setItem(items);
  };

  // clear all item from list
  const clearAllHandler = () => {
    setItem([]);
  };

  // remove done items from list
  const removeDoneHandler = () => {
    let items = [...item];
    const newItem = items.filter((item) => {
      return item.isDone == false;
    });
    setItem(newItem);
  };

  // edit & update item from list
  const editItem = (index) => {
    let items = [...item];
    items[index].isEditing = true;
    setItem(items);
  };

  // cancle editing task ...
  const cancleEdit = (index) => {
    let items = [...item];
    const preName = items[index].name;
    items[index].editableName = preName;
    items[index].isEditing = false;
    setItem(items);
  };

  // update item list onchange
  const itemlistchangeHandler = (index, value) => {
    let items = [...item];
    item[index].editableName = value;
    setItem(items);
  };
  const saveEditValue = (index) => {
    let items = [...item];
    item[index].name = items[index].editableName;
    items[index].isEditing = false;
    setItem(items);
  };
  const onSearchHandler = (e) => {
    let Evalue = e.target.value;
    console.log(Evalue);
    const items = [...item];
    if (Evalue.trim().length !== 0) {
      for (let key of items) {
        console.log(key.name);
        if (!key.name.includes(Evalue)) {
          key.isSearch = false;
        } else {
          key.isSearch = true;
        }
      }
      setIsSearching(true);
      setItem(items);
    } else if (Evalue.trim().length === 0) {
      for (let key of items) {
        key.isSearch = true;
      }
      setIsSearching(false);
      setItem(items);
    }
  };

  return (
    <div className={style.mainBox}>
      <div className={`container mt-4  ${style.gridContainer}`}>
        <div className={`${style.gridItem}`}>
          <Input
            onChangeHandler={updateText}
            updateValue={text}
            enterKeyHandler={clickEnter}
          />
          <AddBtn
            isDisable={!text}
            onClickHandler={updateItem}
            btnLable="add to list"
          />

          <ModalBox
            onClickHandler={clearAllHandler}
            modalBody="Are you sure Delete all tasks ?"
            modalTitle="Clear All"
            btnName="Clear All"
            isDisable={item.length <= 0}
          />
          <ModalBox
            onClickHandler={removeDoneHandler}
            modalBody="Are you sure remove done tasks ?"
            modalTitle="Remove completed Tasks"
            btnName="Remove done item"
            isDisable={
              !(
                item.length && item.reduce((acc, el) => acc || el.isDone, false)
              )
            }
          />
        </div>
      </div>

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 col-12">
            <input
              type="text"
              className={`form-control ${style.searchBar}`}
              placeholder="Search item..."
              onChange={(e) => onSearchHandler(e)}
            />
          </div>
        </div>
      </div>
      <List
        displayItem={item}
        dataSwapHandler={dataSwap}
        complitedTaskHandler={taskCompleted}
        deleteItemHendler={deleteTask}
        editItemHandler={editItem}
        cancleHandler={cancleEdit}
        itemListUpdatehandler={itemlistchangeHandler}
        saveHandler={saveEditValue}
        search={search}
        isSearching={isSearching}
      />
    </div>
  );
};
export default TodoList;
