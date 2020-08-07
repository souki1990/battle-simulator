
import React, { useEffect, memo } from "react";
import Dice from "./Dice"
import { v4 as uuidv4 } from 'uuid';

import ProgressBar from 'react-bootstrap/ProgressBar'

const Player = (props) => {

    useEffect(() => {
        console.log("Render", props.name)
    })

    return (
        <div className={props.className}>
            <h1>{props.name}</h1>
            <h1>{props.score}</h1>
            <ProgressBar striped variant={props.color === "red" ? "warning" : "info"} now={props.score} />
            {props.dices &&
                <>
                    <Dice animation="shake_dice_reverse" key={uuidv4()} dice={props.dices[0]} />
                    <Dice animation="shake_dice" keykey={uuidv4()} dice={props.dices[0]} />
                </>}
        </div>

    )


}

export default memo(Player);