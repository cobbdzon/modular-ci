const fs = require('fs');
const { promisify } = require('util');

const includes_regex = /\[\[(.*?)\]\]/g;
const dev_script_regex = /<script src=".*modularDev\.js"><\/script>/g

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

    const element_data_cache = {}
    const promises = []

    for (let i = 0; i < filenames.length; i++) {
        const replace_pattern = includes_matches[i];
        const filename = filenames[i];

        if (element_data_cache[filename]) {
            promises[i] = new Promise((resolve) => {
                const element_data = element_data_cache[filename]
                new_html = new_html.replace(replace_pattern, element_data)
                resolve()
            })
        } else {
            promises[i] = readFile('./includes/' + filename).then((data) => {
                element_data = data.toString()
                new_html = new_html.replace(replace_pattern, element_data)
            }).catch(() => {
                new_html = new_html.replace(replace_pattern, "Failed to load: " + filename)
            })
        }
    }

    // html has been injected
    Promise.allSettled(promises).then(() => {
        new_html = new_html.replace(dev_script_regex, "")
        writeFile("./index.html", new_html)
    })
})