let db;
let objectStore;
obj={}

self.onmessage = function(event) {
console.log(event.data[0])
  switch (event.data[0]) {
 
 
    
    case "init":
      { f=""
        let req = indexedDB.open("edbsys", 1);
        req.onupgradeneeded = function(e) {
          let db = e.target.result;
          objectStore = db.createObjectStore('name', { keyPath: 'name' });
          f="Successfully upgraded db";
        };
        req.onsuccess = function(e) {
          db = req.result;self.postMessage(f+" Successfully opened db");
        };
        req.onerror = function(e) {
          self.postMessage("error IN INIT");
        };
      }
      break;
case "chece":
      {
        chece();
      }
      break;

    case "readAll":
      {
        readAll();
      }
      break;

    case "add":
      {
      obj=JSON.parse(event.data[1])
      
        add();
      }
      
          case "leggiuno":
      {
        leggiuno(event.data[1]);
      } 
      break;
         case "aggiorna":
      {
        aggiorna(event.data[1],event.data[2]);
      }

      break;
      
               case "uccidi":
      {
        uccidi(event.data[1]);
      } 
      break;
  }
};


function readAll() {
  let objectStore = db.transaction('name').objectStore('name');
  let users = [];

  objectStore.openCursor().onsuccess = function(event) {
    let cursor = event.target.result;

    if (cursor) {
      users[users.length]=Array(cursor.value.name , cursor.primaryKey);
      cursor.continue();
    } else {
      self.postMessage(JSON.stringify(users.sort()));
  };
}}

function add() {
  let request = db
    .transaction(["name"], "readwrite")
    .objectStore("name")
    .add(obj);

  request.onsuccess = function(event) {
    console.log("message: Successfully added user in db")
    
    self.postMessage("ciao ho fatto");
  };

  request.onerror = function(event) {
    console.log("something went wrong here");
  };
}

function chece(){
    let dat = indexedDB.databases();
dat.then(function(result) {
  self.postMessage(JSON.stringify(result));
}, function(err) {
  console.log(err); // Error: "It broke"
});
}

function leggiuno(chi){
let request = db
    .transaction("name")
    .objectStore("name")
    .get(chi);

  request.onsuccess = function(event) {
    self.postMessage(JSON.stringify(event.target.result));
  };

  request.onerror = function(event) {
    self.postMessage("something went wrong reading indexedDB");


}}

function uccidi(chi)
{
let objectStore = db.transaction('name', "readwrite").objectStore('name');

  objectStore.openCursor().onsuccess = function(event) {
    let cursor = event.target.result;
    if (cursor) {
      if (cursor.value.name===chi) {
        var request = cursor.delete();
        request.onsuccess = function() {
          console.log('ucciso ' + chi);
        };
      } 
      
      
      cursor.continue();
    } else {
      self.postMessage("R.I.P. ");
  };
}}
function aggiorna(cu,cosa){

let request = db.transaction('name', 'readwrite')
    .objectStore('name')
    .put(cosa);
request.onsuccess = function(event) {
    self.postMessage("aggiornato");
  };

  request.onerror = function(event) {
    self.postMessage("something went wrong reading indexedDB");
}
}
