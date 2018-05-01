<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
use app\assets\CustomAssets;
use yii\bootstrap\ActiveForm;

// CustomAssets::register($this);
AppAsset::register($this);

$dashboard  = Yii::$app->controller->dashboard;
$activities = Yii::$app->controller->activities;
$user_data  = Yii::$app->controller->user_data;
$user_cache = Yii::$app->controller->current_data;
$user_properties = Yii::$app->controller->user_properties;
$add_class = Yii::$app->controller->add_class;
$session_expired = Yii::$app->controller->session_expired;
$activities = [];

foreach ( $user_properties as $property ) {
    if ( $property->selected ) {
        $user_selected_property = $property;
    }
}

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

    <header>
        <div class="header-left">
            <a href="<? echo Yii::$app->homeUrl ?>admin/dashboard"><div class="logo" style="background-image:url('<? echo Yii::$app->homeUrl ?>assets/icon/logo/logo_breezz.png');"></div></a>
            <div class="menu">
                <div class="menu-button clickable" target="#menu-button">
                    <img src="<? echo Yii::$app->homeUrl ?>assets/icon/more/ic_menu_idle@2x.png" alt="">
                    <span>Menu</span>
                </div>
            </div>
        </div>
        <div class="header-right">
            <div class="profile clickable" target="#profile">
                <div class="img-profile">
                    <div class="img" style="background-image:url('<? echo Yii::$app->homeUrl ?>assets/photo/<? echo $dashboard->profile->icon?>');"></div>
                </div>
                <div class="data-profile">
                    <div class="name-user"><? echo $user_cache->name ?></div>
                    <div class="add-user"><? echo $user_selected_property->propertyName ?></div>
                </div>
            </div>
            <div class="button button-logs clickable" target="#button-logs">
                <span>Logs</span>
            </div>
            <div class="button button-i clickable" target="#button-i">
                <span>i</span>
            </div>
        </div>
    </header>

    <div class="menu-overlay float-box" id="menu-button">
        <div class="menu-overlay-wrapper">
            <div class="col-xs-12 zero">
                <ul>
                    <li id="admin-dashboard"><a href="<? echo Yii::$app->homeUrl; ?>">Home</a></li>
                </ul>
            </div>
            <div class="menu-section">
                <ul>
                    <li>Service 
                        <ul>
                            <?
                            foreach( $dashboard->services as $service ) {
                            ?>
                                <li id="<? echo str_replace("/","-",$service->uri) ?>"><a href="<? echo Yii::$app->homeUrl . $service->uri; ?>"><? echo $service->label; ?></a></li>
                            <?  } ?>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="menu-section">
                <ul>
                    <li>USER MANAGEMENT <ul>
                    <?
                    foreach( $dashboard->user as $user_access ) {
                    ?>
                        <li id="<? echo str_replace("/","-",$user_access->uri); ?>"><a href="<? echo Yii::$app->homeUrl . $user_access->uri; ?>"><? echo $user_access->label?></a></li>
                <?  } ?>
                    </ul>
                </li>
                </ul>
            </div>
            <div class="menu-section">
                <ul>
                    <li>PROPERTY MANAGEMENT <ul>
                    <?
                    foreach( $dashboard->property as $property ) {
                    ?>
                        <li id="<? echo str_replace("/","-",$property->uri); ?>"><a href="<? echo Yii::$app->homeUrl . $property->uri; ?>"><?echo $property->label ?></a></li>
                <?  } ?>
                    </ul>
                </li>
                </ul>
            </div>
        <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
        <div class="menu-overlay-footer _close" target="#menu-button">
            <span>>></span>
        </div>
    </div>

    <div class="notif-overlay float-box" id="profile">
        <div class="notif-header">
            <div class="notif-title _close" target="#profile">
                Your Profile
            </div>
        </div>
        <div class="notif-content">
            <ul>
                <li><a>Property</a>
                    <ul class="property-option">
                <?
                    foreach( $user_properties as $property ) {
                        if ( $property->selected ) {
                ?>
                            <li class="current" id="<? echo $property->propertyCode; ?>" property-name="<? echo $property->propertyName; ?>" property-icon="<? echo $property->icon ?>"><a href=""><? echo $property->propertyName; ?></a></li>
                <?
                        }
                        else {
                ?>
                            <li class="" id="<? echo $property->propertyCode; ?>" property-name="<? echo $property->propertyName; ?>" property-icon="<? echo $property->icon ?>"><a href=""><? echo $property->propertyName; ?></a></li>
                <?
                        }
                    }
                ?>
                    </ul>
                </li>
                <li><a href="" id="settings">Settings</a></li>
                <li><a href="<? echo Yii::$app->homeUrl ?>admin/user_logout">Logout</a></li>
            </ul>
        </div>
    </div>

    <div class="notif-overlay float-box" id="button-i">
        <div class="notif-header">
            <div class="notif-title _close" target="#button-i">
                Information
            </div>
        </div>
        <div class="notif-content">
            <p>A bit confuse here and there? Don’t worry we can help you.</p>
            <ul class="inline">
                <li><a href="">Glossary</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Tour</a></li>
            </ul>
        </div>
    </div>

    <div class="notif-overlay float-box" id="button-logs">
        <div class="notif-header">
            <div class="notif-title _close" target="#button-logs">
                Logs Activity
            </div>
        </div>
        <div class="notif-content long-activity">
            <ul class="activity">
                <?php
                    if ( is_array($activities) ) {
                        foreach( $activities as $activity ) {
                ?>
                    <li>
                        <div class="thumb">
                            <img src="<? echo Yii::$app->homeUrl ?>assets/photo/<? echo $activity->icon ?>" alt="">
                        </div>
                        <? echo $activity->text; ?>
                        <div class="date"><? echo $activity->date; ?></div>
                    </li>
                <?php
                        }
                    }
                ?>
            </ul>
            <div class="view-all">
                <?php $form = ActiveForm::begin([
                                    'id' => 'form-view-more',
                                    'action' =>['admin/get_logs'],
                                    'fieldConfig' => [
                                        'options' => [
                                            'tag' => false,
                                        ],
                                    ]
                ]); ?>
                    <input type="hidden" id="start" name="start" value="<? echo count($activities); ?>" />

                    <p id="view-more">View more</p>
                    <p class="text-right" id="goup"></p>
                <?php ActiveForm::end(); ?>
            </div>
        </div>
    </div>

    <div class="content <?echo $add_class ?>">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= $content ?>
    </div>
