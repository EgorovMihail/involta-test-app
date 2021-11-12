import { ErrorMessage, useField } from "formik";
import { forwardRef } from "react";
import style from "./Input.module.sass";
import classNames from "classnames";
import parsePhoneNumberFromString from "libphonenumber-js";

export const Input = forwardRef((props, ref) => {
  const [field, meta] = useField(props);
  //console.log(props);
  // const normolizePhoneNumber = (value) => {
  //   console.log(props.onchange);

  //   const phoneNumber = parsePhoneNumberFromString(value);
  //   console.log("phoneNumber: ", phoneNumber);
  //   if (!phoneNumber) {
  //     return value;
  //   } else {
  //     console.log(phoneNumber);
  //     return phoneNumber.formatInternational();
  //   }
  // };

  return (
    <div className={style.input__wrap}>
      <input
        // onChange={(props.onChange)=> {

        //    props.onChange = normolizePhoneNumber(props.onChange)
        //   }}
        // onChange={(event) => {
        //   props.onchange(event);
        // }}
        // onChange={(onchange) => {
        //   console.log(onchange);
        //   props.onchange.target.value = normolizePhoneNumber(
        //     props.onchange.target.value,
        //   );
        // }}
        // onChange={(e) => {
        //   props.onchangeMy(e.target.value);
        // }}
        id={props.id}
        className={classNames(
          style.input,
          meta.error && meta.touched && style.invalid,
        )}
        {...field}
        {...props}
      />

      <ErrorMessage
        className={style.error__message}
        component="p"
        name={field.name}
      />
    </div>
  );
});
