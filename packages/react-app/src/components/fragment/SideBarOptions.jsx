import React, { useRef } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function SideBarOptions(props) {
  const Icon = props.Icon;
  const title = props.title;
  const className = props.className;
  const sideBarRef = useRef();
  const href = props.href;
  return (
    <Button
      onClick={() => {
        sideBarRef.current.click();
      }}
      className={className}
    >
      <Link ref={sideBarRef} to={href}>
        <Icon />
        <p style={{ display: "block" }}> {title} </p>
      </Link>
    </Button>
  );
}

export default SideBarOptions;
