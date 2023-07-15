import AddBtn from "../AddBtn/AddBtn";
import Input from "../Input/Input";
import style from "./List.module.css";
// eslint-disable-next-line react/prop-types
const List = ({displayItem,dataSwapHandler,complitedTaskHandler,deleteItemHendler,editItemHandler,cancleHandler,itemListUpdatehandler,saveHandler}) => {
  // eslint-disable-next-line react/prop-types
  const finalList = displayItem.map((data, index) => {
    return (
      <li
        key={index}
        className={style.list}
        style={{ background: data.isDone == true ? "lightpink" : "" }}
      >
        {!data.isEditing && (
          <>
            {data.name}
            <span className={style.btns}>
              <AddBtn
                isDisable={data.isDone}
                btnLable="Edit"
                onClickHandler={() => editItemHandler(index)}
              />
            </span>
          </>
        )}
        {data.isEditing && (
          <>
            <Input
              updateValue={data.editableName}
              onChangeHandler={(value) => itemListUpdatehandler(index,value)}
            />
            <span className={style.btns}>
              <AddBtn
                isDisable={data.isDone}
                btnLable="Save"
                onClickHandler={() => saveHandler(index)}
              />
            </span>
            <span className={style.btns}>
              <AddBtn
                btnLable="Cancle"
                onClickHandler={() => cancleHandler(index)}
              />
            </span>
          </>
        )}

        <span className={style.btns}>
          <AddBtn
            isDisable={index == 0}
            btnLable="Up"
            onClickHandler={() => dataSwapHandler(index, index - 1)}
          />
        </span>
        <span className={style.btns}>
          <AddBtn
            // eslint-disable-next-line react/prop-types
            isDisable={index == displayItem.length - 1}
            btnLable="Down"
            onClickHandler={() => dataSwapHandler(index, index + 1)}
          />
        </span>
        {!data.isDone && (
          <span className={style.btns}>
            <AddBtn
              btnLable="Done"
              onClickHandler={() => complitedTaskHandler(index)}
              isDisable={data.isEditing}
            />
          </span>
        )}
        {data.isDone && (
          <span className={style.btns}>
            <AddBtn
              btnLable="Delete"
              onClickHandler={() => deleteItemHendler(index)}
            />
          </span>
        )}
      </li>
    );
  });
  return (
    <div>
      <ul className={style.lists}>{finalList}</ul>
    </div>
  );
};
export default List;
