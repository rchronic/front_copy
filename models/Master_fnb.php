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

    public function get_data($result) {
        if(isset($result->status) && $result->status == true) {
            return $result->data;
        } else {
            die("<script>
                window.location.href = '".Yii::$app->homeUrl."admin/login';
            </script>");
        }
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

    public function get_ingredients_list()
    {
        $session = Yii::$app->getSession();
        if ( $ingredients_list = $session->get("fnb_ingredients_list") ) {
            
        }
        else {
            $ingredients_list = $this->api->get_ingredients_list();
            $session->set("fnb_ingredients_list", $ingredients_list);
        }

        return $this->get_data($ingredients_list);
    }

    public function edit_ingredient($ingredient_id)
    {
        $res["detail"] = $this->get_data($this->api->get_ingredient_detail($ingredient_id));

        return $res;
    }

    public function update_ingredient($data)
    {
        $res = $this->api->update_ingredient($data);

        return $res;
    }





    public function cash_opname_list() {
        $session = Yii::$app->getSession();
        if ( $cash_opname_list = $session->get("cash_opname_list") ) {
            
        }
        else {
            $cash_opname_list = $this->api->cash_opname_list();
            $session->set("cash_opname_list", $cash_opname_list);
        }

        return $this->get_data($ingredients_list);
    }

    public function cashier_annotation() {
        $session = Yii::$app->getSession();
        if ( $cashier_annotation = $session->get("cashier_annotation") ) {
            
        }
        else {
            $cashier_annotation = $this->api->cashier_annotation();
            $session->set("cashier_annotation", $cashier_annotation);
        }

        return $this->get_data($cashier_annotation);
    }
}

