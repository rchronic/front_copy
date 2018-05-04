<?php

namespace app\models;

use Yii;
use yii\base\Model;
use linslin\yii2\curl;

class Api extends Model {
    public $api_server = "http://localhost/cobacoba/back_copy/public/api/1.0/";

    public $USER_ID = null;
    public $TOKEN = null;
    public $PROPERTY_ID = null;

    function __construct() {
        $session = Yii::$app->getSession();
        $this->USER_ID = $session->get("USER_ID");
        $this->TOKEN = $session->get("TOKEN");
        $this->PROPERTY_ID = $session->get("PROPERTY");
    }

    public function send_request($target, $params = array(), $user_header = true) {
        $curl = new curl\Curl();

        $json = json_encode($params);

        $header = array('User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12',
        'Content-Type: application/json');

        if($user_header) {
            $header[] = "USER_ID: ".$this->USER_ID;
            $header[] = "TOKEN: ".$this->TOKEN;
            $header[] = "PROPERTY_ID".$this->PROPERTY_ID;
        }

        $response = $curl->setOption(CURLOPT_POSTFIELDS, $json)
                         ->setOption(CURLOPT_HTTPHEADER, $header)
                         ->post($this->api_server.$target);
        
        return json_decode($response);
    }

    public function get_user_data($target_user_id) {
        $params = array("user_id" => $target_user_id);

        $response = $this->send_request("admin/user/get", $params);

        return $response;
    }

    public function login($user, $password) {
        $params = array("user" => $user, "password" => $password);

        $response = $this->send_request("login",$params,false);

        return $response;
    }

    public function dashboard() {
        $params = array();

        $response = $this->send_request("admin/dashboard", $params);

        // echo "<pre><br>hasil-dashboardnya : ";
        // var_dump($this->USER_ID." ; ". $response ." ; ".$this->TOKEN);
        // echo "</pre><br>";
        // Yii::$app->end();
        
        return $response;
    }

    public function get_logs($start)
    {
        $params = array( "start" => $start );

        $response = $this->send_request("admin/logs", $params);

        return $response;
    }

    public function logout()
    {
        $params = array( "token" => $this->TOKEN, "user_id" => $this->USER_ID);

        $response = $this->send_request("logout", $params);

        return $response;
    }

    public function get_hotel_dashboard()
    {

        $response = $this->send_request("hotel/dashboard");

        return $response;
    }
}