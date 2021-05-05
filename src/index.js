const https = require('https')
const fs = require("fs")
const xlsx = require("xlsx")
const filepath ="./response.json"

const options = {
  hostname: 'google.com',
  port: 443,
  //path: '/test',
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  let body = "";
  res.on('data', d => {
    body += d;
  });
  res.on("end", () => {
    try {
          fs.writeFileSync(filepath, body);
          console.log('The file has been saved!');

          readJsonFile();     
    } catch (error) {
        console.error(error.message);
    };
});
})

req.on('error', error => {
  console.error(error)
})

req.end()

function readJsonFile() {
  console.log('Reading file!');
  var rawFile = fs.readFileSync(filepath)
  const raw = JSON.parse(rawFile);

  var files  = []
  for (each in raw){
      files.push(raw[each])
      }  
    var obj = files.map((e) =>{
          return e
        })

  var newWB = xlsx.utils.book_new();
  var newWS = xlsx.utils.json_to_sheet(obj)
  xlsx.utils.book_append_sheet(newWB,newWS,"responses")
  xlsx.writeFile(newWB,"Response.xlsx")

  console.log('Excel created!');
}