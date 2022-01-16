import React from 'react';
import '../index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        };
        this.clicked = this.clicked.bind(this);
    }

    clicked() {
        this.props.clicked(this.props.row, this.props.col);
    }

    componentDidMount() {
        if(this.props.player == "1" && this.props.piece == "pawn") this.setState({image: "img/bialy_pionek.png"});
        else if(this.props.player == "2" && this.props.piece == "pawn") this.setState({image: "img/czarny_pionek.png"});
        else if(this.props.player == "1" && this.props.piece == "rook") this.setState({image: "img/biala_wieza.png"});
        else if(this.props.player == "2" && this.props.piece == "rook") this.setState({image: "img/czarna_wieza.png"});
        else if(this.props.player == "1" && this.props.piece == "knight") this.setState({image: "img/bialy_skoczek.png"});
        else if(this.props.player == "2" && this.props.piece == "knight") this.setState({image: "img/czarny_skoczek.png"});
        else if(this.props.player == "1" && this.props.piece == "bishop") this.setState({image: "img/bialy_goniec.png"});
        else if(this.props.player == "2" && this.props.piece == "bishop") this.setState({image: "img/czarny_goniec.png"});
        else if(this.props.player == "1" && this.props.piece == "queen") this.setState({image: "img/biala_krolowa.png"});
        else if(this.props.player == "2" && this.props.piece == "queen") this.setState({image: "img/czarna_krolowa.png"});
        else if(this.props.player == "1" && this.props.piece == "king") this.setState({image: "img/bialy_krol.png"});
        else if(this.props.player == "2" && this.props.piece == "king") this.setState({image: "img/czarny_krol.png"});
        else this.setState({image: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="});
    }

    render() {
    return(
        <div id="field00" onClick={this.clicked} className={'field ' + this.props.color} style={{ 
            backgroundImage: `url("${this.state.image}")` 
          }}>
            </div>
    )
}
}


export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstClickCol: "",
            firstClickRow: "",
            firstClickPiece: "",
            firstClickPlayer: "",
            whichPlayer: "1",
            piece: [[["rook"], ["knight"], ["bishop"], ["queen"], ["king"], ["bishop"], ["knight"], ["rook"]],
            [["pawn"], ["pawn"], ["pawn"], ["pawn"], ["pawn"], ["pawn"], ["pawn"], ["pawn"]],
            [[""], [""], [""], [""], [""], [""], [""], [""]],
            [[""], [""], [""], [""], [""], [""], [""], [""]],
            [[""], [""], [""], [""], [""], [""], [""], [""]],
            [[""], [""], [""], [""], [""], [""], [""], [""]],
            [["pawn"], ["pawn"], ["pawn"], ["pawn"], ["pawn"], ["pawn"], ["pawn"], ["pawn"]],
            [["rook"], ["knight"], ["bishop"], ["queen"], ["king"], ["bishop"], ["knight"], ["rook"]]],
            player: [[["2"], ["2"], ["2"], ["2"], ["2"], ["2"], ["2"], ["2"]],
            [["2"], ["2"], ["2"], ["2"], ["2"], ["2"], ["2"], ["2"]],
            [[""], [""], [""], [""], [""], [""], [""], [""]],
            [[""], [""], [""], [""], [""], [""], [""], [""]],
            [[""], [""], [""], [""], [""], [""], [""], [""]],
            [[""], [""], [""], [""], [""], [""], [""], [""]],
            [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]],
            [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]]]
        };
        this.squareClicked = this.squareClicked.bind(this);
        this.doMove = this.doMove.bind(this);
    }


    doMove(row, col) {
        if (this.state.firstClickPiece == "pawn") {
            if(this.state.firstClickPlayer == "1") {
                if((row == this.state.firstClickRow - 1 || (this.state.firstClickRow == 6 && row == this.state.firstClickRow - 2)) && this.state.piece[row][col] == "" && col == this.state.firstClickCol) {
                    let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                    let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                    newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPiece[row][col] = "pawn";
                    newPlayer[row][col] = "1";
                    this.setState({
                        piece: newPiece,
                        player: newPlayer,
                        whichPlayer: "2"
                    });
                }
            } else {
                if((row == this.state.firstClickRow + 1 || (this.state.firstClickRow == 1 && row == this.state.firstClickRow + 2)) && this.state.piece[row][col] == "" && col == this.state.firstClickCol) {
                    let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                    let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                    newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPiece[row][col] = "pawn";
                    newPlayer[row][col] = "2";
                    this.setState({
                        piece: newPiece,
                        player: newPlayer,
                        whichPlayer: "1"
                    });
                }
            }
        }

        this.setState({firstClickCol: "", firstClickRow: "", firstClickPiece: "", firstClickPlayer: ""});
    }

    squareClicked(row, col) {
        if(this.state.firstClickCol == "") {
            if(this.state.player[row][col] == this.state.whichPlayer) {
            this.setState({firstClickCol: col, firstClickRow: row, firstClickPiece: this.state.piece[row][col], firstClickPlayer: this.state.player[row][col]});
            } else console.log("nie ten gracz");
        } else this.doMove(row, col);
    }

    render()
    {
        const board = [];
        let key = 0;
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                if((i%2 + j%2)%2 == 0)
                {
                    row.push(<Square color="white" col={j} row={i} piece={this.state.piece[i][j]} player={this.state.player[i][j]} key={key + this.state.piece[i][j]} clicked={this.squareClicked} />)
                }
                else
                {
                    row.push(<Square color="black" col={j} row={i} piece={this.state.piece[i][j]} player={this.state.player[i][j]} key={key + this.state.piece[i][j]} clicked={this.squareClicked} />)
                }
                key++;
            }
            board.push(row)
        }
        return(
            <div id="board">{board}</div>
        )
    }
    
}