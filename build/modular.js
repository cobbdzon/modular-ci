const fs = require('fs');

const replace_regex = /(\[\[.*?\]\])/;
const filename_regex = /\[\[(.*?)\]\]/;

fs.readFile('./index.html', (err, data) => {
    if (err) throw err;
    
    // Transform data Buffer to string.
    let str_data = data.toString();
    const includes_matches = str_data.match(replace_regex);
    const filename_matches = str_data.match(filename_regex);
    console.log(includes_matches, filename_matches)
});