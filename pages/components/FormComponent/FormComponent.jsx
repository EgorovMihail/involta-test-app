import style from "./FormComponent.module.sass";

export default function Form({ children, ...props }) {
  return <div className={style.wrap}>{children}</div>;
}
