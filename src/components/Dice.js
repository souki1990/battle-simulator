
import React, { memo } from "react";
import { v4 as uuidv4 } from 'uuid';


const Dice = (props) => {

    return (
        <div key={uuidv4()} className={`${props.animation} dice dice_${props.dice}`}></div>
    )


}

export default memo(Dice)