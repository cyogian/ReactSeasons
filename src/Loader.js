import React from "react";

const Loader = props => {
  return (
    <div className="ui active dimmer">
      <div className="ui big text loader">
        <h3>{props.message}</h3>
      </div>
    </div>
  );
};

Loader.defaultProps = {
  message: "Loading..."
};

export default Loader;
