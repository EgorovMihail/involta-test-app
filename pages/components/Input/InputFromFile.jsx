import { forwardRef, useEffect, useRef, useState } from "react";
import style from "./InputFromFile.module.sass";
import classNames from "classnames";
import ButtonsPrimary from "../Buttons/Buttons";
import { useRouter } from "next/router";
//import { DataProvider, useData } from "../../DataContext";

export const InputFromFile = forwardRef((props, ref) => {
  //const { data, setValues } = useData();

  const router = useRouter();
  const [transition, setTransition] = useState(false);
  const transitionPage = () => {
    if (transition) {
      router.push("./result");
    }
  };

  const [preview, setPreview] = useState();
  const fieldInputRef = useRef();
  const [image, setImage] = useState();
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTransition(true);
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setTransition(false);
      setPreview(null);
    }
  }, [image]);

  const onSubmit = (values) => {
    transitionPage();
  };

  return (
    // <DataProvider>
    <div className={style.form__content}>
      <div className={style.input__wrap}>
        {preview ? (
          <img
            src={preview}
            className={style.imgPreview}
            onClick={() => {
              setImage(null);
            }}
          />
        ) : (
          <button
            className={style.button}
            onClick={(event) => {
              event.preventDefault();
              fieldInputRef.current.click();
            }}
          ></button>
        )}

        <input
          type="file"
          id="InputFile"
          name="InputFile"
          className={classNames(style.input)}
          ref={fieldInputRef}
          accept="image/*"
          // onChange={(event) => {
          //   const files = event.target.files;
          //   let myFiles = Array.from(files);
          //   formik.setFieldValue("file", myFiles);
          // }}
          onChange={(event) => {
            const file = event.target.files[0];
            // let myFiles = Array.from(files);
            // formik.setFieldValue("file", myFiles);
            console.log("file: ", file);

            if (file && file.type.substr(0, 5) === "image") {
              //setValues({ file });
              setImage(file);
              setTransition(true);
            } else {
              setTransition(false);
              setImage(null);
            }
          }}
        />
      </div>
      {/* <ButtonsPrimary click={() => onSubmit()} onwards="Далее"></ButtonsPrimary> */}
    </div>
    // </DataProvider>
  );
});
