<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
$users = array('enrico' => 'edbedb', 'piera' => 'pmampmam');
header("Pragma: no-cache");
if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
    header('WWW-Authenticate: Basic realm="Res. area"');
    header('HTTP/1.0 401 Unauthorized');
    echo '<span style="color:#ffffff;">no login no upload.</span>';
    exit;} else {
    $tu=$_SERVER['PHP_AUTH_USER'];   
    echo "<p>Hello {$tu}.</p>";
 if (array_key_exists($tu, $users)) {   
    echo "<p>You entered {$_SERVER['PHP_AUTH_PW']} as your password.I expected ".$users[$tu]."</p>";
    }else{echo '<span style="color:#ffffff;">user unknown.</span>';
    exit;}
}
?>
<!DOCTYPE html>
<head>
<style>
body
{
font-family:"Palatino Linotype", "Book Antiqua", Palatino, serif;
font-size:20px;
background-color:#000000;
color:#ffffff;
TEXT-ALIGN: justify;
}
span.titolo
{
float:left;
}


</style>
</head><body>
<?php
if ($_POST["carta"]){
echo strlen( $_POST["carta"])."<br>";
echo $_POST["nome"]."<br>";
echo $_POST["tipo"]."<br>";
echo $_POST["segreto"]."<br>";
echo $_GET["cosa"]."<br>";
$coso=substr($_GET["cosa"],1).$_POST["nome"].".".$_POST["tipo"];
echo $coso."<br>";
$img = $_POST['carta']; 
$img = str_replace('data:image/webp;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
file_put_contents($coso, $data);
echo "saved!!!"."<br>";
}
else
{
$allowedExts = array("jpg", "jpeg", "gif", "png","webp");
$extension = end(explode(".", $_FILES["file"]["name"]));
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/png")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/webp"))
&& in_array($extension, $allowedExts))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
    }
  else
    {
    echo "Upload: " . $_FILES["file"]["name"] . "<br>";
    echo "Type: " . $_FILES["file"]["type"] . "<br>";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
    echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";

    if (file_exists($_GET["dove"] . $_FILES["file"]["name"]))
      {
      echo $_FILES["file"]["name"] . " already exists. ";
      }
    else
      {
      move_uploaded_file($_FILES["file"]["tmp_name"],
      $_GET["dove"]. $_FILES["file"]["name"]);
      echo "Stored in: " . $_GET["dove"] . $_FILES["file"]["name"];
      echo "<script>parent.location.reload();</script>";
      }
    }
  }
else
  {
  echo "Invalid file size:".$_FILES["file"]["size"];
  }
}
?>
<button onclick="parent.document.getElementById('salvatore').style.visibility='hidden';">X</button>
<body>
