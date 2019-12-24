import './SeasonDisplay.css';
import React from 'react';
const seasonConfig = {
    summer  :   {
        text    :   "Let's hit the Beach!",
        iconName    :   "sun yellow",
        changeBackground : () => {
            document.querySelector("#root").setAttribute("class", "summer");
        }
    },
    winter  :   {
        text    :   "Burr, it's chilly!",
        iconName    :   "snowflake blue",
        changeBackground : () => {
            document.querySelector("#root").setAttribute("class", "winter");
        }
    }
};
const getSeason = (lat, month) => {
    if (month > 2 && month < 9) {
        return (lat > 0 ? "summer" : "winter");
    }
    else {
        return (lat > 0 ? "winter" : "summer");
    }
};
const SeasonDisplay = (props) => {
    const season  = getSeason(props.lat, new Date().getMonth());
    const {iconName, text} = seasonConfig[season];
    seasonConfig[season].changeBackground();
    return (
        <div className={`season-display ${season}`}>
            <i className={`icon-left massive icon ${iconName}`}></i>
            <h1>{ text }</h1>
            <i className={`icon-right massive icon ${iconName}`}></i>
        </div>
    );
};

export default SeasonDisplay;