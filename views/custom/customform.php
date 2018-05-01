<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

if(Yii::$app->session->hasFlash('success')) {
    echo "<div class='alert alert-success'>".Yii::$app->session->getFlash('success')."</div>";
}

$json = '["apple","orange","banana","strawberry"]';
$ar = json_decode($json);
// access first element of $ar array
echo $ar[0]; // apple

echo "<br><br>";

$json = '{
    "title": "JavaScript: The Definitive Guide",
    "author": "David Flanagan",
    "edition": 6
}';
$book = json_decode($json);
// access title of $book object
echo $book->title; // JavaScript: The Definitive Guide 

echo "<br><br>";

// $json same as example object above
// pass true to convert objects to associative arrays
$book = json_decode($json, true);
// access title of $book array
echo $book['edition']; // JavaScript: The Definitive Guide

?>

<?php $form = ActiveForm::begin(); ?>
<?= $form->field($model,'namex'); ?>
<?= $form->field($model,'email'); ?>

<?= Html::submitButton('Submit',['class'=>'btn btn-success']); ?>

<?php $form = ActiveForm::end(); ?>
