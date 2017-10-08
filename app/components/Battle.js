import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

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
        const value = e.target.value;
        this.setState(() => ({username: value}))
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username)
    }
    render() {
        const {username} = this.state;
        const {label} = this.props;

        return (
            <form className="col" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">
                    {label}
                </label>
                <input id="username" placeholder="Github username" type="text" autoComplete="off" value={username} onChange={this.handleChange}/>
                <button className="button" type="submit" disabled={!username}>Submit</button>
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
        this.setState(() => ({
            [id + 'Name']: '',
            [id + 'Image']: null
        }));
    }

    handleSubmit(id, username) {
        this.setState(() => ({
            [id + 'Name']: username,
            [id + 'Image']: `https://github.com/${username}.png?size=200`
        }));
    }
    render() {
        const {playerOneName, playerTwoName, playerOneImage, playerTwoImage} = this.state;
        const {match} = this.props;
        return (
            <div>
                <div className="row">
                    {!playerOneName && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmit}/>}
                    {playerOneImage !== null && <PlayerPreview avatar={playerOneImage} username={playerOneName}>
                        <buton className="reset" onClick={() => this.handleReset('playerOne')}>Reset</buton>
                    </PlayerPreview>}
                    {!playerTwoName && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit}/>}
                    {playerTwoImage !== null && <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
                        <buton className="reset" onClick={() => this.handleReset('playerTwo')}>Reset</buton>
                    </PlayerPreview>}
                </div>
                {playerOneImage && playerTwoImage && <Link className="button" to={{
                    pathname: match.url + '/results',
                    search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                }}>
                    Battle
                </Link>}
            </div>
        )
    }
}

export default Battle;
