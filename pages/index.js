import ButtonsPrimary from "./components/Buttons/Buttons";
import FormConteiner from "./components/FormContainer/FormContainer";
import Title from "./components/Title/Title";
import Stage from "./components/Stage/Stage";
import FormComponent from "./components/FormComponent/FormComponent";
import { Input } from "./components/Input/Input";
import { useRouter } from "next/router";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import styles from "../styles/Home.module.sass";
import MultiStep, { FormStep } from "./components/MultiStep/MultiStep";
import { InputFromFile } from "./components/Input/InputFromFile";
import parsePhoneNumberFromString, {
  parsePhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";

// ====== валидация  для 1 шага=====
const validatePersonalInformation = Yup.object().shape({
  lastName: Yup.string()
    .matches(/^([^0-9]*)$/, "Фамилия не должно содержать цифры")
    .min(2, "Слишком короткая фамилия!")
    .max(50, "Слишком длинная фамилия!")
    .required("Это поле является обязателным!"),
  firstName: Yup.string()
    .matches(/^([^0-9]*)$/, "Имя не должно содержать цифры")
    .min(2, "Слишком короткое имя!")
    .max(50, "Слишком длинное имя!")
    .required("Это поле является обязателным!"),
  patronymic: Yup.string()
    .matches(/^([^0-9]*)$/, "Отчество не должно содержать цифры")
    .min(2, "Слишком короткое отчество!")
    .max(50, "Слишком длинное отчество!")
    .required("Это поле является обязателным!"),
});
// ====== валидация  для 2 шага=====
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validateСontactInformation = Yup.object().shape({
  tel: Yup.string()
    .test(
      "oneOfRequired",
      "Хотя бы одно поле должно быть заполнено! ",
      function (item) {
        return this.parent.tel || this.parent.email;
      },
    )
    .min(10, "Слишком  кароткий номер!")
    .max(10, "Слишком короткий номер!")
    .matches(phoneRegExp, "Номер введен неправильно"),
  email: Yup.string()
    .test(
      "oneOfRequired",
      "Хотя бы одно поле должно быть заполнено! ",
      function (item) {
        return this.parent.tel || this.parent.email;
      },
    )
    .email("Email должен иметь корректный формат!")
    .min(2, "Слишком короткая фамилия!")
    .max(50, "Слишком длинная фамилия!"),
});

// ====== валидация  для 3 шага=====
const validateUserPhoto = Yup.object().shape({
  file: Yup.array()
    .of(
      Yup.object()
        .shape({
          file: Yup.mixed()
            .test("fileSize", "Размер файла больше 10 Мб!", (value) => {
              if (!value) return false;
              return value.size < 20000;
            })
            .required(),
          type: Yup.string()
            .oneOf(
              ["image/png", "image/jpeg"],
              "Добавьте файл с правильным форматом!",
            )
            .required(),
          name: Yup.string().required(),
        })
        .typeError("Добавьте файл!"),
    )
    .required("Добавте свою фотографию!"),
});

const normolizePhoneNumber = (value) => {
  console.log(value);

  const phoneNumber = parsePhoneNumber(value);
  console.log("phoneNumber: ", phoneNumber);
  if (!phoneNumber) {
    //return setValue(value);
    console.log(value);
    //return value;
    //return console.log(value);
  } else {
    //setValue(phoneNumber.formatInternational());
    console.log(phoneNumber.formatInternational());

    //return phoneNumber.formatNational();
  }
};
const test = (event) => {
  event.target.value = normolizePhoneNumber(event.target.value);
};

export default function Home() {
  return (
    <div className={styles.container}>
      <FormConteiner>
        <div className={styles.conteiner__form}>
          <MultiStep
            initialValues={{
              lastName: "",
              firstName: "",
              patronymic: "",
              email: "",
              tel: "",
              file: [],
            }}
          >
            {/* первый шаг  */}
            <FormStep
              stepName="personalInformation"
              onSubmit={() => console.log("step1 submit")}
              validationSchema={validatePersonalInformation}
            >
              <div className={styles.form__content}>
                <div className="input__wrap">
                  <Title text="Личная информация"></Title>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Фамилия"
                    name="lastName"
                  ></Input>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Имя"
                    name="firstName"
                  ></Input>
                  <Input
                    id="patronymic"
                    type="text"
                    placeholder="Отчество"
                    name="patronymic"
                  ></Input>
                </div>
              </div>
            </FormStep>

            {/* второй шаг  */}
            <FormStep
              stepName="contactInformation"
              onSubmit={() => console.log("step2 submit")}
              validationSchema={validateСontactInformation}
            >
              <div className={styles.form__content}>
                <div id="input__wrap" className="input__wrap">
                  <Title text="Контактная информация"></Title>
                  {/* <input
                    id="tel"
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    name="tel"
                    onChange={(event) => {
                      event.target.value = normolizePhoneNumber(
                        event.target.value,
                      );
                    }}
                  /> */}
                  <Input
                    id="tel"
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    name="tel"
                    // onchangeMy={(value) => {
                    //   normolizePhoneNumber(value);
                    // }}
                    //onchange={(event) => event}
                    // onсhange={(event) =>
                    //   console.log(event.target.value)(
                    //     (event.target.value = normolizePhoneNumber(
                    //       event.target.value,
                    //     )),
                    //   )
                    // }
                    //   event.target.value,}
                    //onChange={(event) => test(event)}
                    // (event) => {
                    // event.target.value = normolizePhoneNumber(
                    //   event.target.value,
                    // );
                    // event.target.value = "test";
                    // console.log(event.target.value);

                    //setValue(event.target.value);
                    // }}
                  ></Input>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    name="email"
                  ></Input>
                </div>
              </div>
            </FormStep>

            {/* третий  шаг  */}
            <FormStep
              stepName="userPhoto"
              onSubmit={() => console.log(formik.errors)}
              validationSchema={validateUserPhoto}
            >
              <div className={styles.form__content__step}>
                <div id="input__wrap" className="input__wrap">
                  <Title text="Фотография"></Title>

                  {/* <InputFromFile></InputFromFile> */}
                </div>
              </div>
            </FormStep>
          </MultiStep>
        </div>
      </FormConteiner>
    </div>
  );
}
