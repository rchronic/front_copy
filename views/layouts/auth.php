<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
use app\assets\CustomAssets;

CustomAssets::register($this);
AppAsset::register($this);
$reset = Yii::$app->controller->is_reset;

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='/assets/icon/pipe/favicon.ico' rel='icon' type='image/x-icon'/>
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <link rel="stylesheet" href="<? echo Yii::$app->homeUrl ?>assets/css/datepicker.css">
    <link rel="stylesheet" href="<? echo Yii::$app->homeUrl ?>assets/css/stylesheet.css">
</head>
<body>
<?php $this->beginBody() ?>

    <?= $content ?>

    <div class="copyright text-center">
        <p>&copy; 2017 Pipe All Rights Reserved.</p>
        <p><a href="">Privacy</a> & <a href="">Terms</a></p>
    </div>
</div>

<?php $this->endBody() ?>
</body>
</html>

<?php $this->endPage() ?>
<!-- message -->
<div class="modal fade just-modal" tabindex="2" role="dialog" id="message-modal" style="z-index: 1100">
  <div class="modal-dialog short-modal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button> -->
        <h4 class="modal-title" id="message-title">Message</h4>
      </div>

      <div class="modal-body">
        <p id="message-result"></p>
      </div>

      <div class="modal-footer">
            <input type="submit" value="OK" id="message-button">
      </div>

    </div>
  </div>
</div>
<!-- message -->
<script src="<? echo Yii::$app->homeUrl ?>assets/js/bootstrap.min.js"></script>
<script src="//cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
<script src="<? echo Yii::$app->homeUrl ?>assets/js/datepicker.js"></script>
<script src="<? echo Yii::$app->homeUrl ?>assets/js/main.js"></script>

<script>
    setTimeout( function() { checkField() }, 100);
    $('#auth-notif').fadeIn();
    <?php
        if ( $reset ) {
            echo "setTimeout( function(){ $('#auth-notif').fadeOut() }, 4000);";
        }
        else {
            echo "document.getElementById('auth-notif').style.display = 'none';";
        }
    ?>
</script>
