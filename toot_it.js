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
    if (files.indexOf('*') === -1) { files = files + '*' }

    const allFiles = globSync(files, { cwd: './site/posts' });
    // console.log(`Files: ${files}, Result: ${allFiles}`);

    files = allFiles.sort(
        (a, b) => [a, b].map(
            (e) => e.slice(2).split("-", 4)).map(
                (e) => e.map(
                    (s) => parseInt(s)
                ).concat([0, 0, 0, 0])).map(
                    (e) => e.slice(0, 4).reverse().reduce(
                        (a, b, idx) => a + (idx === 0 ? 99 - b : b) * 100 ** idx
                    )
                ).reduce((a, b) => a >= b ? -1 : 1)
    );

    if (files.length > 2) {
        console.log(`Too many files: ${files.length}, will publish the latest: ${files[0]}`)
        files = [files[0]];
    }

    message = message.slice(2).join(' ');
    if (message === '') { message = 'Написал вот:' }

    console.log(`Will publish ${files.length} files`)
    for (file of files) {
        post = `${message} https://ambment.cat/posts/${file}`
        console.log('Attempting to post: ' + post)
        await client.post('statuses', { status: post }, function (err, data, response) {
            console.log(`Success: ${err === undefined ? '✓' : '✗'}, Data: ${JSON.stringify(data, null, 4)}, Response: ${response.statusCode}`)
        })
    }
}

main()
