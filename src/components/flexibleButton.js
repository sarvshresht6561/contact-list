import React from "react";
import { Button } from "@material-ui/core";

const FlexibleButton = (props) => {
  const { name, ...rest } = props;
  return (
    <>
      <Button {...rest}>{name}</Button>
    </>
  );
};

export default FlexibleButton;
