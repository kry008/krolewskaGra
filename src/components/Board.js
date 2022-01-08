import React from 'react';
import '../index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            piece: "",
            player: "",
            image: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        };
    }

    componentDidMount() {
        if(this.props.row == 7 && (this.props.col == 0 || this.props.col == 7)) {
            this.setState({piece: "rook", player: 1, image: "img/biala_wieza.png"});
        } else if(this.props.row == 0 && (this.props.col == 0 || this.props.col == 7)) {
            this.setState({piece: "rook", player: 2, image: "img/czarna_wieza.png"});
        } else if(this.props.row == 7 && (this.props.col == 1 || this.props.col == 6)) {
            this.setState({piece: "knight", player: 1, image: "img/bialy_skoczek.png"});
        } else if(this.props.row == 0 && (this.props.col == 1 || this.props.col == 6)) {
            this.setState({piece: "knight", player: 2, image: "img/czarny_skoczek.png"});
        } else if(this.props.row == 7 && (this.props.col == 2 || this.props.col == 5)) {
            this.setState({piece: "bishop", player: 1, image: "img/bialy_goniec.png"});
        } else if(this.props.row == 0 && (this.props.col == 2 || this.props.col == 5)) {
            this.setState({piece: "bishop", player: 2, image: "img/czarny_goniec.png"});
        } else if(this.props.row == 7 && this.props.col == 3) {
            this.setState({piece: "queen", player: 1, image: "img/biala_krolowa.png"});
        } else if(this.props.row == 0 && this.props.col == 3) {
            this.setState({piece: "queen", player: 2, image: "img/czarna_krolowa.png"});
        } else if(this.props.row == 7 && this.props.col == 4) {
            this.setState({piece: "king", player: 1, image: "img/bialy_krol.png"});
        } else if(this.props.row == 0 && this.props.col == 4) {
            this.setState({piece: "king", player: 2, image: "img/czarny_krol.png"});
        } else if(this.props.row == 1) {
            this.setState({piece: "pawn", player: 2, image: "img/czarny_pionek.png"});
        } else if(this.props.row == 6) {
            this.setState({piece: "pawn", player: 1, image: "img/bialy_pionek.png"});
        }
    }

    render() {
    return(
        <div id="field00" className={'field ' + this.props.color}>
                <img src={this.state.image} alt="" />
            </div>
    )
}
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