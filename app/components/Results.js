import React from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';

const Player = (props) => {
    return (
        <div>
          <h1 className="header">{props.label}</h1>
          <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
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
            console.log(results);
            this.setState(() => {
                return {error: null, winner: results[0], loser: results[1], loading: false};
            });
        });
    }

    render() {
        var error = this.state.error;
        var winner = this.state.winner;
        var loser = this.state.loser;
        var loading = this.state.loading;

        if (loading == true) {
            return <p>Loading...</p>
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

module.exports = Results;
