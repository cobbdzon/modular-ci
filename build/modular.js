const fs = require('fs');

fs.readFile('./index.html', (err, data) => {
    if (err) throw err;
    console.log(data);
});