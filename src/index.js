const https = require('https')
const options = {
  hostname: 'www.google.com',
  port: 443,
//  path: '',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
    const fs = require('fs');
     fs.writeFile("output.xlsx",d,(err) => {
       if (err) throw err;
      })
  })
})
console.log('The file has been saved!');
req.on('error', error => {
  console.error(error)
})

req.end()