</div>

<footer>
    <div class="section text-left"><p>Powered by:</p> <img src="<? echo Yii::$app->homeUrl ?>assets/icon/logo/logo_footer_pipe.png" alt=""></div>
    <div class="section text-center"><p>&copy;2017 Pipe All Rights Reserved.</p></div>
    <div class="section text-right"><p><a href="">Privacy</a> & <a href="">Terms</a></p></div>
    <div class="clearfix"></div>
</footer>

<!-- session-expired -->
<div class="modal fade just-modal" data-backdrop="static" tabindex="-1" role="dialog" id="session-expired" style="z-index: 99990;">
  <div class="modal-dialog short-modal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button> -->
        <h4 class="modal-title">You left your previous session</h4>
      </div>

      <div class="modal-body">
        <p>It seems like you left your session. Do you want to resume your previous session?</p>
      </div>

      <div class="modal-footer">
            <a href="<? echo Yii::$app->homeUrl ?>admin/login" class="button">No, I want a new start</a>
            <input type="submit" value="Yes, I do">
      </div>

    </div>
  </div>
</div>
<!-- session-expired -->

<!-- your-session-expired -->
<div class="modal fade just-modal" data-backdrop="static" tabindex="-1" role="dialog" id="your-session-expired" style="z-index: 99991;">
  <div class="modal-dialog short-modal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button> -->
        <h4 class="modal-title">Your session is expired</h4>
      </div>

    <?php $form = ActiveForm::begin([
                        'id' => 'form-session-expired',
                        'action' =>['admin/reset_session'],
                        'fieldConfig' => [
                            'options' => [
                                'tag' => false,
                            ],
                        ]
                    ]); ?>
      <div class="modal-body">
        <p>Enter your password to continue what you left.</p>

        <div class="clearfix"></div>

            <div class="auth-form" style="margin-top:30px">
                <div id="pass">
                    <!-- span target harus sama dengan div id di atas comment ini -->
                <label for="" class="_show">Password <span class="password" target="#pass">Show</span></label>
                <div class="clearfix">
                    <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->
                    <input type="Password" name="password" required="" placeholder="type here" class="" id="password">
                    <div class="clear"></div>
                    <div class="error">Please fill the password box above</div>
                </div>
                </div>
            </div>

      </div>

      <div class="modal-footer">
            <a href="/forgot" class="button">Forgot password. Help!</a>
            <input type="submit" value="Resume Session">
      </div>
    <?php ActiveForm::end(); ?>

    </div>
  </div>
</div>
<!-- your-session-expired -->

<!-- message -->
<div class="modal fade just-modal" tabindex="2" role="dialog" id="message-modal" style="z-index: 99992;">
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
            <input type="submit" value="OK" id="message-button" data-dismiss="modal" aria-label="Close">
      </div>

    </div>
  </div>
</div>
<!-- message -->

<!-- edit-profile -->
<div class="modal fade just-modal" tabindex="-1" role="dialog" id="edit-profile">
  <div class="modal-dialog short-modal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
        <h4 class="modal-title">Edit Profile</h4>
      </div>

    <?php $form = ActiveForm::begin([
                        'id' => 'form-edit-profile',
                        'action' =>['admin/edit_profile'],
                        'fieldConfig' => [
                            'options' => [
                                'tag' => false,
                            ],
                        ]
                    ]); ?>

        <div class="modal-body">
            <div class="auth-form">
				<input type="hidden" name="user_id" value="<? echo $user_cache->id ?>" />
                <label for="">Name*</label>
                <div class="clearfix">
                    <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->
                    <input type="text" name="full_name" required="" placeholder="type here" class="" value="">
                    <div class="clear"></div>
                    <div class="error">Please fill the name box above</div>
                </div>

                <label for="">Email Address*</label>
                <div class="clearfix">
                    <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->
                    <input type="email" name="email" required="" placeholder="for example pipe@contact.com" class="" value="">
                    <div class="clear"></div>
                    <div class="error">Please fill the email box above</div>
                </div>

