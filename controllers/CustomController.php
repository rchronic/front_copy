<?php

namespace app\controllers;

use Yii;
// use yii\filters\AccessControl;
use yii\web\Controller;
// use yii\web\Response;
// use yii\filters\VerbFilter;
use app\models\CustomForm;

class CustomController extends Controller
{
    public function actionCustomForm() {
        $model = new CustomForm();

        if($model->load(Yii::$app->request->post()) && $model->validate()) {
            Yii::$app->session->setFlash('success', 'You have entered the data correctly');
        }

        return $this->render('customform',['model'=>$model]);
    }
}