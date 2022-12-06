import React from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AutoCompleteMultiSelect(props) {
  return (
    <Autocomplete
      id={props.id}
      onChange={(event, values) => props.onChange(values)}
      onBlur={props.onBlur}
      size="small"
      fullWidth
      multiple
      options={props.options}
      value={props.defaultValue}
      getOptionLabel={(option) => option.value}
      disableCloseOnSelect
      limitTags={1}
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="outlined" />
      )}
      renderOption={(option, { inputValue, selected }) => {
        const matches = match(option.value, inputValue);
        const parts = parse(option.value, matches);
        //parts.map((part, index) => console.log(part));

        return (
          <div>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {parts.map((part, index) => (
              <span
                key={index}
                style={{ fontWeight: part.highlight ? 700 : 400 }}
              >
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
}
