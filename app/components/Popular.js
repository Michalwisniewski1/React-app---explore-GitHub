import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

function SelectLanguage({selectedLanguage, onSelect}) {

    const languages = [
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
                    <li key={language} style={language === selectedLanguage
                        ? {
                            color: 'red'
                        }
                        : null} onClick={() => onSelect(language)}>
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

function ReposGrid({repos}) {
    return (
        <ul className="popular-list">
            {repos.map(({
                name,
                owner,
                stargazers_count,
                html_url
            }, index) => (
                <li key={name} className="popular-item">
                    <div className="popular-rank">#{index + 1}</div>
                    <ul className="space-list-items">
                        <li>
                            <img className="avatar" src={owner.avatar_url} alt={"Avatar for" + owner.login}/>
                        </li>
                        <li>
                            <a href={html_url}>{name}</a>
                        </li>
                        <li>@{owner.login}</li>
                        <li>{stargazers_count}
                            stars</li>
                    </ul>
                </li>
            ))}
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
        this.setState(() => ({selectedLanguage: language, repos: null}));
        api.fetchPopularRepos(language).then((repos) => {
            this.setState(() => ({repos}));
        });
    }
    render() {
        const {repos, selectedLanguage} = this.state;

        return (
            <div>
                <SelectLanguage selectedLanguage={selectedLanguage} onSelect={this.updateLanguage}/> {!repos
                    ? <Loading text="Downloading" speed={150}/>
                    : <ReposGrid repos={repos}/>}
            </div>
        )
    }
}

export default Popular;
