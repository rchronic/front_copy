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

    public function actionIngredientsList()
    {
      $master = new Master_fnb();

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






    public function actionCashOpnameList() {
        $master = new Master_fnb();

        $this->dashboard    = $master->get_dashboard();
        $this->user_data    = $master->get_user_data();
        $this->current_data    = $master->get_current_data();
        $this->user_properties = $master->get_user_properties();
        $this->fnb_menu      = $master->get_fnb_menu();
        $this->hotel_dashboard = $master->get_hotel_dashboard();
        $this->layout = "fnb";

        return $this->render('cash-opname-list', [
            "dashboard"    => $this->dashboard,
            "activities"   => $this->activities,
            "ingredients_list" => $master->cash_opname_list()
        ]);
    }

    public function actionCashierAnnotation() {
        $master = new Master_fnb();

        $this->dashboard    = $master->get_dashboard();
        $this->user_data    = $master->get_user_data();
        $this->current_data    = $master->get_current_data();
        $this->user_properties = $master->get_user_properties();
        $this->fnb_menu      = $master->get_fnb_menu();
        $this->hotel_dashboard = $master->get_hotel_dashboard();
        $this->layout = "fnb";

        return $this->render('cashier-annotation', [
            "dashboard"    => $this->dashboard,
            "activities"   => $this->activities,
            "ingredients_list" => $master->cashier_annotation()
        ]);
    }
}
