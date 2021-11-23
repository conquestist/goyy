<?php 
     function getIPAddress() {  
    //whether ip is from the share internet  
     if(!emptyempty($_SERVER['HTTP_CLIENT_IP'])) {  
                $ip = $_SERVER['HTTP_CLIENT_IP'];  
        }  
    //whether ip is from the proxy  
    elseif (!emptyempty($_SERVER['HTTP_X_FORWARDED_FOR'])) {  
                $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];  
     }  
//whether ip is from the remote address  
    else{  
             $ip = $_SERVER['REMOTE_ADDR'];  
     }  
     return $ip;  
}  
$ip = getIPAddress();  
    $aa = "sssss";
    ?>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="style.css"/>
  </head>
  <body id="bod">

    <script type="text/javascript">var ipp = '<?=$ip?>';</script>
    <script src="jquery-3.6.0.min.js"></script>
    <script src="client.min.js"></script>
    <script src="main.js"></script>
    <div id="tool">
      
    </div>
    <div id="di">
    <img id="img" src="pics/back2.jpg"/>
    <img id="ball" src="pics/ball2.png"/>
    <input id="inp" type="text" />
    <button onclick="ss()" id="btn" >ask</button>
    </div>
  </body>
</html>
