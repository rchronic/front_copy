<?php

namespace app\controllers;

use Yii;

use yii\filters\AccessControl;
use yii\web\Controller;
use app\models\Master;
use yii\filters\VerbFilter;

class AdminController extends Controller {

    public $user_data;
    public $is_reset = false;
    public $dashboard;
    public $current_data;
    public $user_properties;
    public $activities;
    public $add_class = "";
    public $session_expired = false;

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

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex() {
        $master = new Master();
        // echo "<pre><br>hasilnya : ";
        // var_dump($master);
        // echo "</pre><br>";
        // Yii::$app->end();
        $this->user_data = $master->get_user_data();

        $this->redirect("admin/dashboard"); // error kalau masih login
    }

    public function actionLogin() {
        $master = new Master();

        $reset = false;

        if(isset($_GET["reset"])) {
            $reset = true;
        }
        
        $this->is_reset = $reset;
        $message = null;

        $model = new \yii\base\DynamicModel(['login_username', 'login_password']);
        $model->addRule(['login_username','login_password'], 'string', ['max'=>128]);
        $model->addRule(['login_username','login_password'], 'required');
        if($model->load(Yii::$app->request->post()) && $model->validate()) {
            $data = Yii::$app->request->post("DynamicModel");
            $res = $master->user_login($data["login_username"], $data["login_password"]);
            $res->dashboard = Yii::$app->homeUrl."admin/dashboard";
            die(json_encode($res));
        }
        $this->layout = "auth";
        return $this->render('login', [
            'model' => $model,
            'message' => $message,
            'reset' => $reset,
        ]);
    }

    public function actionDashboard() {

        $master = new Master();
        // echo "<pre><br>hasilnya : ";
        // var_dump($master);
        // echo "</pre><br>";
        // Yii::$app->end();
        $this->dashboard = $master->get_dashboard();
        $this->user_data = $master->get_user_data();
        $this->current_data = $master->get_current_data();
        $this->user_properties = $master->get_user_properties();
        $this->activities   = $master->get_logs(0);


        return $this->render('index', [
            'dashboard' => $this->dashboard,
            'activities' => $this->activities,
        ]);
    }

    public function actionGet_logs()
    {
        $master = new Master();

        if (Yii::$app->request->post("start") != null ) {
            $data = Yii::$app->request->post();
            $response = $master->get_logs($data["start"], true);
            die(json_encode($response));
        }
    }

    public function actionUser_logout()
    {
        $master = new Master();
        $master->user_logout();
        echo "<script> window.location.href = '".Yii::$app->homeUrl . "admin/login'; </script>";
    }
}