const Masto = require('mastodon')
const {
    glob,
    globSync,
    globStream,
    globStreamSync,
    Glob,
} = require('glob')

// grab our token to make API requests
const { AUTH_TOKEN, MESSAGE } = process.env

// initialize our Mastodon API client
const client = new Masto({
    access_token: AUTH_TOKEN,
    timeout_ms: 60 * 1000
})

const main = async () => {
    files = globSync(`${MESSAGE}`, { cwd: './site/posts' });
    console.log(`Will publish ${files.length} files`)
    for (file of files) {
        post = `Написал вот: https://ambment.cat/posts/${file}`
        console.log('Attempting to post: ' + post)
        await client.post('statuses', { status: post }, function (err, data, response) {
            console.log(`Error: ${err}, Data: ${data}, Response: ${response}`)
        })
    }
}

main()