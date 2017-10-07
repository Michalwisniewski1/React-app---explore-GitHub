import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

const SelectLanguage = (props) => {

    let languages = [
        'All',
        'JavaScript',
        'Ruby',
        'Java',
        'CSS',
        'Python'
    ];
    return (
        <ul className='languages'>
            {languages.map((language) => {
                return (
                    <li key={language} style={language === props.selectedLanguage
                        ? {
                            color: 'red'
                        }
                        : null} onClick={props.onSelect.bind(null, language)}>
                        {language}
                    </li>
                )
            })}</ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

const ReposGrid = (props) => {
    return (
        <ul className="popular-list">
            {props.repos.map((repo, index) => {
                return (
                    <li key={repo.name} className="popular-item">
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className="space-list-items">
                            <li>
                                <img className="avatar" src={repo.owner.avatar_url} alt={"Avatar for" + repo.owner.login}/>
                            </li>
                            <li>
                                <a href={repo.html_url}>{repo.name}</a>
                            </li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count}
                                stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(language) {
        this.setState(() => {
            return {selectedLanguage: language, repos: null}
        });
        api.fetchPopularRepos(language).then((repos) => {
            this.setState(() => {
                return {repos: repos}
            });
        });
    }
    render() {
        let repos = this.state.repos;

        return (
            <div>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage}/> {!repos
                    ? <Loading text="Downloading" speed={150}/>
                    : <ReposGrid repos={repos}/>}
            </div>
        )
    }
}

export default Popular;
