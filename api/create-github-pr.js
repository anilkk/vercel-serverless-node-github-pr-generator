import { Octokit } from "@octokit/core";
require('dotenv').config();

export default async function handler(request, response) {
    const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN }),
        owner = 'anilkk',
        repo = 'test-repolisten-to-lokalise-webhook-repo',
        title = 'My Lokalise test Pull Request',
        body = 'This pull request is a test!',
        head = 'my-lokalise-feature-branch',
        base = 'main';


    const response = await octokit.request(
        `POST /repos/{owner}/{repo}/pulls`, { owner, repo, title, body, head, base }
    );

    response.status(200).json({
        body: request.body,
        query: request.query,
        cookies: request.cookies,
    });
}