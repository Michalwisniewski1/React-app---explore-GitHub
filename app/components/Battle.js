import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

let PlayerPreview = (props) => {
    return (
        <div>
            <div className="col">
                <img className="avatar" src={props.avatar} alt={'Avatar for ' + props.username}/>
                <h2 className="username">@{props.username}</h2>
            </div>
            <buton className="reset" onClick={props.onReset.bind(null, props.id)}>Reset</buton>
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        let value = e.target.value;
        console.log(value);
        this.setState(() => {
            return {username: value}
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username)
    }
    render() {
        return (
            <form className="col" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">
                    {this.props.label}
                </label>
                <input id="username" placeholder="Github username" type="text" autoComplete="off" value={this.state.username} onChange={this.handleChange}/>
                <button className="button" type="submit" disabled={!this.state.username}>Submit</button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleReset(id) {
        this.setState(() => {
            let newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        });
    }

    handleSubmit(id, username) {
        this.setState(() => {
            let newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        });
    }
    render() {
        let match = this.props.match;
        let playerOneName = this.state.playerOneName;
        let playerTwoName = this.state.playerTwoName;
        let playerOneImage = this.state.playerOneImage;
        let playerTwoImage = this.state.playerTwoImage;
        return (
            <div>
                <div className="row">
                    {!playerOneName && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmit}/>}
                    {playerOneImage !== null && <PlayerPreview avatar={playerOneImage} username={playerOneName} onReset={this.handleReset} id="playerOne"/>}
                    {!playerTwoName && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit}/>}
                    {playerTwoImage !== null && <PlayerPreview avatar={playerTwoImage} username={playerTwoName} onReset={this.handleReset} id="playerOne"/>}
                </div>
                {playerOneImage && playerTwoImage && <Link className="button" to={{
                    pathname: match.url + '/results',
                    search: `?playerOneName=` + playerOneName + '&playerTwoName=' + playerTwoName
                }}>
                    Battle
                </Link>}
            </div>
        )
    }
}

module.exports = Battle;
