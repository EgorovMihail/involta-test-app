import style from "./Buttons.module.sass";

export default function ButtonsPrimary(props) {
  //console.log(props.submitError);
  return (
    // <button type="submit" onClick={props.click} className={style.buttons}>
    //   {/* {props.onwards} */}
    // </button>
    <button
      //onClick={() => console.log(props.submitError)}

      type="submit"
      className={style.buttons}
    >
      {props.isLastStep ? "Отправить" : "Далее"}
    </button>
  );
}
