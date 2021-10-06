<!DOCTYPE HTML>
<head>
<title>edb 2019</title>
<meta charset="UTF-8">
<script>
init=0
w = new Worker("./handleDb.js");
w.onmessage = function(event) {
console.log(event.data)
if (init==2){top.sys=obj;top.m=top.sys.menu;top.disegna(0);top.chiudi("ciapasys")}
//if (init==1){init++;aggiungi()}
if (init==0){document.getElementById("testo").innerHTML = "Loaded "+event.data;init++}
};
w.postMessage(["init"]);
obj={}
<?php
chdir("sistemi/".$_SERVER['QUERY_STRING']);

if (file_exists($_SERVER['QUERY_STRING'].".json"))
{
$z=$_SERVER['QUERY_STRING'].".json";
echo "obj=".file_get_contents($z);
}
else
{
echo "\nm=[];edb=[]\n";
$menu = file("menu");
$edb = file("edbsys");
foreach ($menu as $ln => $r){echo "m[".$ln."]=[".str_replace("\n","",$r)."]\n";}
foreach ($edb as $ln => $r){
$k=explode(",",",".$r);
if ($k[1]==0){echo "edb[".$k[2]."]=[]\n";}
echo "edb[".$k[1]."][".$k[2]."]=[".str_replace("\n","",$r)."]\n";
//echo $k[1]."-".$k[2]."\n";
}
echo 'nomen=location.search.substring(1)'."\n";
echo 'obj={"name":nomen,"menu":m,"edbsys":edb}';
}
?>

function aggiungi(){w.postMessage(["add",JSON.stringify(obj)])}
function controlla(){if (init==1){init++;aggiungi()}else{setTimeout("controlla()",40)}}
controlla()
</script>
</head>
<p id="testo" style="color:#ffdd00;">

</p>
