import React from 'react';

import '../index.css';

function Square(props) {
    return(
        <div id="field00" className={'field ' + props.color}>
                <img src="#" alt="" />
            </div>
    )
}


export default class Board extends React.Component {

    render()
    {
        const board = [];
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                if((i%2 + j%2)%2 == 0)
                {
                    row.push(<Square color="white" col={j} row={i} />)
                }
                else
                {
                    row.push(<Square color="black" col={j} row={i} />)
                }
                
            }
            board.push(row)
            
        }
        return(
            <div id="board">{board}</div>
        )
    }
    
}