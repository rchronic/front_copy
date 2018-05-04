<?php

namespace app\models;

use Yii;
use yii\base\Model;
use linslin\yii2\curl;
use app\models\Master;
use app\models\Api_fnb;
/**
 * ContactForm is the model behind the contact form.
 */
class Master_fnb extends Model {
    public $api;
    public $main_master;

    function __construct()
    {
        $this->call_api();
    }

    public function call_api()
    {
        if ( $this->api == null ) {
            $this->api = new Api_fnb;
            $this->main_master = new Master;
        }

        return true;
    }

    public function get_dashboard()
    {
        return $this->main_master->get_dashboard();
    }

    public function get_user_data($userid = null)
    {
        return $this->main_master->get_user_data($userid);
    }

    public function get_current_data()
    {
        return $this->main_master->get_current_data();
    }

    public function get_user_properties()
    {
        return $this->main_master->get_user_properties();
    }

    public function get_hotel_dashboard()
    {
        return $this->main_master->get_hotel_dashboard();
    }

    public function get_logs($start, $return_full = false)
    {
        return $this->main_master->get_logs($start, $return_full);
    }

    // Just for Help to show menu concept
    public function get_fnb_menu()
    {
        $session = Yii::$app->getSession();
        if ( $fnb_menu = $session->get("fnb_menu") ) {

        }
        else {
            $fnb_menu = $this->api->get_fnb_menu();
            // echo "<pre><br>hasilnyass : ";
            // var_dump($fnb_menu);
            // echo "</pre><br>";
            // Yii::$app->end();
            $session->set("fnb_menu", $fnb_menu);
        }

        return $fnb_menu;
    }
}