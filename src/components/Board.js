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
            piece: [["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
            ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
            ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]],
            player: [["2", "2", "2", "2", "2", "2", "2", "2"],
            ["2", "2", "2", "2", "2", "2", "2", "2"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["1", "1", "1", "1", "1", "1", "1", "1"],
            ["1", "1", "1", "1", "1", "1", "1", "1"]],
            error: "",
            prevStatesPlayer: [],
            prevStatesPiece: [],
            stepNumber: 0
        };
        this.squareClicked = this.squareClicked.bind(this);
        this.doMove = this.doMove.bind(this);
    }


    doMove(row, col) {
        
        console.log("ROW1: " + row + " COL1: " + col)
        if (this.state.firstClickPiece == "pawn") {
            if(this.state.firstClickPlayer == "1") {
                if(((row == this.state.firstClickRow - 1 || (this.state.firstClickRow == 6 && row == this.state.firstClickRow - 2)) 
                    && this.state.piece[row][col] == "" && col == this.state.firstClickCol) 
                    || (row == this.state.firstClickRow - 1 && (col == (this.state.firstClickCol + 1) ||  col == (this.state.firstClickCol - 1)) && this.state.piece[row][col]!="" && this.state.player[row][col]=="2")) {
                    let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                    let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                    newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPiece[row][col] = "pawn";
                    newPlayer[row][col] = "1";
                    var stepNumber = this.state.stepNumber;
                    console.log("TUTAJ PATRZ1: " + row)
                    if(row == "0")
                    {
                        newPiece[row][col] = "queen";
                    }
                    this.setState({
                        piece: newPiece,
                        player: newPlayer,
                        whichPlayer: "2",
                        error: "",
                        stepNumber: stepNumber + 1
                    });
                    return true;
                }
                else
                {
                    this.showError("Wybierz poprawny ruch");
                }
            } else {
                if(((row == this.state.firstClickRow + 1 
                    || (this.state.firstClickRow == 1 
                    && row == this.state.firstClickRow + 2)) 
                    && this.state.piece[row][col] == "" 
                    && col == this.state.firstClickCol) || (row == this.state.firstClickRow + 1 && (col == (this.state.firstClickCol + 1) ||  col == (this.state.firstClickCol - 1)) && this.state.piece[row][col]!="" && this.state.player[row][col]=="1")) {

                    let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                    let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                    newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPiece[row][col] = "pawn";
                    newPlayer[row][col] = "2";
                    console.log("TUTAJ PATRZ2: " + row)
                    if(row == "7")
                    {
                        newPiece[row][col] = "queen";
                    }
                    var stepNumber = this.state.stepNumber;
                    this.setState({
                        piece: newPiece,
                        player: newPlayer,
                        whichPlayer: "1",
                        error: "",
                        stepNumber: stepNumber + 1
                    });
                    return true;
                }
                else
                {
                    this.showError("Wybierz poprawny ruch");
                }
            
            }
        }
        else if(this.state.firstClickPiece == "rook")
        {
            //console.log(this.state)
            //console.log("col" + col + " row" + row)
            if(this.state.firstClickPlayer == "1") {
                if((col == this.state.firstClickCol || row == this.state.firstClickRow) && this.state.player[row][col]!="1")
                {
                    let kierunek;
                    if(this.state.firstClickCol != col) kierunek = 1;
                    else kierunek = 2;
                    console.log(kierunek);
                    let czyPustePola = true;
                    if(kierunek==1) {
                        let kierunek2;
                        if(col-this.state.firstClickCol > 0) kierunek2 = -1;
                        else kierunek2 = 1;
                        for(let i=col+kierunek2; i!=this.state.firstClickCol; i+=kierunek2) {
                            if(this.state.piece[row][i]!="")
                            { 
                                czyPustePola = false;
                                console.log(czyPustePola)
                                //break;
                            }
                        }
                    } else {
                        let kierunek2;
                        if(row-this.state.firstClickRow > 0) kierunek2 = -1;
                        else kierunek2 = 1;
                        for(let i=row+kierunek2; i!=this.state.firstClickRow; i+=kierunek2) {
                            if(this.state.piece[i][col]!="")
                            { 
                                czyPustePola = false;
                                console.log(czyPustePola)
                                //break;
                            }
                        }
                    }
                    if(czyPustePola && this.state.player[row][col]!="1") {
                        //console.log("Yey!")
                        let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                        let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                        newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPiece[row][col] = "rook";
                        newPlayer[row][col] = "1";
                        var stepNumber = this.state.stepNumber;
                        this.setState({
                            piece: newPiece,
                            player: newPlayer,
                            whichPlayer: "2",
                            error: ""
                        });
                        return true;
                    }
                    else
                    {
                        this.showError("Tego ruchu nie można wykonać");
                    }
                }
                else
                {
                    this.showError("Wybierz poprawny ruch");
                }

            }
            else
            {
                if((col == this.state.firstClickCol || row == this.state.firstClickRow) && this.state.player[row][col]!="2")
                {
                    let kierunek;
                    if(this.state.firstClickCol != col) kierunek = 1;
                    else kierunek = 2;
                    console.log(kierunek);
                    let czyPustePola = true;
                    if(kierunek==1) {
                        let kierunek2;
                        if(col-this.state.firstClickCol > 0) kierunek2 = -1;
                        else kierunek2 = 1;
                        for(let i=col+kierunek2; i!=this.state.firstClickCol; i+=kierunek2) {
                            if(this.state.piece[row][i]!="")
                            { 
                                czyPustePola = false;
                                console.log(czyPustePola)
                                //break;
                            }
                        }
                    } else {
                        let kierunek2;
                        if(row-this.state.firstClickRow > 0) kierunek2 = -1;
                        else kierunek2 = 1;
                        for(let i=row+kierunek2; i!=this.state.firstClickRow; i+=kierunek2) {
                            if(this.state.piece[i][col]!="")
                            { 
                                czyPustePola = false;
                                console.log(czyPustePola)
                                //break;
                            }
                        }
                    }
                    if(czyPustePola && this.state.player[row][col]!="2") {
                        //console.log("Yey!")
                        let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                        let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                        newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPiece[row][col] = "rook";
                        newPlayer[row][col] = "2";
                        var stepNumber = this.state.stepNumber;
                        this.setState({
                            piece: newPiece,
                            player: newPlayer,
                            whichPlayer: "1",
                            error: ""
                        });
                        return true;
                    }
                    else
                    {
                        this.showError("Tego ruchu nie można wykonać");
                    }
                }
                else
                {
                    this.showError("Wybierz poprawny ruch");
                }
            }
        }
        else if(this.state.firstClickPiece == "king")
        {
            if(this.state.firstClickPlayer == "1")
            {
                if((col == (this.state.firstClickCol + 1) || col == (this.state.firstClickCol - 1) || row == (this.state.firstClickRow + 1) || row == (this.state.firstClickRow - 1)) && this.state.player[row][col]!="1")
                {
                    let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                    let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                    newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPiece[row][col] = "king";
                    newPlayer[row][col] = "1";
                    var stepNumber = this.state.stepNumber;
                    this.setState({
                        piece: newPiece,
                        player: newPlayer,
                        whichPlayer: "2",
                        error: "",
                        stepNumber: stepNumber + 1
                    });
                    return true;
                }
                else
                {
                    this.showError("Wybierz poprawny ruch");
                }

            }
            else
            {
                if((col == (this.state.firstClickCol + 1) || col == (this.state.firstClickCol - 1) || row == (this.state.firstClickRow + 1) || row == (this.state.firstClickRow - 1))  && this.state.player[row][col]!="2")
                {
                    let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                    let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                    newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPiece[row][col] = "king";
                    newPlayer[row][col] = "2";
                    var stepNumber = this.state.stepNumber;
                    this.setState({
                        piece: newPiece,
                        player: newPlayer,
                        whichPlayer: "1",
                        error: "",
                        stepNumber: stepNumber + 1
                    });
                    return true;
                }
                else
                {
                    this.showError("Wybierz poprawny ruch");
                }
            }
        }
        else if(this.state.firstClickPiece == "queen")
        {
            if(this.state.firstClickPlayer == "1")
            {
                if((col == this.state.firstClickCol || row == this.state.firstClickRow 
                    || (row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol + 1)) || (row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol - 1))
                    || (row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol + 2)) || (row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol - 2))
                    || (row == (this.state.firstClickRow + 3) && col == (this.state.firstClickCol + 3)) || (row == (this.state.firstClickRow - 3) && col == (this.state.firstClickCol - 3))
                    || (row == (this.state.firstClickRow + 4) && col == (this.state.firstClickCol + 4)) || (row == (this.state.firstClickRow - 4) && col == (this.state.firstClickCol - 4))
                    || (row == (this.state.firstClickRow + 5) && col == (this.state.firstClickCol + 5)) || (row == (this.state.firstClickRow - 5) && col == (this.state.firstClickCol - 5))
                    || (row == (this.state.firstClickRow + 6) && col == (this.state.firstClickCol + 6)) || (row == (this.state.firstClickRow - 6) && col == (this.state.firstClickCol - 6))
                    || (row == (this.state.firstClickRow + 7) && col == (this.state.firstClickCol + 7)) || (row == (this.state.firstClickRow - 7) && col == (this.state.firstClickCol - 7))
                    || (row == (this.state.firstClickRow + 8) && col == (this.state.firstClickCol + 8)) || (row == (this.state.firstClickRow - 8) && col == (this.state.firstClickCol - 8))
                    || (row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol - 1)) || (row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol + 1))
                    || (row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol - 2)) || (row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol + 2))
                    || (row == (this.state.firstClickRow + 3) && col == (this.state.firstClickCol - 3)) || (row == (this.state.firstClickRow - 3) && col == (this.state.firstClickCol + 3))
                    || (row == (this.state.firstClickRow + 4) && col == (this.state.firstClickCol - 4)) || (row == (this.state.firstClickRow - 4) && col == (this.state.firstClickCol + 4))
                    || (row == (this.state.firstClickRow + 5) && col == (this.state.firstClickCol - 5)) || (row == (this.state.firstClickRow - 5) && col == (this.state.firstClickCol + 5))
                    || (row == (this.state.firstClickRow + 6) && col == (this.state.firstClickCol - 6)) || (row == (this.state.firstClickRow - 6) && col == (this.state.firstClickCol + 6))
                    || (row == (this.state.firstClickRow + 7) && col == (this.state.firstClickCol - 7)) || (row == (this.state.firstClickRow - 7) && col == (this.state.firstClickCol + 7))
                    || (row == (this.state.firstClickRow + 8) && col == (this.state.firstClickCol - 8)) || (row == (this.state.firstClickRow - 8) && col == (this.state.firstClickCol + 8)))  && this.state.player[row][col]!="1")
                {
                    let czyPustePola = true;
                    if(row == this.state.firstClickRow || col == this.state.firstClickCol) {
                        let kierunek;
                        if(this.state.firstClickCol != col) kierunek = 1;
                        else kierunek = 2;
                        console.log(kierunek);
                        if(kierunek==1) {
                            let kierunek2;
                            if(col-this.state.firstClickCol > 0) kierunek2 = -1;
                            else kierunek2 = 1;
                            for(let i=col+kierunek2; i!=this.state.firstClickCol; i+=kierunek2) {
                                if(this.state.piece[row][i]!="")
                                { 
                                    czyPustePola = false;
                                    console.log(czyPustePola)
                                    //break;
                                }
                            }
                        }
                        else 
                        {
                            let kierunek2;
                            if(row-this.state.firstClickRow > 0) kierunek2 = -1;
                            else kierunek2 = 1;
                            for(let i=row+kierunek2; i!=this.state.firstClickRow; i+=kierunek2) {
                                if(this.state.piece[i][col]!="")
                                { 
                                    czyPustePola = false;
                                    console.log(czyPustePola);
                                    //break;
                                }
                            }
                        }
                    } 
                    else 
                    {
                        let kierunek;
                        if(this.state.firstClickRow > row) kierunek = 1;
                        else kierunek = -1;
                        let kierunek2;
                        if(this.state.firstClickCol > col) kierunek2 = 1;
                        else kierunek2 = -1;
                        let i,j;
                        for(i = row+kierunek, j = col+kierunek2; i!= this.state.firstClickRow; i+=kierunek, j+=kierunek2) {
                            if(this.state.piece[i][j]!="") czyPustePola=false;
                        }
                    }
                    if(czyPustePola && this.state.player[row][col]!="1") {
                        let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                        let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                        newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPiece[row][col] = "queen";
                        newPlayer[row][col] = "1";
                        var stepNumber = this.state.stepNumber;
                        this.setState({
                            piece: newPiece,
                            player: newPlayer,
                            whichPlayer: "2",
                            error: ""
                        });
                        return true;
                    }
                    else
                    {
                        this.showError("Tego ruchu nie można wykonać");
                    }
                }
                else
                {
                    this.showError("Wybierz poprawny ruch");
                }

            }
            else
            {
                if((col == this.state.firstClickCol || row == this.state.firstClickRow 
                    || (row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol + 1)) || (row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol - 1))
                    || (row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol + 2)) || (row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol - 2))
                    || (row == (this.state.firstClickRow + 3) && col == (this.state.firstClickCol + 3)) || (row == (this.state.firstClickRow - 3) && col == (this.state.firstClickCol - 3))
                    || (row == (this.state.firstClickRow + 4) && col == (this.state.firstClickCol + 4)) || (row == (this.state.firstClickRow - 4) && col == (this.state.firstClickCol - 4))
                    || (row == (this.state.firstClickRow + 5) && col == (this.state.firstClickCol + 5)) || (row == (this.state.firstClickRow - 5) && col == (this.state.firstClickCol - 5))
                    || (row == (this.state.firstClickRow + 6) && col == (this.state.firstClickCol + 6)) || (row == (this.state.firstClickRow - 6) && col == (this.state.firstClickCol - 6))
                    || (row == (this.state.firstClickRow + 7) && col == (this.state.firstClickCol + 7)) || (row == (this.state.firstClickRow - 7) && col == (this.state.firstClickCol - 7))
                    || (row == (this.state.firstClickRow + 8) && col == (this.state.firstClickCol + 8)) || (row == (this.state.firstClickRow - 8) && col == (this.state.firstClickCol - 8))
                    || (row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol - 1)) || (row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol + 1))
                    || (row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol - 2)) || (row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol + 2))
                    || (row == (this.state.firstClickRow + 3) && col == (this.state.firstClickCol - 3)) || (row == (this.state.firstClickRow - 3) && col == (this.state.firstClickCol + 3))
                    || (row == (this.state.firstClickRow + 4) && col == (this.state.firstClickCol - 4)) || (row == (this.state.firstClickRow - 4) && col == (this.state.firstClickCol + 4))
                    || (row == (this.state.firstClickRow + 5) && col == (this.state.firstClickCol - 5)) || (row == (this.state.firstClickRow - 5) && col == (this.state.firstClickCol + 5))
                    || (row == (this.state.firstClickRow + 6) && col == (this.state.firstClickCol - 6)) || (row == (this.state.firstClickRow - 6) && col == (this.state.firstClickCol + 6))
                    || (row == (this.state.firstClickRow + 7) && col == (this.state.firstClickCol - 7)) || (row == (this.state.firstClickRow - 7) && col == (this.state.firstClickCol + 7))
                    || (row == (this.state.firstClickRow + 8) && col == (this.state.firstClickCol - 8)) || (row == (this.state.firstClickRow - 8) && col == (this.state.firstClickCol + 8)))  && this.state.player[row][col]!="2")
                {
                    let czyPustePola = true;
                    if(row == this.state.firstClickRow || col == this.state.firstClickCol) {
                        let kierunek;
                        if(this.state.firstClickCol != col) kierunek = 1;
                        else kierunek = 2;
                        console.log(kierunek);
                        if(kierunek==1) {
                            let kierunek2;
                            if(col-this.state.firstClickCol > 0) kierunek2 = -1;
                            else kierunek2 = 1;
                            for(let i=col+kierunek2; i!=this.state.firstClickCol; i+=kierunek2) {
                                if(this.state.piece[row][i]!="")
                                { 
                                    czyPustePola = false;
                                    console.log(czyPustePola)
                                    //break;
                                }
                            }
                        } 
                        else {
                            let kierunek2;
                            if(row-this.state.firstClickRow > 0) kierunek2 = -1;
                            else kierunek2 = 1;
                            for(let i=row+kierunek2; i!=this.state.firstClickRow; i+=kierunek2) {
                                if(this.state.piece[i][col]!="")
                                { 
                                    czyPustePola = false;
                                    console.log(czyPustePola);
                                    //break;
                                }
                            }
                        }
                    } 
                    else 
                    {
                        let kierunek;
                        if(this.state.firstClickRow > row) kierunek = 1;
                        else kierunek = -1;
                        let kierunek2;
                        if(this.state.firstClickCol > col) kierunek2 = 1;
                        else kierunek2 = -1;
                        let i,j;
                        for(i = row+kierunek, j = col+kierunek2; i!= this.state.firstClickRow; i+=kierunek, j+=kierunek2) {
                            if(this.state.piece[i][j]!="") czyPustePola=false;
                        }
                    }
                        if(czyPustePola && this.state.player[row][col]!="2") {
                        let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                        let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                        newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPiece[row][col] = "queen";
                        newPlayer[row][col] = "2";
                        var stepNumber = this.state.stepNumber;
                        this.setState({
                            piece: newPiece,
                            player: newPlayer,
                            whichPlayer: "1",
                            error: ""
                        });
                        return true;
                    }
                    else
                    {
                        this.showError("Tego ruchu nie można wykonać");
                    }
                }
                else
                {
                    this.showError("Wybierz poprawny ruch");
                }
            }
        }
        else if(this.state.firstClickPiece == "bishop")
        {
            if(this.state.firstClickPlayer == "1")
            {
                if(((row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol + 1)) || (row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol - 1))
                    || (row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol + 2)) || (row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol - 2))
                    || (row == (this.state.firstClickRow + 3) && col == (this.state.firstClickCol + 3)) || (row == (this.state.firstClickRow - 3) && col == (this.state.firstClickCol - 3))
                    || (row == (this.state.firstClickRow + 4) && col == (this.state.firstClickCol + 4)) || (row == (this.state.firstClickRow - 4) && col == (this.state.firstClickCol - 4))
                    || (row == (this.state.firstClickRow + 5) && col == (this.state.firstClickCol + 5)) || (row == (this.state.firstClickRow - 5) && col == (this.state.firstClickCol - 5))
                    || (row == (this.state.firstClickRow + 6) && col == (this.state.firstClickCol + 6)) || (row == (this.state.firstClickRow - 6) && col == (this.state.firstClickCol - 6))
                    || (row == (this.state.firstClickRow + 7) && col == (this.state.firstClickCol + 7)) || (row == (this.state.firstClickRow - 7) && col == (this.state.firstClickCol - 7))
                    || (row == (this.state.firstClickRow + 8) && col == (this.state.firstClickCol + 8)) || (row == (this.state.firstClickRow - 8) && col == (this.state.firstClickCol - 8))
                    || (row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol - 1)) || (row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol + 1))
                    || (row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol - 2)) || (row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol + 2))
                    || (row == (this.state.firstClickRow + 3) && col == (this.state.firstClickCol - 3)) || (row == (this.state.firstClickRow - 3) && col == (this.state.firstClickCol + 3))
                    || (row == (this.state.firstClickRow + 4) && col == (this.state.firstClickCol - 4)) || (row == (this.state.firstClickRow - 4) && col == (this.state.firstClickCol + 4))
                    || (row == (this.state.firstClickRow + 5) && col == (this.state.firstClickCol - 5)) || (row == (this.state.firstClickRow - 5) && col == (this.state.firstClickCol + 5))
                    || (row == (this.state.firstClickRow + 6) && col == (this.state.firstClickCol - 6)) || (row == (this.state.firstClickRow - 6) && col == (this.state.firstClickCol + 6))
                    || (row == (this.state.firstClickRow + 7) && col == (this.state.firstClickCol - 7)) || (row == (this.state.firstClickRow - 7) && col == (this.state.firstClickCol + 7))
                    || (row == (this.state.firstClickRow + 8) && col == (this.state.firstClickCol - 8)) || (row == (this.state.firstClickRow - 8) && col == (this.state.firstClickCol + 8)))  && this.state.player[row][col]!="1")
                {
                    let czyPustePola = true;
                    let kierunek;
                    if(this.state.firstClickRow > row) kierunek = 1;
                    else kierunek = -1;
                    let kierunek2;
                    if(this.state.firstClickCol > col) kierunek2 = 1;
                    else kierunek2 = -1;
                    let i,j;
                    for(i = row+kierunek, j = col+kierunek2; i!= this.state.firstClickRow; i+=kierunek, j+=kierunek2) {
                        if(this.state.piece[i][j]!="") czyPustePola=false;
                    }
                    if(czyPustePola && this.state.player[row][col]!="1") {
                        let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                        let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                        newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPiece[row][col] = "bishop";
                        newPlayer[row][col] = "1";
                        var stepNumber = this.state.stepNumber;
                        this.setState({
                            piece: newPiece,
                            player: newPlayer,
                            whichPlayer: "2",
                            error: ""
                        });
                        return true;
                    }
                    else
                    {
                        this.showError("Tego ruchu nie można wykonać");
                    }
                }
                else
                {
                    this.showError("Wybierz poprawny ruch");
                }

            }
            else
            {
                if(((row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol + 1)) || (row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol - 1))
                    || (row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol + 2)) || (row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol - 2))
                    || (row == (this.state.firstClickRow + 3) && col == (this.state.firstClickCol + 3)) || (row == (this.state.firstClickRow - 3) && col == (this.state.firstClickCol - 3))
                    || (row == (this.state.firstClickRow + 4) && col == (this.state.firstClickCol + 4)) || (row == (this.state.firstClickRow - 4) && col == (this.state.firstClickCol - 4))
                    || (row == (this.state.firstClickRow + 5) && col == (this.state.firstClickCol + 5)) || (row == (this.state.firstClickRow - 5) && col == (this.state.firstClickCol - 5))
                    || (row == (this.state.firstClickRow + 6) && col == (this.state.firstClickCol + 6)) || (row == (this.state.firstClickRow - 6) && col == (this.state.firstClickCol - 6))
                    || (row == (this.state.firstClickRow + 7) && col == (this.state.firstClickCol + 7)) || (row == (this.state.firstClickRow - 7) && col == (this.state.firstClickCol - 7))
                    || (row == (this.state.firstClickRow + 8) && col == (this.state.firstClickCol + 8)) || (row == (this.state.firstClickRow - 8) && col == (this.state.firstClickCol - 8))
                    || (row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol - 1)) || (row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol + 1))
                    || (row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol - 2)) || (row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol + 2))
                    || (row == (this.state.firstClickRow + 3) && col == (this.state.firstClickCol - 3)) || (row == (this.state.firstClickRow - 3) && col == (this.state.firstClickCol + 3))
                    || (row == (this.state.firstClickRow + 4) && col == (this.state.firstClickCol - 4)) || (row == (this.state.firstClickRow - 4) && col == (this.state.firstClickCol + 4))
                    || (row == (this.state.firstClickRow + 5) && col == (this.state.firstClickCol - 5)) || (row == (this.state.firstClickRow - 5) && col == (this.state.firstClickCol + 5))
                    || (row == (this.state.firstClickRow + 6) && col == (this.state.firstClickCol - 6)) || (row == (this.state.firstClickRow - 6) && col == (this.state.firstClickCol + 6))
                    || (row == (this.state.firstClickRow + 7) && col == (this.state.firstClickCol - 7)) || (row == (this.state.firstClickRow - 7) && col == (this.state.firstClickCol + 7))
                    || (row == (this.state.firstClickRow + 8) && col == (this.state.firstClickCol - 8)) || (row == (this.state.firstClickRow - 8) && col == (this.state.firstClickCol + 8)))  && this.state.player[row][col]!="2")
                {
                    let czyPustePola = true;
                    let kierunek;
                    if(this.state.firstClickRow > row) kierunek = 1;
                    else kierunek = -1;
                    let kierunek2;
                    if(this.state.firstClickCol > col) kierunek2 = 1;
                    else kierunek2 = -1;
                    let i,j;
                    for(i = row+kierunek, j = col+kierunek2; i!= this.state.firstClickRow; i+=kierunek, j+=kierunek2) {
                        if(this.state.piece[i][j]!="") czyPustePola=false;
                    }
                    if(czyPustePola && this.state.player[row][col]!="2") {
                        let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                        let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                        newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                        newPiece[row][col] = "bishop";
                        newPlayer[row][col] = "2";
                        var stepNumber = this.state.stepNumber;
                        this.setState({
                            piece: newPiece,
                            player: newPlayer,
                            whichPlayer: "1",
                            error: ""
                        });
                        return true;
                    }
                    else
                    {
                        this.showError("Tego ruchu nie można wykonać");
                    }
                }
                else
                {
                    this.showError("Wybierz poprawny ruch");
                }
            }
        }
        else if(this.state.firstClickPiece == "knight")
        {
            if(this.state.firstClickPlayer == "1")
            {
                if((row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol + 1) || row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol - 1)
                || row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol + 2) || row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol - 2)
                || row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol - 1) || row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol + 1)
                || row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol - 2) || row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol + 2))  && this.state.player[row][col]!="1")
                {
                    let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                    let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                    newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPiece[row][col] = "knight";
                    newPlayer[row][col] = "1";
                    var stepNumber = this.state.stepNumber;
                    this.setState({
                        piece: newPiece,
                        player: newPlayer,
                        whichPlayer: "2",
                        error: ""
                    });
                    return true;
                }
                else
                {                    
                    this.showError("Wybierz poprawny ruch");
                }

            }
            else
            {
                if((row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol + 1) || row == (this.state.firstClickRow - 2) && col == (this.state.firstClickCol - 1)
                || row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol + 2) || row == (this.state.firstClickRow - 1) && col == (this.state.firstClickCol - 2)
                || row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol - 1) || row == (this.state.firstClickRow + 2) && col == (this.state.firstClickCol + 1)
                || row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol - 2) || row == (this.state.firstClickRow + 1) && col == (this.state.firstClickCol + 2))  && this.state.player[row][col]!="2")
                {
                    let newPiece = this.state.piece.map(function(arr) { return arr.slice();});
                    let newPlayer = this.state.player.map(function(arr) { return arr.slice();});
                    newPiece[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPlayer[this.state.firstClickRow][this.state.firstClickCol] = "";
                    newPiece[row][col] = "knight";
                    newPlayer[row][col] = "2";
                    var stepNumber = this.state.stepNumber;
                    this.setState({
                        piece: newPiece,
                        player: newPlayer,
                        whichPlayer: "1",
                        error: ""
                    });
                    return true;
                }
                else
                {                    
                    this.showError("Wybierz poprawny ruch");
                }
            }
        }
    }

    showError(err) {
        this.setState({ error: err });
        setTimeout(() => {
            this.setState({ error: "" });
        }, 1000);
    }

    squareClicked(row, col) {
        //console.log("ROW: " + row + " COL: " + col)
        //console.log("AAA: " + this.state.player[row][col] + " " + this.state.whichPlayer)
        if(this.state.firstClickCol === "") {
            if(this.state.player[row][col] == this.state.whichPlayer) {
                this.setState({firstClickCol: col, firstClickRow: row, firstClickPiece: this.state.piece[row][col], firstClickPlayer: this.state.player[row][col]});
            } 
            else 
            {
                this.showError("Nie ten gracz");
            }
        } else 
        {
            var wynik = this.doMove(row, col);
            if(wynik)
            {
                var temp1 = this.state.piece;
                var temp2 = this.state.prevStatesPiece;
                temp2.push(temp1)
                var temp3 = this.state.player;
                var temp4 = this.state.prevStatesPlayer
                var temp5 = this.state.stepNumber + 1;
                temp4.push(temp3)
                this.setState({
                    prevStatesPiece: temp2,
                    prevStatesPlayer: temp4,
                    stepNumber: temp5,
                    firstClickCol: "",
                    firstClickRow: "",
                    firstClickPiece: "",
                    firstClickPlayer: ""
                })
                //Ruch wykonany
            }
        }
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
                    row.push(<Square color="white" col={j} row={i} piece={this.state.piece[i][j]} player={this.state.player[i][j]} key={key + this.state.piece[i][j] + this.state.player[i][j]} clicked={this.squareClicked} />)
                }
                else
                {
                    row.push(<Square color="black" col={j} row={i} piece={this.state.piece[i][j]} player={this.state.player[i][j]} key={key + this.state.piece[i][j] + this.state.player[i][j]} clicked={this.squareClicked} />)
                }
                key++;
            }
            board.push(row)
        }
        return(
            <div>
                <div id="board">{board}</div>
                <div id="movePlayer">{this.state.whichPlayer == 1?"Ruch białych":"Ruch czarnych"}</div>
                <div id="infoGame"><p style={{color: "red"}}>{this.state.error}</p></div>
            </div>
        )
    }
    
}
