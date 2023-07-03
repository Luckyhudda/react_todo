import AddBtn from "../AddBtn/AddBtn";
import style from "./List.module.css";
// eslint-disable-next-line react/prop-types
const List = ({displayItem,dataSwapHandler,complitedTaskHandler,deleteItemHendler}) => {
  // eslint-disable-next-line react/prop-types
  const finalList = displayItem.map((data, index) => {
    return (
      <li
        key={index}
        className={style.list}
        style={{ background: data.isDone == true ? "lightpink" : "" }}
      >
        {data.name}
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
