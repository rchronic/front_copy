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

    public function set_json_result($val)
    {
        return $this->main_master->set_json_result($val);
    }

    public function get_dashboard()
    {
        return $this->main_master->get_dashboard();
    }

    public function get_data($result) {
        return $this->main_master->get_data($result);
    }

    public function get_simple_return($result)
    {
        return $this->main_master->get_simple_return($result);
    }

    public function catch_error($result)
    {
        return $this->main_master->catch_error($result);
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
        $ingredients_list = $this->api->get_ingredients_list();

        return $this->get_data($ingredients_list);
    }
    
    public function create_ingredient($data)
    {
        $res = $this->api->create_ingredient($data);

        return $this->get_simple_return($res);
    }

    public function edit_ingredient($ingredient_id)
    {
        $res["detail"] = $this->get_data($this->api->get_ingredient_detail($ingredient_id));

        return $res;
    }

    public function update_ingredient($data)
    {
        $res = $this->api->update_ingredient($data);

        return $this->get_simple_return($res);
    }

    public function delete_ingredient($ingredient_id)
    {
        $res = $this->api->delete_ingredient($ingredient_id);

        return $this->get_simple_return($res);
    }










    

    public function cash_opname_list()
    {
        $cash_opname_list = $this->api->cash_opname_list();

        return $this->get_data($cash_opname_list);
    }

    public function get_cash_opname_description($cash_opname_id)
    {
        $res = $this->api->get_cash_opname_description($cash_opname_id);

        return $this->get_data($res);
    }










    

    public function cashier_annotation_list()
    {
        $cashier_annotation = $this->api->cashier_annotation_list();
        // echo "<pre><br>hasilny : ";
        // var_dump($cashier_annotation);
        // echo "</pre><br>";
        // Yii::$app->end();

        return $this->get_data($cashier_annotation);
    }

    public function create_cashier_annotation($data)
    {
        $res = $this->api->create_cashier_annotation($data);

        return $this->get_simple_return($res);
    }

    public function edit_cashopname_real_cash($cashier_annotation_id)
    {
        $res["detail"] = $this->get_data($this->api->get_cashopname_real_cash_detail($cashier_annotation_id));

        return $res;
    }

    public function update_cashopname_real_cash($data)
    {
        $res = $this->api->update_cashopname_real_cash($data);

        return $this->get_simple_return($res);
    }

    public function edit_cashopname_description($cashier_annotation_id)
    {
        $res["detail"] = $this->get_data($this->api->get_cashopname_description_detail($cashier_annotation_id));

        return $res;
    }

    public function update_cashopname_description($data)
    {
        $res = $this->api->update_cashopname_description($data);

        return $this->get_simple_return($res);
    }

    public function edit_cashopname_status($cash_opname_id)
    {
        $res["detail"] = $this->get_data($this->api->get_cashopname_status_detail($cash_opname_id));

        return $res;
    }

    public function update_cashopname_status($data)
    {
        $res = $this->api->update_cashopname_status($data);

        return $this->get_simple_return($res);
    }
}

