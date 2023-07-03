import  style from './AddBtn.module.css'
// eslint-disable-next-line react/prop-types
const AddBtn = ({ onClickHandler, btnLable, isDisable }) => {
  const addToList = () => onClickHandler();

  return (
    <button className={style.btn} onClick={addToList} disabled={isDisable}>
      {btnLable}
    </button>
  );
};

export default AddBtn;
