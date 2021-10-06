<!DOCTYPE HTML>
<head>
<title>edb 2019</title>
<meta charset="UTF-8">
<script>
function loadsys(quale){
top.document.getElementById("ciapasys").src="onesys.php?"+quale
}
</script>
</head>
<p id="testo" style="color:#ffdd00;">
Available systems to load:<br>
<?php
$f=0;
$dove="sistemi";
//$dove="../immagsuon";
chdir($dove);
$curd = getcwd();
$d = dir($curd);
while (false !== ($entry = $d->read())) 
{
$interv[]=date ("Y m d H:i:s", filemtime($entry)).$entry;
}
rsort($interv);
foreach ($interv as $key => $val) {
$f=$f+1;

if (strlen(substr($val,19,30))>5)
 {echo "<button onclick=\"loadsys('".substr($val,19,30)."')\">".substr($val,19,30)."</button>".substr($val,0,19);
  echo "<br>";
}}
$d->close();
#?>
</p>
