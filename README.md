### Start develop server for local network access

## Develop command
[Source](https://github.com/gatsbyjs/gatsby/issues/5801#issuecomment-395786936)
`$ gatsby develop -H $HOSTNAME -p 8000`

## Incoming date format
All the dates received and query with graphql are YYYYMMDD. This helps to correctly order and posterior formating with getDate function (utils.js) and moment.js.

## Responsiveness and breakpoints with include-media
https://www.npmjs.com/package/include-media
## Run Storybook
`$ npm run storybook`
### Deploy pre-requisites
- Install AWS CLI (https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- Install AWS Credentials
    
    Unix:
    `$ export AWS_ACCESS_KEY_ID="your_key_id"`
    `$ export AWS_SECRET_ACCESS_KEY="your_secret_key"`
    
    Or ~/.aws/credentials
    [default]
    aws_access_key_id = <YOUR_ACCESS_KEY_ID>
    aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>