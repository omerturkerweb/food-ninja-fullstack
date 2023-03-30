<?php
    header('Access-Control-Allow-Origin: *'); 
    header('Content-Type: application/json');

$charset = 'utf8';
$host = 'localhost';
$dbName = 'ninjafooddb';
$dbUsername = 'root';
$dbPassword = '';
 
    try{
    $db = new PDO("mysql:host={$host};dbname={$dbName};charset={$charset}",$dbUsername,$dbPassword);
          
           if($_SERVER['REQUEST_METHOD'] === 'POST'){
                $action = $_POST['action'];
                switch($action){
                    case 'add-user':    
                        $name = $_POST['name'];
                        $surname = $_POST['surname'];
                        $mail = $_POST['email'];
                        $password = $_POST['password'];
                    $insertQuery = $db->prepare("insert into users set user_name = :user_name , user_surname = :user_surname , user_mail = :user_mail, user_password = :user_password");  
                    $insert = $insertQuery->execute([
                        'user_name' => $name,
                        'user_surname' => $surname,
                        'user_mail' => $mail,
                        'user_password' => $password,
                    ]);
                    $selectQuery = $db->query("select * from users")->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode($selectQuery); 
                        break;

                        case 'user-login':
                            $mail = $_POST['mail'];
                            $password = $_POST['password'];
                            $selectQuery = $db->prepare("select * from users where user_mail = :mail and user_password = :password");
                            $selectQuery->execute([
                                ':mail' => $mail,
                                ':password' => $password,
                            ]);
                            $user = $selectQuery->fetch(PDO::FETCH_ASSOC);
                            if ($user) {
                          
                                echo json_encode($user);
                            } else {
                                echo json_encode('invalid values');
                            } 
                                break;
                    
                }
            }
    }catch(PDOException $e) {
        $e->getMessage();
    }