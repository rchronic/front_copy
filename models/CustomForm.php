<?php

namespace app\models;

use yii\base\Model;

class CustomForm extends Model {
    public $namex;
    public $email;

    public function rules() {
        return [
            [
                ['namex','email'], 'required',
            ],
            [
                'email','email'
            ],
        ];
    }
}