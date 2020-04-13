const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname, { dotfiles: 'allow' } ));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/.well-known/acme-challenge/_3iq9bJ1SPOiFcuuZZjF_0dbzZgvH_BlnUrvGnoEoEQ.pMSELCC2Txhkj2M7kVCrvt9OgDHRTk0CX9Tjyx7uPNE', function(req, res) {
    res.status(200);
    res.send('_3iq9bJ1SPOiFcuuZZjF_0dbzZgvH_BlnUrvGnoEoEQ.pMSELCC2Txhkj2M7kVCrvt9OgDHRTk0CX9Tjyx7uPNE');
  });
  
app.get('/.well-known/acme-challenge/oloaLzvMd5zifxHIj4Civj7pGx1FVwy8Imof74DMje4.pMSELCC2Txhkj2M7kVCrvt9OgDHRTk0CX9Tjyx7uPNE', function(req, res) {
    res.status(200);
    res.send('oloaLzvMd5zifxHIj4Civj7pGx1FVwy8Imof74DMje4.pMSELCC2Txhkj2M7kVCrvt9OgDHRTk0CX9Tjyx7uPNE');
  });
  
app.listen(port, () =>
console.log(`Server is listening on port: ${port}`));


