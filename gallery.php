<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>
<!DOCTYPE html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<style>
body {margin:0;font-size: 1em; 
    background-color:white; color:white; 
    height: 100%;
    overflow-y: auto;
    overflow-x:hidden;
    justify-content: center;
}
button {font-size: 2em; /* 30px/16=1.875em */}
.indice {
text-align:  center; 
        top: 36px;
    padding: 15px; 
    cursor:pointer;color: black;
    display: flex;justify-content: center;
  flex-direction: row;  flex-wrap: wrap;
}
.indice > div {
width: 320px;
height: 320px;
margin: 10px;
padding: 5px;
border: rounded;
border-style: ridge;border-width: 3px;border-radius: 5px;border-color:#bbbbbb;
background-color:#eeeeee;
}
.iimg {
width:290px;
height:290px;
object-fit:contain;
border-radius:5%;

}
#nav {width: 100%;float: left;text-align:center;margin: 0 0 3em 0;padding: 0;list-style: none;background-color: #f2f2f2;border-bottom: 1px solid #ccc;border-top: 1px solid #ccc;}
#nav li {width: 25%;float: left;background-color: #d0d0d0;}
#nav li a {display: block;padding: 8px 15px;text-decoration: none;font-weight: bold;color: #000;}
#nav li b {display: block;padding: 8px 15px;text-decoration: none;font-weight: bold;color: #000;}
#nav li a:hover {color: #08f;background-color: #fff;}
#nav li b:hover {color: #08f;background-color: #fff; }
</style>



<script>
<?php
$token = explode("/",$_GET["cosa"]);
if (!$token[1]){$token[1]="id";}
chdir($token[1]);
$curd =  getcwd();
echo "\nvar immag=new Array();\n";
$d = dir($curd);
$a=0;
while (false !== ($entry = $d->read())) 
{
if (is_file($entry) &&  $entry<>$token[2])   {echo "immag[".$a."]=\"".$token[1]."/".$entry."\";\n";$a++;}
}
$d->close();
echo "";
?>
immag.sort()
var attivo=1
function cli(x){
var a0=document.getElementById("zero")
var a1=document.getElementById("uno")
var a2=document.getElementById("due")
var a3=document.getElementById("tre")
var a4=document.getElementById("qua")
if (x==0){pippo=a0}if (x==1){pippo=a1}if (x==2){pippo=a2}if (x==3){pippo=a3}if (x==4){pippo=a4}
chi=x
a0.style.background="#d0d0d0";a1.style.background="#d0d0d0";a2.style.background="#d0d0d0";a3.style.background="#d0d0d0";
pippo.style.background="white"
pagina()
//alert(pippo.innerHTML)
}
</script>
</head>
<body>

<table border="0" style="position: fixed;top:0px;color:white;background-color: #C43;width:100%; max-width: 400px;right:1;border-style: none;"><tbody><tr>
 <td id="b2" style="color:white;background-color: blue;font-size: 32px; text-align: center" width="20%" onclick="bott(2)">🔍</td>
 <td id="b3" style="color:white;background-color: black;font-size: 32px; text-align: center" width="20%" onclick="bott(3)">⊛</td>
 <td id="b4" style="color:white;background-color: black;font-size: 32px; text-align: center" width="20%" onclick="kf()">📷</td>
  <td id="b5" style="color:white;background-color: black;font-size: 32px; text-align: center" width="20%" onclick="formato()">⇧</td>
    </tr></tbody></table>
<span id="ident"style="background-color: black; color: white;position: fixed;top: 44px;left: 0px;"></span>    
<div id="Fdial" style="position: fixed;top: 36px;left: 0px;color:white;background-color: black;font-size: 32px; text-align: center;width:405px; visibility: hidden;" width=400 height=150>
<form id="spedisci" action="upload_file.php?dove=<?php echo $token[1]."/";?>" method="post" enctype="multipart/form-data" target="comeva">
<label for="url">  Url</label><br>
<input type="url" name="url" id="url"
       placeholder="blank for current site"
       pattern="https://.*" onchange="camburl()"><br>
<label for="file">  Add a photo</label><br>
<input type="file" name="file" id="file" /><br>
<input type="submit" name="submit" value="upload" />
</form>
<iframe name="comeva" style="color:#ff0000;"></iframe>
<br>
<button style="background-color: rgb(255, 136, 102); color: white;font-size: 32px;" onclick='el("Fdial").style.visibility="hidden"'>X</button>
</div>
<p><br>
<div id="pip2" class="indice"></div>
</p>
<script>
 function el(id){return document.getElementById(id);} 
if (opener){el("ident").innerText=opener.location.hash}else{el("ident").innerText=location.hash}

function camburl(){
localStorage.url=el("url").value
x=el("spedisci").action
x=x.substr(x.indexOf("?"))
if (el("url").value.length>0){
el("spedisci").action=el("url").value+"/php/upload_file.php"+x
el("spedisci").target="_blank"}
else {el("spedisci").action="upload_file.php"+x;el("spedisci").target="comeva"}
}

if(localStorage.url){el("url").value=localStorage.url;camburl()}
function formato(){
el("Fdial").style.visibility="visible"
}
for (var r = 0, n = immag.length; r < n; r++) {
var x = document.createElement("div");
const xx=r
x.onclick=function(){apridet(xx)}
textnode = document.createTextNode(immag[r]);
x.appendChild(textnode);
br = document.createElement("br");x.appendChild(br);
i = document.createElement("img");
i.classList.add("iimg")
i.loading="lazy" 
i.src=immag[r]
x.appendChild(i);
document.getElementById("pip2").appendChild(x);
}
document.getElementById("pip2").appendChild(x);
function apridet(che){
if (opener){opener.imgsite(immag[che]);window.close()}else{
window.open("corrimm.htm#"+immag[che],"Image","resizable,scrollbars,status")
}}
</script>



</body>
</html>
