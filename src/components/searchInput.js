import React from "react";

export default function SearchInput(props) {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e)}
      style={{marginRight:5}}
    />
  );
}
