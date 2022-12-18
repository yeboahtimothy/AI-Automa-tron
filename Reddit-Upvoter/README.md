
# Reddit Upvoter
A simple script to upvote posts in a subreddit that meet a certain upvote threshold.

## Prerequisites
* Node.js and npm (or yarn)
* A Reddit account and API key

## Getting Started
1. clone the repository
```git 
git clone https://github.com/yeboahtimothy/reddit-upvoter.git
cd reddit-upvoter
```

2. Install the dependencies
```git 
npm install
```

3. Create a file named `.env` and add your Reddit API credditials: (Optional) You can add you credential in the scripts.
```
USERNAME=your-reddit-username
PASSWORD=your-reddit-password
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
```
4. Run the script (bot) with the following command
```
node upvoter.js --subreddit r/<subreddit> --threshold <threshold> --maxUpvotes <maxUpvotes>
```
Replace <subreddit> with the name of the subreddit to upvote posts in, <threshold> with the minimum number of upvotes a post must have to be upvoted, and <maxUpvotes> with the maximum number of posts to upvote.
