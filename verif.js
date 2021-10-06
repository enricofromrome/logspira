const fs = require('fs');
  prendi="sistemi/metasys/menu";riga=0;h=""
  fs.readFileSync(prendi).toString().split('\n').forEach(function (line) {if (line.length>0){h+=`m[${riga}]=[`+line+"]\n";riga ++}});
console.log(h)