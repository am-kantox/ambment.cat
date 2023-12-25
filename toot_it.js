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
    message = `${MESSAGE}`.split(" ");
    files = message[1];
    if (files === undefined) { files = '*' }

    const allFiles = globSync(files, { cwd: './site/posts' });
    console.log(`Files: ${files}, Result: ${allFiles}`);

    files = allFiles.sort(
        (a, b) => [a, b].map(
            (e) => e.slice(2).split("-").map(
                (i) => parseInt(i)
            ).reverse().reduce(
                (a, b, idx) => a + b * 100 ** idx
            )
        ).reduce((a, b) => a > b ? -1 : 1)
    );

    if (files.length > 3) {
        console.log(`Will NOT publish ${files.length} files (too many)`)
        return null;
    }

    message = message.slice(2).join(' ');
    if (message === '') { message = 'Написал вот:' }

    console.log(`Will publish ${files.length} files`)
    for (file of files) {
        post = `${message} https://ambment.cat/posts/${file}`
        console.log('Attempting to post: ' + post)
        client.post('statuses', { status: post }, function (err, data, response) {
            console.log(`Error: ${err}, Data: ${data}, Response: ${response}`)
        })
    }
}

main()