<!--                 <label for="">Email Address*</label>
                <div class="clearfix"> -->
                    <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->
<!--                     <input type="email" name="employee_id" required="" placeholder="for example pipe@contact.com" class="" >
                    <div class="clear"></div>
                    <div class="error">Please fill the Employee ID box above</div>
                </div> -->

                <label for="">Username <small>(You can use any numbers, symbols, except space " ")</small></label>
                <div class="clearfix">
                    <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->
                    <input type="text" name="user_name" placeholder="for example langitbiru_90" value="">
                    <div class="clear"></div>
                    <div class="error">Please fill the password box above</div>
                </div>

                <label for="">Phone Number</label>
                <div class="clearfix">
                    <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->
                    <input type="text" name="phone" required="" placeholder="type here" value="">
                    <div class="clear"></div>
                    <div class="error">Please fill the phone box above</div>
                </div>

            <div class="clearfix"></div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="button" data-dismiss="modal" aria-label="Close" class="button">Cancel</button>
            <input type="submit" name="submit" value="Save">
        </div>
      </div>
      <?php ActiveForm::end(); ?>

    </div>
  </div>
</div>
<!-- edit-profile -->

<!-- change-password -->
<div class="modal fade just-modal" tabindex="-1" role="dialog" id="change-password">
  <div class="modal-dialog short-modal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
        <h4 class="modal-title">Change Password</h4>
      </div>

    <?php $form = ActiveForm::begin([
                        'id' => 'form-change-password',
                        'action' =>['admin/change_password'],
                        'fieldConfig' => [
                            'options' => [
                                'tag' => false,
                            ],
                        ]
                    ]); ?>

        <div class="modal-body">
            <div class="auth-form">

                <div id="cpass">
                    <!-- span target harus sama dengan div id di atas comment ini -->
                <label for="" class="_show">Current Password <span class="password" target="#cpass">Show</span></label>
                <div class="clearfix">
                    <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->
                    <input type="Password" name="old_password" required="" placeholder="type here" class="" id="password">
                    <div class="clear"></div>
                    <div class="error">Please fill the password box above</div>
                </div>
                </div>


                <div id="pass">
                    <!-- span target harus sama dengan div id di atas comment ini -->
                <label for="" class="_show">New Password <span class="password" target="#pass">Show</span></label>
                <div class="clearfix">
                    <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->
                    <input type="Password" name="new_password" required="" placeholder="type your new password here" class="" id="password">
                    <div class="clear"></div>
                    <div class="error">Please fill the password box above</div>
                </div>
                </div>


                <div id="fpass">
                    <!-- span target harus sama dengan div id di atas comment ini -->
                <label for="" class="_show">Re-type New Password <span class="password" target="#fpass">Show</span></label>
                <div class="clearfix">
                    <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->
                    <input type="Password" name="new_password2" required="" placeholder="re-type new password here" id="password">
                    <div class="clear"></div>
                    <div class="error">Password doesn’t match. Re-check the red textfields will you?</div>
                </div>
                </div>

            <div class="clearfix"></div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="button" data-dismiss="modal" aria-label="Close" class="button">Cancel</button>
            <input type="submit" name="submit" value="Save">
        </div>

        <?php ActiveForm::end(); ?>

      </div>


    </div>
  </div>
</div>
<?php $this->endBody() ?>

<script>
        // If session expired
    <?
        if ( $session_expired ) {
            echo "\$('#your-session-expired').on('shown.bs.modal', {backdrop: 'static', keyboard: false});";
            echo "\$('#session-expired').on('shown.bs.modal', {backdrop: 'static', keyboard: false});";
            echo "\$('#session-expired').modal('show');";
        }

        $uri = $_SERVER["REQUEST_URI"];

        if ( strlen($uri) > 3 ) {
            $id = str_replace("/", "-", substr($uri, 1, strlen($uri)-1));
            $id = str_replace("pipe-web-","",$id);

            echo "try {
                    console.log('ID Res', \$('#$id'));
                    \$('#$id').addClass('current');
                } catch(e) {
                    console.log('Error');
                }";
        }

    ?>

    var homeUrl = "<? echo Yii::$app->homeUrl; ?>";
    console.log("homeurl", homeUrl);
</script>


<div class="loading">
    <div class="spinner"></div>
</div>

<?php $this->endPage() ?>
<script src="//cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
<script src="<? echo Yii::$app->homeUrl ?>assets/js/datepicker.js"></script>
<script src="<? echo Yii::$app->homeUrl ?>assets/js/main.js"></script>
</body>
</html>
