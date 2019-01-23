import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';


function SelectLanguage ({onSelect, selectedLanguage}) {

    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className='languages'>
            {languages.map((lang) => {
                return (
                <li 
                onClick={() => onSelect(lang)}
                style={lang === selectedLanguage ? {color: 'red'} : null}
                key={lang}>
                    {lang}
                </li>
                )
            })}
        </ul>
    )

};

function RepoGrid ({repos}) {
    // console.log(props.repos);
    return (
        <ul className='popular-list'>
            {repos.map(({name, owner, stargazers_count, html_url}, index) => (
                    <li key={name} className='popular-item'>
                        <div className='popular-rang'>#{index + 1}</div>
                        <ul className='space-list-item'>
                            <li>
                                <img 
                                    className='avatar'
                                    src={owner.avatar_url}
                                    alt={'Avatar for ' + owner.login}
                                />
                            </li>
                            <li><a href={html_url}>{name}</a></li>
                            <li>@{owner.login}</li>
                            <li>{stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            )}
        </ul>
    )
};

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
};

SelectLanguage.propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedLanguage: PropTypes.string.isRequired
};


class Popular extends React.Component {
    
    state = {
            selectedLanguage: 'All',
            repos: null
        };
 

    componentDidMount () {
        this.updateLanguage(this.state.selectedLanguage);
    };

    updateLanguage = async (lang) => {
        this.setState(() => {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        const repos = await fetchPopularRepos (lang);
        this.setState(() => ({repos}));
    
    };

    render () {

        const {repos, selectedLanguage} = this.state;

        return (
            <div>
                <SelectLanguage
                onSelect={this.updateLanguage}
                selectedLanguage={selectedLanguage}
                />

                {!repos ? <Loading /> : <RepoGrid repos={repos} />}                
            </div>


        )
    };
};

export default Popular;

