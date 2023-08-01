/* eslint-disable react/prop-types */
import AddBtn from "../AddBtn/AddBtn";
import Input from "../Input/Input";
import ModalBox from "../ModalBox/ModalBox";
import style from "./List.module.css";
const List = ({
  displayItem,
  dataSwapHandler,
  complitedTaskHandler,
  deleteItemHendler,
  editItemHandler,
  cancleHandler,
  itemListUpdatehandler,
  saveHandler,
  isSearching,
}) => {
  const finalList = displayItem.map((data, index) => {
    return (
      <div className={style.listBox} key={index}>
        <li
          className={style.list}
          style={{
            display: data.isSearch == true ? "flex" : "none",
            background: data.isDone == true ? "lightpink" : "",
          }}
        >
          {!data.isEditing && (
            <>
              <span className={style.listName}>{data.name}</span>
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
              <span className={style.editInput}>
                <Input
                  updateValue={data.editableName}
                  onChangeHandler={(value) =>
                    itemListUpdatehandler(index, value)
                  }
                />
              </span>
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
              isDisable={index == 0 || isSearching}
              btnLable="Up"
              onClickHandler={() => dataSwapHandler(index, index - 1)}
            />
          </span>
          <span className={style.btns}>
            <AddBtn
              isDisable={index == displayItem.length - 1 || isSearching}
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
              <ModalBox
                btnName="Delete"
                onClickHandler={() => deleteItemHendler(index)}
                modalBody="You Wanna Delete This Task ?"
                modalTitle="Delete Task"
              />
            </span>
          )}
        </li>
      </div>
    );
  });
  return (
    <div className={`container ${style.containerStyle}`}>
      <ul className={`list-group ${style.lists}`}>{finalList}</ul>
    </div>
  );
};
export default List;
