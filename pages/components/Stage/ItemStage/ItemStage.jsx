import React, { createElement } from "react";
import style from "./ItemStage.module.sass";

export default function ItemStage({ children, ...props }) {
  console.log(props);
  const classes = style.item__stage + " " + style.item__stage__active;
  const classesStyle = style.item__stage;
  const test = style.item__stage + " " + props.styleTest;

  return (
    <>
      <span id="spanStage" className={classesStyle}></span>
      {/* <span id="spanStage" className={test}></span>
      <span id="spanStage" className={classesStyle}></span> */}
    </>
  );
}
