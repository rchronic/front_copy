<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\Master;
use app\models\Master_fnb;

class FnbController extends \yii\web\Controller
{
    /**
     * @inheritdoc
     */
    public $dashboard;
    public $activities;
    public $user_data;
    public $user_properties;
    public $hotel_dashboard;
    public $fnb_menu;
    public $add_class = "";
    public $session_expired = false;
    public $current_data;
    public $is_reset = false;
    public $depends = [
     'yii\bootstrap\BootstrapPluginAsset',
    ];

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionDashboard()
    {
        $master = new Master_fnb();

        $this->dashboard    = $master->get_dashboard();
        $this->user_data    = $master->get_user_data();
        $this->current_data    = $master->get_current_data();
        $this->user_properties = $master->get_user_properties();
        $this->activities   = $master->get_logs(0);
        $this->fnb_menu      = $master->get_fnb_menu();
        $this->layout = "fnb";

        return $this->render('home-fnb', [
            "dashboard"    => $this->dashboard,
            "activities"   => $this->activities
        ]);
    }









    /**
     * INGREDIENTS
     * 
     * vvv ingredients list vvv
     */
    public function actionIngredientsList()
    {
      $master = new Master_fnb();
      $master->set_json_result(false);
      $this->dashboard    = $master->get_dashboard();
      $this->user_data    = $master->get_user_data();
      $this->current_data    = $master->get_current_data();
      $this->user_properties = $master->get_user_properties();
      $this->activities   = $master->get_logs(0);
      $this->fnb_menu      = $master->get_fnb_menu();
      
      $this->layout = "fnb";

      return $this->render('ingredients-list', [
          "dashboard"    => $this->dashboard,
          "activities"   => $this->activities,
          "ingredients_list" => $master->get_ingredients_list()
      ]);
    }
    /**
     * ^^^ ingredients list ^^^
     */

    /**
     * vvv create ingredient vvv
     */
    public function actionCreate_ingredient()
    {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        unset($data["_csrf"]);
        unset($data["submit"]);

        $response = $master->create_ingredient($data);
        die(json_encode($response));
    }

    /**
     * ^^^ create ingredient ^^^
     */

    /**
     * vvv edit ingredient vvv
     */
    public function actionEdit_ingredient()
    {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        unset($data["_csrf"]);
        unset($data["submit"]);

        $response = $master->edit_ingredient($data["ingredient_id"]);
        die(json_encode($response));
    }

    public function actionUpdate_ingredient()
    {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        unset($data["_csrf"]);
        unset($data["submit"]);

        $response = $master->update_ingredient($data);
        die(json_encode($response));
    }
    /**
     * ^^^ edit ingredient ^^^
     */

    /**
     * vvv delete ingredient vvv
     */
    public function actionDelete_ingredient()
    {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        unset($data["_csrf"]);
        unset($data["submit"]);

        $response = $master->delete_ingredient($data["ingredient_id"]);
        die(json_encode($response));
    }
    /**
     * ^^^ delete ingredient ^^^
     */









    /**
     * CASH OPNAME
     * 
     * vvv cash opname list vvv
     */
    public function actionCashOpnameList() 
    {    
        $master = new Master_fnb();
        $master->set_json_result(false);
        $this->dashboard    = $master->get_dashboard();
        $this->user_data    = $master->get_user_data();
        $this->current_data    = $master->get_current_data();
        $this->user_properties = $master->get_user_properties();
        $this->activities   = $master->get_logs(0);
        $this->fnb_menu      = $master->get_fnb_menu();
        
        $this->layout = "fnb";

        return $this->render('cash-opname-list', [
            "dashboard"    => $this->dashboard,
            "activities"   => $this->activities,
            "cash_opname_list" => $master->cash_opname_list()
        ]);
    }
    /**
     * ^^^ cash opname list ^^^
     */

    /**
     * vvv cash opname detail
     */
    public function actionCash_opname_description()
    {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        $response = $master->get_cash_opname_description($data["cash_opname_id"]);
        die(json_encode($response));
    }
    /**
     * ^^^ cash opname detail ^^^
     */











    /**
     * CASHIER ANNOTATION
     * 
     * vvv cashier annotation list vvv
     */
    public function actionCashierAnnotationList()
    {
        $master = new Master_fnb();
        $master->set_json_result(false);
        $this->dashboard    = $master->get_dashboard();
        $this->user_data    = $master->get_user_data();
        $this->current_data    = $master->get_current_data();
        $this->user_properties = $master->get_user_properties();
        $this->activities   = $master->get_logs(0);
        $this->fnb_menu      = $master->get_fnb_menu();
        
        $this->layout = "fnb";

        return $this->render('cashier-annotation-list', [
            "dashboard"    => $this->dashboard,
            "activities"   => $this->activities,
            "cashier_annotation_list" => $master->cashier_annotation_list()
        ]);
    }
    /**
     * ^^^ cashier annotation list ^^^
     */

    /**
     * vvv create cashier annotation vvv
     */
    public function actionCreate_cashier_annotation() {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        unset($data["_csrf"]);
        unset($data["submit"]);

        $response = $master->create_cashier_annotation($data);
        die(json_encode($response));
    }
    /**
     * ^^^ create cashier annotation ^^^
     */

    /**
     * vvv edit cash opname real cash vvv
     */
    public function actionEdit_cashopname_real_cash()
    {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        unset($data["_csrf"]);
        unset($data["submit"]);

        $response = $master->edit_cashopname_real_cash($data["cashier_annotation_id"]);
        die(json_encode($response));
    }

    public function actionUpdate_cashopname_real_cash()
    {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        unset($data["_csrf"]);
        unset($data["submit"]);

        $response = $master->update_cashopname_real_cash($data);
        die(json_encode($response));
    }
    /**
     * ^^^ edit cash opname real cash ^^^
     */

    /**
     * vvv edit cash opname description vvv
     */
    public function actionEdit_cashopname_description()
    {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        unset($data["_csrf"]);
        unset($data["submit"]);

        $response = $master->edit_cashopname_description($data["cashier_annotation_id"]);
        die(json_encode($response));
    }

    public function actionUpdate_cashopname_description()
    {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        unset($data["_csrf"]);
        unset($data["submit"]);

        $response = $master->update_cashopname_description($data);
        die(json_encode($response));
    }
    /**
     * ^^^ edit cash opname description ^^^
     */

    /**
     * vvv edit cash opname status vvv
     */
    public function actionEdit_cashopname_status()
    {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        unset($data["_csrf"]);
        unset($data["submit"]);

        $response = $master->edit_cashopname_status($data["cash_opname_id"]);
        die(json_encode($response));
    }

    public function actionUpdate_cashopname_status()
    {
        $master = new Master_fnb();

        $data = Yii::$app->request->post();

        unset($data["_csrf"]);
        unset($data["submit"]);

        $response = $master->update_cashopname_status($data);
        die(json_encode($response));
    }
    /**
     * ^^^ edit cash opname status ^^^
     */
}
