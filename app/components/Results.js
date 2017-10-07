import React from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

const Profile = (props) => {
    let info = props.info;
    return (
        <PlayerPreview avatar={info.avatar_url} username={info.login}>
            <ul className="space-list-items">
                {info.name && <li>Name: {info.name}</li>}
                {info.location && <li>Location: {info.location}</li>}
                {info.company && <li>Company: {info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li>
                    <a href={info.blog}>{info.blog}</a>
                </li>}
            </ul>
        </PlayerPreview>
    )
};

const Player = (props) => {
    return (
        <div>
            <h1 className="header">{props.label}</h1>
            <h3 style={{
                textAlign: 'center'
            }}>Score: {props.score}</h3>
            <Profile info={props.profile}/>
        </div>
    )
};

Player.propTypes = {
    label: propTypes.string.isRequired,
    score: propTypes.number.isRequired,
    profile: propTypes.object.isRequired
};

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        };
    }
    componentDidMount() {
        var players = queryString.parse(this.props.location.search);
        api.battle([players.playerOneName, players.playerTwoName]).then((results) => {
            if (results == null) {
                return this.setState(() => {
                    return {error: 'Check your connection! Looks like it is error', loading: false};
                });
            }
            this.setState(() => {
                return {error: null, winner: results[0], loser: results[1], loading: false};
            });
        });
    }

    render() {
        let error = this.state.error;
        let winner = this.state.winner;
        let loser = this.state.loser;
        let loading = this.state.loading;

        if (loading == true) {
            return <Loading text="Loading" speed={150}/>
        }

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }

        return (
            <div className="row">
                <Player label="Winner" score={winner.score} profile={winner.profile}/>
                <Player label="Loser" score={loser.score} profile={loser.profile}/>
            </div>
        )
    }
}

export default Results;
