<?php

namespace app\models;

use Yii;
use yii\base\Model;
use app\models\Api;

class Master extends Model {
    public $api;
    public $json=true;

    function __construct() {
        $this->call_api();
    }

    public function call_api() {
        if($this->api == null) {
            $this->api = new Api;
        }

        return true;
    }

    public function set_json_result($val)
    {
        $this->json = $val;
    }

    public function get_simple_return($result)
    {
        $this->catch_error($result);
        if (isset($result->data)) {
            unset($result->data);
        }

        return $result;
    }

    public function catch_error($result)
    {
        if (isset($result->status) && $result->status == false) {
            if ($this->json) {
                die(json_encode($result));
            } else {
                if (isset($result->error_code) && ($result->error_code == "E1001" || $result->error_code == "E1002")) {
                    die("<script> window.location.href = '".Yii::$app->homeUrl . "admin/login'; </script>");
                } else {
                    die($result->message);
                }
            }
        } elseif (!isset($result->status)) {
            if ($this->json) {
                $json_res = [ "status" => false,
                              "message" => "<pre>" . var_export($result, true) . "</pre>"];
                die(json_encode($json_res));
            } else {
                die("<pre>" . var_export($result, true) . "</pre>");
            }
        }

        return array(false, $result->message);
    }

    public function get_data($result) {
        if(isset($result->status) && $result->status == true) {
            return $result->data;
        } else {
            die("<script>
                window.location.href = '".Yii::$app->homeUrl."admin/login';
            </script>");
        }
    }

    public function get_user_data($userid = null) {
        $session = Yii::$app->getSession();

        if($userid == null) {
            $userid = $session->get("USER_ID");
        }

        if($session->get("USER_DATA") != null && $userid == $session->get("USER_ID")) {
            $user_data = $session->get("USER_DATA");
            // echo "<pre><br>hasilnya : ";
            // var_dump($user_data);
            // echo "</pre><br>";
            // Yii::$app->end();
        } else {
            $res = $this->api->get_user_data($userid); // inti harus ada userid, userid didapat dari login
            // echo "<pre><br>hasilnya : ";
            // var_dump($res);
            // echo "</pre><br>";
            // Yii::$app->end();
            $user_data = $this->get_data($res);
            $session->set("USER_DATA",$user_data);
        }

        return $user_data;
    }

    public function user_login($user, $password) {
        $result = $this->api->login($user,$password);
        // echo "<pre><br>hasil : ";
        // var_dump($result);
        // echo "</pre><br>";
        // Yii::$app->end();
        if($result->status) {
            $data = $result->data;
            $session = Yii::$app->getSession();
            $session->set("TOKEN", $data->TOKEN);
            $session->set("USER_ID", $data->USER_ID);
            $session->set("user", json_encode($data->user));
            $session->set("properties", json_encode($data->properties));
            foreach($data->properties as $index => $property) {
                if($property->selected) {
                    $session->set("PROPERTY", $property->propertyCode);
                }
            }
        }
        return $result;
    }

    public function get_dashboard() {
        $session = Yii::$app->getSession();
        if($session->get("DASHBOARD") != null) {
            $data = $session->get("DASHBOARD");
        } else {
            $res = $this->api->dashboard();
            // echo "<pre><br>hasilnya : ";
            // var_dump($res);
            // echo "</pre><br>";
            // Yii::$app->end();
            $data = $this->get_data($res);
            $session->set("DASHBOARD", $data);
        }
        return $data;
    }

    public function get_current_data() {
        $session = Yii::$app->getSession();
        $user_data = json_decode($session->get("user"));
        return $user_data;
    }

    public function get_user_properties() {
        $session = Yii::$app->getSession();
        $properties = json_decode($session->get("properties"));
        return $properties;
    }

    public function get_logs($start, $return_full = false)
    {
        $res = $this->api->get_logs($start);

        if ( $return_full )
            return $res;
        else
            return $this->get_data($res);
    }

    public function user_logout()
    {
        $session = Yii::$app->getSession();
        $result = $this->api->logout();

        if ( $session->destroy() )
            return true;
        else
            return false;
    }
}