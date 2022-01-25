import React from 'react';
import '../index.css';
import Square from './Square'

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
            stepNumber: 0,
            whiteCheck: 0,
            blackCheck: 0
        };
        this.squareClicked = this.squareClicked.bind(this);
        this.doMove = this.doMove.bind(this);
        this.undoMove = this.undoMove.bind(this);
        this.isCheckOrMate = this.isCheckOrMate.bind(this);    
        this.isWhiteInCheck = this.isWhiteInCheck.bind(this);
        this.knockoutKing = this.knockoutKing.bind(this);
    }
    undoMove()
    {
        var playerColor = this.state.stepNumber % 2;
        var whichPlayer = "2"
        var temp1 = this.state.prevStatesPiece[this.state.stepNumber - 1]
        var temp2 = this.state.prevStatesPlayer[this.state.stepNumber - 1]
        var temp3 = this.state.prevStatesPlayer;
        temp3.pop()
        var temp4 = this.state.prevStatesPiece;
        temp4.pop()
        if(playerColor == 1)
        {
            whichPlayer = "1"
        }
        var move = this.state.stepNumber - 1
        this.setState({
            whichPlayer: whichPlayer,
            piece: temp1,
            player: temp2,
            prevStatesPlayer: temp3,
            prevStatesPiece: temp4,
            stepNumber: move
        })
    }
    isWhiteInCheck() {
        for(let i=0; i<8; i++) {
            for(let j=0; j<8; j++) {
                if(this.state.piece[i][j]=="king" && this.state.player[i][j]=="1") {
                    if(i>0 && j>0 && this.state.piece[i-1][j-1]=="pawn" && this.state.player[i-1][j-1]=="2") return true;
                    if(i>0 && j<7 && this.state.piece[i-1][j+1]=="pawn" && this.state.player[i-1][j+1]=="2") return true;
                    if(i<6 && j<7 && this.state.piece[i+2][j+1]=="knight" && this.state.player[i+2][j+1]=="2") return true;
                    if(i<6 && j>0 && this.state.piece[i+2][j-1]=="knight" && this.state.player[i+2][j-1]=="2") return true;
                    if(i>1 && j<7 && this.state.piece[i-2][j+1]=="knight" && this.state.player[i-2][j+1]=="2") return true;
                    if(i>1 && j>0 && this.state.piece[i-2][j-1]=="knight" && this.state.player[i-2][j-1]=="2") return true;
                    if(i<7 && j<6 && this.state.piece[i+1][j+2]=="knight" && this.state.player[i+1][j+2]=="2") return true;
                    if(i<7 && j>1 && this.state.piece[i+1][j-2]=="knight" && this.state.player[i+1][j-2]=="2") return true;
                    if(i>0 && j<6 && this.state.piece[i-1][j+2]=="knight" && this.state.player[i-1][j+2]=="2") return true;
                    if(i>0 && j>1 && this.state.piece[i-1][j-2]=="knight" && this.state.player[i-1][j-2]=="2") return true;
                    if(i>0 && j>0 && this.state.piece[i-1][j-1]=="king" && this.state.player[i-1][j-1]=="2") return true;
                    if(i>0 && j<7 && this.state.piece[i-1][j+1]=="king" && this.state.player[i-1][j+1]=="2") return true;
                    if(i<7 && j>0 && this.state.piece[i+1][j-1]=="king" && this.state.player[i+1][j-1]=="2") return true;
                    if(i<7 && j<7 && this.state.piece[i+1][j+1]=="king" && this.state.player[i+1][j+1]=="2") return true;
                    if(i>0) for(let r=i-1; r>=0; r--) {
                        if(this.state.piece[r][j]=="king") break;
                        if(this.state.piece[r][j]=="bishop") break;
                        if(this.state.piece[r][j]=="pawn") break;
                        if(this.state.piece[r][j]=="knight") break;
                        if(this.state.player[r][j]=="1") break;
                        if(this.state.player[r][j]=="2" && (this.state.piece[r][j]=="queen" || this.state.piece[r][j]=="rook")) return true;
                    }
                    if(i<7) for(let r=i+1; r<8; r++) {
                        if(this.state.piece[r][j]=="king") break;
                        if(this.state.piece[r][j]=="bishop") break;
                        if(this.state.piece[r][j]=="pawn") break;
                        if(this.state.piece[r][j]=="knight") break;
                        if(this.state.player[r][j]=="1") break;
                        if(this.state.player[r][j]=="2" && (this.state.piece[r][j]=="queen" || this.state.piece[r][j]=="rook")) return true;
                    }
                    if(j>0) for(let c=j-1; c>=0; c--) {
                        if(this.state.piece[i][c]=="king") break;
                        if(this.state.piece[i][c]=="bishop") break;
                        if(this.state.piece[i][c]=="pawn") break;
                        if(this.state.piece[i][c]=="knight") break;
                        if(this.state.player[i][c]=="1") break;
                        if(this.state.player[i][c]=="2" && (this.state.piece[i][c]=="queen" || this.state.piece[i][c]=="rook")) return true;
                    }
                    if(j<7) for(let c=j+1; c<8; c++) {
                        if(this.state.piece[i][c]=="king") break;
                        if(this.state.piece[i][c]=="bishop") break;
                        if(this.state.piece[i][c]=="pawn") break;
                        if(this.state.piece[i][c]=="knight") break;
                        if(this.state.player[i][c]=="1") break;
                        if(this.state.player[i][c]=="2" && (this.state.piece[i][c]=="queen" || this.state.piece[i][c]=="rook")) return true;
                    }
                    let r, c;
                    if(i>0 && j>0) for(r = i-1, c = j-1; r>=0 && c>=0; r--, c--) {
                        if(this.state.piece[r][c]=="king") break;
                        if(this.state.piece[r][c]=="rook") break;
                        if(this.state.piece[r][c]=="pawn") break;
                        if(this.state.piece[r][c]=="knight") break;
                        if(this.state.player[r][c]=="1") break;
                        if(this.state.player[r][c]=="2" && (this.state.piece[r][c]=="queen" || this.state.piece[r][c]=="bishop")) return true;
                    }
                    if(i>0 && j<7) for(r = i-1, c = j+1; r>=0 && c<8; r--, c++) {
                        if(this.state.piece[r][c]=="king") break;
                        if(this.state.piece[r][c]=="rook") break;
                        if(this.state.piece[r][c]=="pawn") break;
                        if(this.state.piece[r][c]=="knight") break;
                        if(this.state.player[r][c]=="1") break;
                        if(this.state.player[r][c]=="2" && (this.state.piece[r][c]=="queen" || this.state.piece[r][c]=="bishop")) return true;
                    }
                    if(i<7 && j>0) for(r = i+1, c = j-1; r<8 && c>=0; r++, c--) {
                        if(this.state.piece[r][c]=="king") break;
                        if(this.state.piece[r][c]=="rook") break;
                        if(this.state.piece[r][c]=="pawn") break;
                        if(this.state.piece[r][c]=="knight") break;
                        if(this.state.player[r][c]=="1") break;
                        if(this.state.player[r][c]=="2" && (this.state.piece[r][c]=="queen" || this.state.piece[r][c]=="bishop")) return true;
                    }
                    if(i<7 && j<7) for(r = i+1, c = j+1; r<8 && c<8; r++, c++) {
                        if(this.state.piece[r][c]=="king") break;
                        if(this.state.piece[r][c]=="rook") break;
                        if(this.state.piece[r][c]=="pawn") break;
                        if(this.state.piece[r][c]=="knight") break;
                        if(this.state.player[r][c]=="1") break;
                        if(this.state.player[r][c]=="2" && (this.state.piece[r][c]=="queen" || this.state.piece[r][c]=="bishop")) return true;
                    }
                    return false;
                }
            }
        }
    }
    isBlackInCheck() {
        for(let i=0; i<8; i++) {
            for(let j=0; j<8; j++) {
                if(this.state.piece[i][j]=="king" && this.state.player[i][j]=="2") {
                    if(i>0 && j>0 && this.state.piece[i-1][j-1]=="pawn" && this.state.player[i-1][j-1]=="1") return true;
                    if(i>0 && j<7 && this.state.piece[i-1][j+1]=="pawn" && this.state.player[i-1][j+1]=="1") return true;
                    if(i<6 && j<7 && this.state.piece[i+2][j+1]=="knight" && this.state.player[i+2][j+1]=="1") return true;
                    if(i<6 && j>0 && this.state.piece[i+2][j-1]=="knight" && this.state.player[i+2][j-1]=="1") return true;
                    if(i>1 && j<7 && this.state.piece[i-2][j+1]=="knight" && this.state.player[i-2][j+1]=="1") return true;
                    if(i>1 && j>0 && this.state.piece[i-2][j-1]=="knight" && this.state.player[i-2][j-1]=="1") return true;
                    if(i<7 && j<6 && this.state.piece[i+1][j+2]=="knight" && this.state.player[i+1][j+2]=="1") return true;
                    if(i<7 && j>1 && this.state.piece[i+1][j-2]=="knight" && this.state.player[i+1][j-2]=="1") return true;
                    if(i>0 && j<6 && this.state.piece[i-1][j+2]=="knight" && this.state.player[i-1][j+2]=="1") return true;
                    if(i>0 && j>1 && this.state.piece[i-1][j-2]=="knight" && this.state.player[i-1][j-2]=="1") return true;
                    if(i>0 && j>0 && this.state.piece[i-1][j-1]=="king" && this.state.player[i-1][j-1]=="1") return true;
                    if(i>0 && j<7 && this.state.piece[i-1][j+1]=="king" && this.state.player[i-1][j+1]=="1") return true;
                    if(i<7 && j>0 && this.state.piece[i+1][j-1]=="king" && this.state.player[i+1][j-1]=="1") return true;
                    if(i<7 && j<7 && this.state.piece[i+1][j+1]=="king" && this.state.player[i+1][j+1]=="1") return true;
                    if(i>0) for(let r=i-1; r>=0; r--) {
                        if(this.state.piece[r][j]=="king") break;
                        if(this.state.piece[r][j]=="bishop") break;
                        if(this.state.piece[r][j]=="pawn") break;
                        if(this.state.piece[r][j]=="knight") break;
                        if(this.state.player[r][j]=="2") break;
                        if(this.state.player[r][j]=="1" && (this.state.piece[r][j]=="queen" || this.state.piece[r][j]=="rook")) return true;
                    }
                    if(i<7) for(let r=i+1; r<8; r++) {
                        if(this.state.piece[r][j]=="king") break;
                        if(this.state.piece[r][j]=="bishop") break;
                        if(this.state.piece[r][j]=="pawn") break;
                        if(this.state.piece[r][j]=="knight") break;
                        if(this.state.player[r][j]=="2") break;
                        if(this.state.player[r][j]=="1" && (this.state.piece[r][j]=="queen" || this.state.piece[r][j]=="rook")) return true;
                    }
                    if(j>0) for(let c=j-1; c>=0; c--) {
                        if(this.state.piece[i][c]=="king") break;
                        if(this.state.piece[i][c]=="bishop") break;
                        if(this.state.piece[i][c]=="pawn") break;
                        if(this.state.piece[i][c]=="knight") break;
                        if(this.state.player[i][c]=="2") break;
                        if(this.state.player[i][c]=="1" && (this.state.piece[i][c]=="queen" || this.state.piece[i][c]=="rook")) return true;
                    }
                    if(j<7) for(let c=j+1; c<8; c++) {
                        if(this.state.piece[i][c]=="king") break;
                        if(this.state.piece[i][c]=="bishop") break;
                        if(this.state.piece[i][c]=="pawn") break;
                        if(this.state.piece[i][c]=="knight") break;
                        if(this.state.player[i][c]=="2") break;
                        if(this.state.player[i][c]=="1" && (this.state.piece[i][c]=="queen" || this.state.piece[i][c]=="rook")) return true;
                    }
                    let r, c;
                    if(i>0 && j>0) for(r = i-1, c = j-1; r>=0 && c>=0; r--, c--) {
                        if(this.state.piece[r][c]=="king") break;
                        if(this.state.piece[r][c]=="rook") break;
                        if(this.state.piece[r][c]=="pawn") break;
                        if(this.state.piece[r][c]=="knight") break;
                        if(this.state.player[r][c]=="2") break;
                        if(this.state.player[r][c]=="1" && (this.state.piece[r][c]=="queen" || this.state.piece[r][c]=="bishop")) return true;
                    }
                    if(i>0 && j<7) for(r = i-1, c = j+1; r>=0 && c<8; r--, c++) {
                        if(this.state.piece[r][c]=="king") break;
                        if(this.state.piece[r][c]=="rook") break;
                        if(this.state.piece[r][c]=="pawn") break;
                        if(this.state.piece[r][c]=="knight") break;
                        if(this.state.player[r][c]=="2") break;
                        if(this.state.player[r][c]=="1" && (this.state.piece[r][c]=="queen" || this.state.piece[r][c]=="bishop")) return true;
                    }
                    if(i<7 && j>0) for(r = i+1, c = j-1; r<8 && c>=0; r++, c--) {
                        if(this.state.piece[r][c]=="king") break;
                        if(this.state.piece[r][c]=="rook") break;
                        if(this.state.piece[r][c]=="pawn") break;
                        if(this.state.piece[r][c]=="knight") break;
                        if(this.state.player[r][c]=="2") break;
                        if(this.state.player[r][c]=="1" && (this.state.piece[r][c]=="queen" || this.state.piece[r][c]=="bishop")) return true;
                    }
                    if(i<7 && j<7) for(r = i+1, c = j+1; r<8 && c<8; r++, c++) {
                        if(this.state.piece[r][c]=="king") break;
                        if(this.state.piece[r][c]=="rook") break;
                        if(this.state.piece[r][c]=="pawn") break;
                        if(this.state.piece[r][c]=="knight") break;
                        if(this.state.player[r][c]=="2") break;
                        if(this.state.player[r][c]=="1" && (this.state.piece[r][c]=="queen" || this.state.piece[r][c]=="bishop")) return true;
                    }
                    return false;
                }
            }
        }
    }
    isCheckOrMate() {
        if(this.state.whichPlayer=="2" && this.state.whiteCheck==1) {
            if(this.isWhiteInCheck()) {
                this.showError("Jesteś szachowany, wykonaj poprawny ruch!")
                this.undoMove();
                return;
            } else {
                this.setState({whiteCheck: 0});
            }
        }
        if(this.state.whichPlayer=="2" && this.isWhiteInCheck()) {
            this.showError("Nie możesz wykonać tego ruchu - będziesz szachowany!")
            this.undoMove();
            return;
        }
        else if(this.state.whichPlayer=="1" && this.isWhiteInCheck()) {
            console.log("Brawo! Szachujesz przeciwnika!");
            this.setState({whiteCheck: 1});
        }
        if(this.state.whichPlayer=="1" && this.state.blackCheck==1) {
            if(this.isBlackInCheck()) {
                this.showError("Jesteś szachowany, wykonaj poprawny ruch!")
                this.undoMove();
                return;
            } else {
                this.setState({blackCheck: 0});
            }
        }
        if(this.state.whichPlayer=="1" && this.isBlackInCheck()) {
            this.showError("Nie możesz wykonać tego ruchu - będziesz szachowany!")
            this.undoMove();
            return;
        }
        else if(this.state.whichPlayer=="2" && this.isBlackInCheck()) {
            console.log("Brawo! Szachujesz przeciwnika!");
            this.setState({blackCheck: 1});
        }
    }
    doMove(row, col) {
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
                    }, () => {this.isCheckOrMate()});
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
                    }, () => {this.isCheckOrMate()});
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
                        }, () => {this.isCheckOrMate()});
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
                        }, () => {this.isCheckOrMate()});
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
                    }, () => {this.isCheckOrMate()});
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
                    }, () => {this.isCheckOrMate()});
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
                        }, () => {this.isCheckOrMate()});
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
                        }, () => {this.isCheckOrMate()});
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
                        }, () => {this.isCheckOrMate()});
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
                        }, () => {this.isCheckOrMate()});
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
                    }, () => {this.isCheckOrMate()});
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
                    }, () => {this.isCheckOrMate()});
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
        this.setState({
            firstClickCol: "",
            firstClickRow: "",
            firstClickPiece: "",
            firstClickPlayer: ""
        })
    }
    knockoutKing()
    {
        var i = 0;
        var tabPiece = this.state.piece;
        console.log(tabPiece)
        tabPiece.forEach(element => {
            element.forEach(ele => {
                if(ele == "king")
                {
                    i++;
                }
            });
        });
        console.log(i)
    }
    squareClicked(row, col) {
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
        this.knockoutKing()
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
                <div id="wroc"><button onClick={() =>
                {
                    if(this.state.stepNumber == "0")
                    {
                        alert("Jeszcze nie wykonano ruchu, aby móc się cofać")
                    }
                    else
                    {
                        this.undoMove()
                    }
                }}>Cofnij ruch /{this.state.stepNumber}</button></div>
            </div>
        )
    }
}