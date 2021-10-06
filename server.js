const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 9000;

const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
};

http.createServer(function (req, res) {
  console.log(`${req.connection.remoteAddress} ${req.method} ${req.url}`);
  const parsedUrl = url.parse(req.url);
  const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
  let pathname = path.join(__dirname, sanitizePath);

  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    // if is a directory, then look for index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.htm';
    }
   if (pathname.substr(pathname.length-11,11)=="sistemi.php"){console.log("ho preso sistemi")
   h=`<!DOCTYPE HTML>
   <head>
   <title>edb 2019</title>
   <meta charset="UTF-8">
   <script>
   function loadsys(quale){
   top.document.getElementById("ciapasys").src="onesys.php?sistemi/"+quale
   }
   </script>
   </head>
   <p id="testo" style="color:#ffdd00;">
   Available systems to load:<br>`
   fs.readdir("sistemi/",(errd,files) => {
     files.forEach(file => {h=h+`<button onclick=\"loadsys('${file}')\">${file}</button><br>`})
     h=h+"</p>"
     res.end(h)
   })
   return
  }

  if (pathname.substr(pathname.length-10,10)=="onesys.php"){console.log("ho preso onesys")
  h=`<!DOCTYPE HTML>
  <head>
  <title>edb 2019</title>
  <meta charset="UTF-8">
  <script>
  init=0
  w = new Worker("./handleDb.js");
  w.onmessage = function(event) {
  console.log(event.data)
  if (init==2){top.sys=obj;top.m=top.sys.menu;top.disegna(0);top.chiudi("ciapasys")}
  if (init==0){document.getElementById("testo").innerHTML = "Loaded "+event.data;init++}
  };
  w.postMessage(["init"]);`
  h=h+ `m=[];edb=[]\n`
  prendi=parsedUrl.query+"/menu";riga=0
  fs.readFileSync(prendi).toString().split('\n').forEach(function (line) {if (line.length>0){h+=`m[${riga}]=[`+line+"]\n";riga ++}});
  prendi=parsedUrl.query+"/edbsys";riga=0;h+="edb[0]=[]\n"
  fs.readFileSync(prendi).toString().split('\n').forEach(function (line) {if (line.length>0){
    matr=line.split(",")
    if (matr[0]>riga){riga=matr[0];h+=`edb[${matr[0]}]=[]\n`}
    h+=`edb[${matr[0]}][${matr[1]}]=[`
    for (zz=0;zz<matr.length;zz+=1){h+=`${matr[zz].replace(/^\s+|\s+$/g, '')}`
  if (zz<(matr.length-1)){h+=","}
  }
    h+="]\n"}
  });
  h=h+`
    obj={"name":location.href.substring(location.href.lastIndexOf("/")+1),"menu":m,"edbsys":edb}
    function aggiungi(){w.postMessage(["add",JSON.stringify(obj)])}
    function controlla(){if (init==1){init++;aggiungi()}else{setTimeout("controlla()",40)}}
    controlla()
    </script>
    </head>
    <p id="testo" style="color:#ffdd00;">
    
    </p>`
    res.end(h)
 
  return
 }
    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });


}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);
