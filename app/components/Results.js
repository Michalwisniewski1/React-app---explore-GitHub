var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount() {
        var players = queryString.parse(this.props.location.search);
        api.battle([players.playerOneName, players.playerTwoName]).then((results) => {
            if (results == null) {
                return this.setState(() => {
                    return {error: 'Check your connection! Looks like it is error', loading: false}
                });
            }
            console.log(results);
            this.setState(() => {
                return {error: null, winner: results[0], loser: results[1], loading: false}
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
            <div>dd</div>
        )
    }
}

module.exports = Results;
