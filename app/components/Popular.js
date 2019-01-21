var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');


function SelectLanguage (props) {

    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className='languages'>
            {languages.map(function (lang) {
                return (
                <li 
                onClick={props.onSelect.bind(null, lang)}
                style={lang === props.selectedLanguage ? {color: 'red'} : null}
                key={lang}>
                    {lang}
                </li>
                )
            })}
        </ul>
    )

};

function RepoGrid (props) {
    // console.log(props.repos);
    return (
        <ul className='popular-list'>
            {props.repos.map(function(repo, index){
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rang'>#{index + 1}</div>
                        <ul className='space-list-item'>
                            <li>
                                <img 
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
};

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedLanguage: PropTypes.string.isRequired
};


class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repo: null
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    };

    componentDidMount () {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage (lang) {
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repo: null
            }
        });

        api.fetchPopularRepos (lang)
            .then(function (result) {
                console.log(result);
                this.setState(function () {
                    return {
                        repo: result
                    }
                });
            }.bind(this));
    }

    render () {

        return (
            <div>
                <SelectLanguage
                onSelect={this.updateLanguage}
                selectedLanguage={this.state.selectedLanguage}
                />

                {!this.state.repo ? <Loading /> : <RepoGrid repos={this.state.repo} />}

                
            </div>


        )
    };
};

module.exports = Popular;

