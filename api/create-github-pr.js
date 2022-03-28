import { Octokit } from "@octokit/core";
require('dotenv').config();
const axios = require('axios').default;

export default async function handler(request, response) {
    try {
        // Step 1: Get the SHA of main branch
        const mainSha = (await axios.get('https://api.github.com/repos/anilkk/listen-to-lokalise-webhook-repo/git/refs/heads/main')).data.object.sha;
        console.log('mainSha -->',mainSha);

        // Step 2: Prepare for GIT API Request
        const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN }),
            owner = 'anilkk',
            repo = 'listen-to-lokalise-webhook-repo',
            title = 'My Lokalise test Pull Request',
            body = 'This pull request is a test!',
            head = 'my-lokalise-feature-branch',
            branchName = `listen-to-lokalise-webhook-repo-${Date.now()}`,
            base = 'main',
            ref = `refs/heads/${branchName}`,
            sha = mainSha;
        
        // Step 3: Create a new branch
        const reposiotry = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
            owner,
            repo,
            ref,
            sha
        })

        console.log('CREAT A BRANCH ->', JSON.stringify(reposiotry));
        
        // Step 4: Add files to the newly created branch 
        // Step 5: Create a pull request
        // const res = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
        //     owner,
        //     repo,
        //     head: branchName,
        //     base,
        //     title,
        //     body
        // })
        // console.log('NEW PR RESULT', JSON.stringify(res));
    } catch (error) {
        console.log('ERROR', error);
    }
    response.status(200).json({
        body: request.body,
        query: request.query,
        cookies: request.cookies,
    });
}