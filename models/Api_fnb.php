<?php

namespace app\models;

use Yii;
use yii\base\Model;
use linslin\yii2\curl;

/**
 * ContactForm is the model behind the contact form.
 */
class Api_fnb extends Model {
    public $api_server = "http://localhost/cobacoba/back_copy/public/api/1.0/";

    public $TOKEN = null;
    public $USER_ID = null;
    public $PROPERTY_ID = null;

    function __construct()
    {
         // die("work!");
        $session    = Yii::$app->getSession();
        $this->USER_ID = $session->get("USER_ID");
        $this->TOKEN = $session->get("TOKEN");
        $this->PROPERTY_ID = $session->get("PROPERTY");

        // $this->TOKEN = "FzDIBMlvuiFmaX7uu45RfrfjesEp7coM-4rbWz";
        // $this->USER_ID = "D3vU5";
        // $this->PROPERTY_ID = "Pr0p7";
    }

    public function send_request($target, $params = array(), $user_header = true)
    {
        //Init curl
        $curl = new curl\Curl();

        $json = json_encode($params);

        $header =array(
              'User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12',
              'Content-Type: application/json'
        );

        if ( $user_header ) {
            $header[] = "USER_ID: ".$this->USER_ID;
            $header[] = "TOKEN: ".$this->TOKEN;
            $header[] = "PROPERTY_ID: ".$this->PROPERTY_ID;
        }

        $response = $curl->setOption( CURLOPT_POSTFIELDS, $json )
                         ->setOption( CURLOPT_HTTPHEADER, $header )
                         ->post( $this->api_server . $target );

        return json_decode($response);
    }

    public function get_fnb_menu()
    {
        $response = $this->send_request("fnb/dashboard/menu");
        return $response;
    }
}