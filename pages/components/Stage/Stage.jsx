import React from "react";
import ItemStage from "./ItemStage/ItemStage";
import style from "./Stage.module.sass";

export default function Stage({ children, ...props }) {
  console.log(props);

  return (
    <div className={style.stage}>
      <ItemStage {...props}></ItemStage>
      <ItemStage></ItemStage>
      <ItemStage></ItemStage>
    </div>
  );
}
