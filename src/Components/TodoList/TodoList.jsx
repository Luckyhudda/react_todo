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
      setItem([...item, {name:text, isDone: false}]);
    }
    setText("");
  };

  // update data with Enter Key 
   const clickEnter = (e)=>{
    if(e.key === 'Enter'){
      updateItem()
    }
   }

   // swaping
   const dataSwap = (initIndex,swapIndex) =>{
    let items = [...item];
    [items[initIndex], items[swapIndex]] = [items[swapIndex], items[initIndex]];
    setItem(items)
   } 
   const taskCompleted = (index)=>{
     let items = [...item];
   items[index].isDone = true;
   setItem(items);
   }

   const deleteTask = (index) =>{
    let items = [...item];
    items.splice(index,1);
    setItem(items)
   }
  return (
    <div className={style.mainBox}>
      <Input
        onChangeHandler={updateText}
        updateValue={text}
        enterKeyHandler={clickEnter}
      />
      <AddBtn onClickHandler={updateItem} btnLable="add to list" />
      <List
        displayItem={item}
        dataSwapHandler={dataSwap}
        complitedTaskHandler={taskCompleted}
        deleteItemHendler={deleteTask}/>
    </div>
  );
};
export default TodoList;
