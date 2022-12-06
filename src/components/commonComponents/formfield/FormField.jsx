import React from "react";
import { ErrorMessage } from "formik";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

const FormField = (props) => {
  const disableField =
    props.disableField !== undefined ? props.disableField : false;
  const typeData = props.type !== undefined ? props.type : "text";
  const outputClassName =
    props.outputClassName !== undefined ? props.outputClassName : "";
  return (
    <FormControl
      fullWidth
      className="form-group"
      variant="outlined"
      disabled={disableField}
    >
      <InputLabel className="form-label" htmlFor={props.id}>
        {props.label}
        {!props.optional && <span className="text-danger">*</span>}
      </InputLabel>
      <OutlinedInput
        className={outputClassName}
        id={props.id}
        name={props.id}
        value={props.value}
        type={typeData}
        inputProps={{
          "aria-required": props.ariaRequired ? props.ariaRequired : "true",
          // role: "input",
          "aria-invalid": "false",
          "aria-label": props.ariaLabel,
        }}
        disabled={disableField}
        onChange={props.onChange}
        onBlur={props.onBlur}
        error={props.error}
        readOnly={props.readOnly ? true : false}
        // autoComplete={props.autoCompleteOff ? 'new-password' : "" }
      />
      {props.touched && props.errormessage ? (
        <>
          <div className="text-danger" role="alert">
            {/* <Error className="errorIcon" /> */} {props.errormessage}
          </div>
        </>
      ) : (
        <ErrorMessage component="div" name={props.id} className="text-danger" />
      )}
    </FormControl>
  );
};

export default FormField;
