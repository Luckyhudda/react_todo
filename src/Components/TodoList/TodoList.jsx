import { useEffect, useState } from "react";
import AddBtn from "../AddBtn/AddBtn";
import Input from "../Input/Input";
import List from "../List/List";
import style from './TodoList.module.css'

const itemList = "todoKey";

const TodoList = () => {
  const [item, setItem] = useState([]);
  const [text, setText] = useState("");

  
  useEffect(() => {
    const initData = JSON.parse(localStorage.getItem(itemList)) || [];
    setItem(initData);
  },[]);

  useEffect(() => {
    localStorage.setItem(itemList, JSON.stringify(item));
  }, [item]);
  
  const updateText = (onChangeValue) => setText(onChangeValue);
  const updateItem = () => {
    if (text && text.trim()) {
      setItem([...item, {name:text, editableName:text, isDone: false,isEditing:false}]);
    }
    setText("");
  };

  // update data with Enter Key 
   const clickEnter = (e)=>{
    if(e.key === 'Enter'){
      updateItem();
    }
   };

   // swaping
   const dataSwap = (initIndex,swapIndex) =>{
    let items = [...item];
    [items[initIndex], items[swapIndex]] = [items[swapIndex], items[initIndex]];
    setItem(items);
   };
   const taskCompleted = (index)=>{
     let items = [...item];
   items[index].isDone = true;
   setItem(items);
   };

   const deleteTask = (index) =>{
    let items = [...item];
    items.splice(index,1);
    setItem(items);
   };

   // clear all item from list
   const clearAllHandler = () => {
    setItem([]);
   };

   // remove done items from list
   const removeDoneHandler = () => {
    let items = [...item];
   const newItem = items.filter((item)=>{
      return item.isDone == false;
    })
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
   const itemlistchangeHandler = (index,value) => {

    let items = [...item]
    item[index].editableName = value;
    setItem(items);
   }; 
   const saveEditValue = (index) =>{
    let items = [...item];
    item[index].name = items[index].editableName;
     items[index].isEditing = false;
    setItem(items)
   }

 

  return (
    <div className={style.mainBox}>
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
      <AddBtn
        isDisable={item.length <= 0}
        onClickHandler={clearAllHandler}
        btnLable="Clear all"
      />
      <AddBtn
        onClickHandler={removeDoneHandler}
        btnLable="Remove done item"
      />
      <List
        displayItem={item}
        dataSwapHandler={dataSwap}
        complitedTaskHandler={taskCompleted}
        deleteItemHendler={deleteTask}
        editItemHandler={editItem}
        cancleHandler={cancleEdit}
        itemListUpdatehandler={itemlistchangeHandler}
        saveHandler={saveEditValue}
      />
    </div>
  );
};
export default TodoList;
