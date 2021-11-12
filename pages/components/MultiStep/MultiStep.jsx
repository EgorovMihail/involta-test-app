import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ButtonsPrimary from "../Buttons/Buttons";
import style from "../Input/InputFromFile.module.sass";
import classNames from "classnames";
import { Step, StepLabel, Stepper } from "@material-ui/core";

//==== обработка файла
const getFileShema = (file) =>
  file && {
    file: file,
    type: file.type,
    name: file.name,
  };
const getArrErrorsMessages = (errors) => {
  const result = [];
  errors &&
    Array.isArray(errors) &&
    errors.forEach((value) => {
      if (typeof value === "string") {
        result.push(value);
      } else {
        Object.values(value).forEach((error) => {
          result.push(error);
        });
      }
    });
  console.log(result);
  return result;
};
const getError = (error) => {
  return (
    error && (
      <p key={error} className="error">
        {error}
      </p>
    )
  );
};

export default function MultiStep({ children, initialValues, onSubmit }) {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  console.log("steps: ", steps);

  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  console.log("step: ", step);
  //const totalSteps = step.length; //вот тут ошибка
  const totalSteps = 3; //вот тут ошибка

  const isLastStep = stepNumber === totalSteps - 1;
  console.log("isLastStep: ", isLastStep);

  // вот тут возможно Formikvalues(values:Formikvalues)
  const next = (values) => {
    setSnapshot(values);
    setStepNumber(stepNumber + 1);
  };
  // const errorsfunc = (er) => {
  //   console.log(er);
  //   getArrErrorsMessages(er).map((error) => getError(error));
  // };

  //тут могут быть ошибки 33,00
  const handleSubmit = async (values) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    if (isLastStep) {
      //return onSubmit(values, actions);

      console.log(JSON.stringify(formik.values, null, 2));

      return onSubmit(values);
    } else {
      //actions.setTouched({});
      next(values);
    }
  };

  //======== My Input
  const [preview, setPreview] = useState();
  const fieldInputRef = useRef();
  const [image, setImage] = useState();
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        //setTransition(true);
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      //setTransition(false);
      setPreview(null);
    }
  }, [image]);

  //======== My Input

  return (
    <div>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {(formik) => (
          <Form>
            <Stepper activeStep={stepNumber}>
              {steps.map((currentStep) => {
                const label = currentStep.props.stepName;
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {step}

            {step.key == 0.2 ? (
              <FieldArray
                name="file"
                render={(arrayHelpers) => (
                  <>
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
                        {/* ======= */}
                        <input
                          id="file"
                          className={classNames(style.input)}
                          ref={fieldInputRef}
                          accept="image/*"
                          name="file"
                          type="file"
                          onChange={(event) => {
                            const { files } = event.target;
                            const filePrev = event.target.files[0];
                            const file = getFileShema(files.item(0));

                            if (
                              filePrev &&
                              filePrev.type.substr(0, 5) === "image"
                            ) {
                              //setValues({ file });
                              setImage(filePrev);
                              //setTransition(true);
                            } else {
                              //setTransition(false);
                              setImage(null);
                            }

                            if (!file) {
                              arrayHelpers.remove(0);
                              //setImage(null);
                            }
                            if (Array.isArray(formik.values.file)) {
                              arrayHelpers.replace(0, file);
                            } else {
                              arrayHelpers.push(file);
                            }
                          }}
                        />

                        {getArrErrorsMessages(formik.errors.file).map((error) =>
                          getError(error),
                        )}
                      </div>
                    </div>
                  </>
                )}
              />
            ) : (
              <></>
            )}
            {/* возможно нужно дополнить */}

            <ButtonsPrimary
              //submitError={formik.errors.file}
              isLastStep={isLastStep}
            ></ButtonsPrimary>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export const FormStep = ({ stepName = "", children }) => children;
