const fs = require('fs');
const { promisify } = require('util');

const includes_regex = /\[\[(.*?)\]\]/g;

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

readFile("./index.html").catch(console.error).then((data) => {
    // Transform data Buffer to string.
    const raw_html = data.toString();
    new_html = raw_html

    const includes_matches = raw_html.match(includes_regex);

    const filenames = raw_html.match(includes_regex);
    filenames.forEach((str, index) => {
        filenames[index] = str.slice(2, -2)
    })

    const files = []
    const promises = []

    for (let i = 0; i < filenames.length; i++) {
        const replace_pattern = includes_matches[i];
        const filename = filenames[i];

        promises[i] = readFile('./includes/' + filename).then((data) => {
            element_data = data.toString()
            new_html = new_html.replace(replace_pattern, element_data)
            console.log("libron")
        }).catch(() => {
            new_html = new_html.replace(replace_pattern, "Failed to load: " + filename)
        })
    }

    // html has been injected
    Promise.allSettled(promises).then(() => {
        writeFile("./index.html", new_html)
    })
})