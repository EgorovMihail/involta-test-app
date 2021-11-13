import style from "./Buttons.module.sass";

export default function ButtonsPrimary(props) {
  //console.log(props.submitError);
  return (
    <div className={style.button__wrap}>
      <button onClick={props.click} type="submit" className={style.buttons}>
        {props.isLastStep ? "Отправить" : "Далее"}
      </button>
    </div>
  );
}
