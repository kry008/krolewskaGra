import React from 'react';
import '../index.css';

export default class Square extends React.Component {
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