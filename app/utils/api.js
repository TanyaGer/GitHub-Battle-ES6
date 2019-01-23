import axios from 'axios';
// const axios = require('axios');

const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_SECRET_ID';
const params = `?client_id=${id}&client_secret${sec}`;

async function getProfile (username) {
    const profile = await axios.get(`https://api.github.com/users/${username}`);
    return profile.data;
};

function getRepo (username) {
    return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
};

function getStarCount (repos) {
    return repos.reduce((count, {stargazers_count}) => count + stargazers_count, 0);
};

function calculateScore ({followers}, repos) {
    return (followers * 3) + getStarCount(repos);
};

function handleError (error) {
    console.warn(error);
    return null;
};

async function getUserData (player) {
    const [profile, data] = await axios.all([getProfile(player), getRepo(player)]);
        const repos = data.data;
        console.log(profile);
        return {
            profile,
            score: calculateScore(profile, repos)
        }
    
};

function sortPlayers (players) {
    return players.sort((a,b) => b.score - a.score);
}



export async function battle (players) {

    try {
        const results = await axios.all(players.map(getUserData));
        return sortPlayers(results);
    } catch (error) {
        handleError(error);
    }

}

export async function fetchPopularRepos (language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    try {
        const results = await axios.get(encodedURI)
        return results.data.items;
    } catch (error) {
        handleError(error);
    }
}






