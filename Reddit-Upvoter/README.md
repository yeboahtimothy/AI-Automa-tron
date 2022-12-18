
# Reddit Upvoter v.0.1.0
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

## How it Works
The script uses the snoowrap library to authenticate with the Reddit API and retrieve the top posts in a subreddit for the past week. It then iterates through the top posts and upvotes those that meet the specified upvote threshold.

The script also includes a throttle function to ensure that the requests are spaced out at least 1 second apart in order to comply with Reddit's API rate limits.

## Additional Options
*  To specify a different time period for the top posts, pass the --time flag with a value of hour, day, week, month, or year.
*  To change the interval at which the request count and last request time are reset, adjust the value in the setInterval function at the end of the script. The value is in milliseconds, so a value of 60000 resets the count and time every minute.
  
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
  
# License
This project is licensed under the MIT License - see the LICENSE file for details.
  
## Additional Notes
* The throttle function is used to ensure that the requests are spaced out at least 1 second apart in order to comply with Reddit's API rate limits.
* The script includes a setInterval function at the end that resets the request count and last request time every minute. This is to prevent the script from getting stuck if the throttle function is unable to reset the request count and time.
  
# Tips
* It is recommended to use a dedicated Reddit account and API key for this script, as upvoting too many posts in a short period of time may cause your account to be flagged as spam.
* Be mindful of the subreddit's rules and the Reddit community guidelines when using this script. Upvoting posts that violate these rules or guidelines may result in your account being banned.
  
## Conclusion
This script can be a useful tool for quickly upvoting high-quality posts in a subreddit, but is important to use it responsibly and in 
accordance with the rules of the subreddit and the Reddit Community.



  
  
