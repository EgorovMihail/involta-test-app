import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ButtonsPrimary from "../Buttons/Buttons";
import style from "../Input/InputFromFile.module.sass";
import classNames from "classnames";
import Stage from "../Stage/Stage";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { CheckCircle } from "@mui/icons-material";

//======stepper
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#F3EEEE",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#F3EEEE",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#b4afaf",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#b4afaf",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#F3EEEE",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#F3EEEE",
    zIndex: 1,
    fontSize: 20,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <CheckCircle className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};
//=====stepper

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
            <Stage>
              <Stack sx={{ width: "100%" }} spacing={4}>
                <Stepper
                  alternativeLabel
                  activeStep={stepNumber}
                  connector={<QontoConnector />}
                >
                  {steps.map((currentStep) => {
                    const label = currentStep.props.stepName;
                    return (
                      <Step key={label}>
                        <StepLabel
                          StepIconComponent={QontoStepIcon}
                        ></StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Stack>
              {/* <Stepper activeStep={stepNumber}>
                {steps.map((currentStep) => {
                  const label = currentStep.props.stepName;
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper> */}
            </Stage>

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
