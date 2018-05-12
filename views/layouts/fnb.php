<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
use yii\bootstrap\ActiveForm;
use yii\helpers\Url;

AppAsset::register($this);

$dashboard  = Yii::$app->controller->dashboard;
$activities = Yii::$app->controller->activities;
$user_data  = Yii::$app->controller->user_data;
$user_cache = Yii::$app->controller->current_data;
$user_properties = Yii::$app->controller->user_properties;
$fnb_menu      = Yii::$app->controller->fnb_menu;
$add_class = Yii::$app->controller->add_class;
$session_expired = Yii::$app->controller->session_expired;

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
    <link rel="stylesheet" href="<? echo Yii::$app->homeUrl ?>assets/css/swiper.min.css">
    <link rel="stylesheet" href="<? echo Yii::$app->homeUrl ?>assets/css/stylesheet.css">
    <!-- yang buat sendiri -->
    <link rel="stylesheet" href="<? echo Yii::$app->homeUrl ?>assets/css/stylesheet_hotel.css">
    <link rel="stylesheet" href="<? echo Yii::$app->homeUrl ?>assets/css/stylesheet_fnb.css">
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
                    <li>Service <ul>
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

    <!-- buat layout -->
    <div class="content background-users">

        <div class="row-eq-height">

            <!-- buat sisi kiri layout -->
            <div class="header-side">
                <?
                // echo "<pre>" . var_export($hotel_menu, true) . "</pre>";
                ?>
                <ul>
                <?
                    $main_uri = $_SERVER["REQUEST_URI"];
                    if ( strlen($main_uri) > 3 ) {
                        $current_uri = str_replace("pipev2/web/","",$main_uri);
                    }
                    else {
                        $current_uri = null;
                    }
                    $nom = 0;
                    foreach ( $fnb_menu as $main_menu ) { ?>
                    <?
                        if ( count($main_menu->submenu) > 0 ) {
                            $main_menu_class = "";
                            $ul_css = "";
                            foreach( $main_menu->submenu as $sub_menu ) {
                                if ( $current_uri == $sub_menu->uri ) {
                                    $main_menu_class = "current";
                                    $ul_css = "display: block";
                                }
                            } ?>
                            <li class="sub-menu <?echo $main_menu_class?>">
                            <?
                                $nom++;
                            ?>
                                <a href="<? echo Yii::$app->homeUrl . str_replace("/fnb","fnb",$main_menu->uri) ?>" class="icon <? echo $main_menu->icon ?>"><? echo $main_menu->label ?></a>
                                <ul style="<?echo $ul_css ?>">
                                <?  foreach( $main_menu->submenu as $sub_menu ) {
                                        $class = ( $current_uri == $sub_menu->uri ) ? "current" : "";
                                ?>
                                        <li class="<? echo $class ?>"><a href="<? echo Yii::$app->homeUrl.str_replace("/fnb","fnb",$sub_menu->uri) ?>"><?echo $sub_menu->label?></a></li>
                                <?  }?>
                                </ul>
                            </li>
                    <?  }
                        else {?>
                            <li>
                                <a href="<? echo Yii::$app->homeUrl . $main_menu->uri ?>" class="icon <? echo (strtolower($main_menu->label) == 'dashboard' ) ? 'dashboard':$main_menu->icon; ?>"><? echo $main_menu->label ?></a>
                            </li>
                    <?  } ?>
                <?  } ?>
                </ul>

                <div class="clearfix"></div>

            </div>

            <!-- buat sisi tengah layout -->
            <div class="content-side">
                <?= Breadcrumbs::widget([
                    'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
                ]) ?>
                <?= $content ?>
            </div>
        </div>

    </div>
    <div class="clearfix"></div>
        <!-- </div> -->

    <footer>
        <div class="section text-left"><p>Powered by:</p> <img src="<? echo Yii::$app->homeUrl ?>assets/icon/logo/logo_footer_pipe.png" alt=""></div>
        <div class="section text-center"><p>&copy;2017 Pipe All Rights Reserved.</p></div>
        <div class="section text-right"><p><a href="">Privacy</a> & <a href="">Terms</a></p></div>
        <div class="clearfix"></div>
    </footer>

    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- create ingredient list -->
    <div class="modal fade modal-table hotel-modal" tabindex="2" role="dialog" id="create-new-ingredient" style="z-index: 99992;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                    <h4 class="modal-title" id="title">Create New Ingredient</h4>
                </div>
                <?php $form = ActiveForm::begin([
                        'id' => 'form-create-ingredient',
                        'action' =>['fnb/create_ingredient'],
                        'fieldConfig' => [
                            'options' => [
                                'tag' => false,
                            ],
                        ]
                ]); ?>
                
                <div class="modal-body zero">
                    <div class="col-sm-12" style="padding-left: 0;">
                        <div class="auth-form">
                            <label for="">Nama</label>
                            <div class="clearfix">
                                <input type="name" name="nama_material" required="" placeholder="Enter ingredient name" class="" id="nama_material">
                                <div class="clear"></div>
                                <div class="error">Please fill the box above</div>
                            </div>
                            
                            <label for="">Total Stok</label>
                            <div class="clearfix">
                                <input type="number" name="total_stok" required="" placeholder="0" class="just-number" id="total_stok">
                                <div class="clear"></div>
                                <div class="error">Please fill the box above</div>
                            </div>
                            
                            <label for="">Satuan</label>
                            <div class="clearfix">
                                <input type="text" name="satuan" required="" placeholder="Enter the unit" class="" id="satuan">
                                <div class="clear"></div>
                                <div class="error">Please fill the box above</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <input type="submit" name="submit" value="Save" class="pull-right">
                    <button type="button" data-dismiss="modal" aria-label="Close" class="button pull-right">Cancel</button>
                </div>

                <?php ActiveForm::end() ?>
            </div>
        </div>
    </div>

    <!-- edit ingredient list -->
    <div class="modal fade modal-table hotel-modal" tabindex="2" role="dialog" id="edit-ingredient-list" style="z-index: 99992;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                    <h4 class="modal-title" id="title">Edit Data Ingredient</h4>
                </div>
                <?php $form = ActiveForm::begin([
                    'id' => 'form-update-ingredient',
                    'action' => ['fnb/update_ingredient'],
                    'fieldConfig' => [
                        'options' => [
                            'tag' => false,
                        ],
                    ],
                ]); ?>

                <div class="modal-body zero">
                    <input type="hidden" name="ingredient_id" value="" />
                    <div class="col-sm-12" style="padding-left: 0;">
                        <div class="auth-form">
                            <label for="">Nama</label>
                            <div class="clearfix">
                                <input type="name" name="nama_material" required="" placeholder="Enter ingredient name" class="" id="nama_material">
                                <div class="clear"></div>
                                <div class="error">Please fill the box above</div>
                            </div>
                            
                            <label for="">Total Stok</label>
                            <div class="clearfix">
                                <input type="number" name="total_stok" required="" placeholder="0" class="just-number" id="total_stok">
                                <div class="clear"></div>
                                <div class="error">Please fill the box above</div>
                            </div>
                            
                            <label for="">Satuan</label>
                            <div class="clearfix">
                                <input type="text" name="satuan" required="" placeholder="Enter the unit" class="" id="satuan">
                                <div class="clear"></div>
                                <div class="error">Please fill the box above</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="submit" name="submit" value="Save" class="pull-right">
                    <button type="button" data-dismiss="modal" aria-label="Close" class="button pull-right">Cancel</button>
                </div>
                <?php ActiveForm::end() ?>
            </div>
        </div>
    </div>

    <!-- delete ingredient list -->
    <div class="modal fade just-modal hotel-modal" tabindex="2" role="dialog" id="delete-ingredient-list" style="z-index: 99992;">
        <div class="modal-dialog short-modal" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                    <h4 class="modal-title" id="title">Delete Ingredient List</h4>
                </div>
                <?php $form = ActiveForm::begin([
                                    'id' => 'form-delete-ingredient',
                                    'action' =>['fnb/delete_ingredient'],
                                    'fieldConfig' => [
                                        'options' => [
                                            'tag' => false,
                                        ],
                                    ]
                ]); ?>
                <div class="modal-body">
                    <p>Are you sure? You are about to delete a prep list.</p>
                </div>

                <div class="modal-footer">
                    <input type="hidden" name="ingredient_id">
                    <input type="submit" name="submit" value="Yes, I am Sure" class="pull-right">
                    <button type="button" data-dismiss="modal" aria-label="Close" class="button pull-right">Cancel</button>
                </div>
                <? ActiveForm::end(); ?>
            </div>
        </div>
    </div>

    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- cash opname description -->
    <div class="modal fade modal-table hotel-modal" tabindex="2" role="dialog" id="show-cashopname-description" style="z-index: 99992;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                    <h4 class="modal-title" id="title">Cash Opname Description</h4>
                </div>

                <div class="modal-body" style="margin-bottom: 10px">
                    <div class="col-sm-4 zero bold">Tanggal</div>
                    <div class="col-sm-8" for="date"></div>
                    <div class="clearfix"></div>
                    <hr style="margin-top: 10px;margin-bottom: 10px;">
                    
                    <div class="col-sm-4 zero bold">Deskripsi</div>
                    <div class="col-sm-8" for="description"></div>
                    <div class="clearfix"></div>
                </div>
            </div>

        </div>
    </div>

    <!-- edit cash opname status -->
    <div class="modal fade modal-table hotel-modal" tabindex="2" role="dialog" id="edit-cashopname-status" style="z-index: 99992;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                    <h4 class="modal-title" id="title">Edit Status</h4>
                </div>
                <?php $form = ActiveForm::begin([
                    'id' => 'form-update-cashopname-status',
                    'action' => ['fnb/update_cashopname_status'],
                    'fieldConfig' => [
                        'options' => [
                            'tag' => false,
                        ],
                    ],
                ]); ?>

                <div class="modal-body zero">
                    <input type="hidden" name="cash_opname_id" value="" />
                    <div class="col-sm-12" style="padding-left: 0;">
                        <div class="auth-form">
                            <label for="">Kas Asli</label>
                            <div class="clearfix">
                                <select name="status" required="" class="form-control" id="status">
                                    <option value="Belum Disetujui">Belum Disetujui</option>
                                    <option value="Disetujui">Disetujui</option>
                                    <option value="Ditolak">Ditolak</option>
                                </select>
                                <div class="clear"></div>
                                <div class="error">Please fill the box above</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="submit" name="submit" value="Save" class="pull-right">
                    <button type="button" data-dismiss="modal" aria-label="Close" class="button pull-right">Cancel</button>
                </div>

                <?php ActiveForm::end() ?>
            </div>
        </div>
    </div>

    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- ................................- buat Isi content -................................ -->
    <!-- create cashier annotation -->
    <div class="modal fade modal-table hotel-modal" tabindex="2" role="dialog" id="create-new-cashier-annotation" style="z-index: 99992;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                    <h4 class="modal-title" id="title">Create New Cashier Annotation</h4>
                </div>
                <?php $form = ActiveForm::begin([
                        'id' => 'form-create-cashier-annotation',
                        'action' =>['fnb/create_cashier_annotation'],
                        'fieldConfig' => [
                            'options' => [
                                'tag' => false,
                            ],
                        ]
                ]); ?>
                
                <div class="modal-body zero">
                    <div class="col-sm-12" style="padding-left: 0;">
                        <div class="auth-form">                            
                            <label for="">Kas Asli</label>
                            <div class="clearfix">
                                <input type="number" name="kas_asli" required="" placeholder="Enter the real cash" class="just-number" id="kas_asli">
                                <div class="clear"></div>
                                <div class="error">Please fill the box above</div>
                            </div>
                            
                            <label for="">Deskripsi</label>
                            <div class="clearfix">
                                <textarea name="deskripsi" required="" placeholder="Enter your description" class="form-control" id="deskripsi" rows="5" maxlength="1000"></textarea>
                                <div class="clear"></div>
                                <div class="error">Please fill the box above</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <input type="submit" name="submit" value="Save" class="pull-right">
                    <button type="button" data-dismiss="modal" aria-label="Close" class="button pull-right">Cancel</button>
                </div>

                <?php ActiveForm::end() ?>
            </div>
        </div>
    </div>

    <!-- edit cash opname real cash -->
    <div class="modal fade modal-table hotel-modal" tabindex="2" role="dialog" id="edit-cashopname-real-cash" style="z-index: 99992;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                    <h4 class="modal-title" id="title">Edit Real Cash</h4>
                </div>
                <?php $form = ActiveForm::begin([
                    'id' => 'form-update-cashopname-real-cash',
                    'action' => ['fnb/update_cashopname_real_cash'],
                    'fieldConfig' => [
                        'options' => [
                            'tag' => false,
                        ],
                    ],
                ]); ?>

                <div class="modal-body zero">
                    <input type="hidden" name="cashier_annotation_id" value="" />
                    <div class="col-sm-12" style="padding-left: 0;">
                        <div class="auth-form">
                            <label for="">Kas Asli</label>
                            <div class="clearfix">
                                <input type="number" name="kas_asli" required="" placeholder="Enter the real cash" class="just-number" id="kas_asli">
                                <div class="clear"></div>
                                <div class="error">Please fill the box above</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="submit" name="submit" value="Save" class="pull-right">
                    <button type="button" data-dismiss="modal" aria-label="Close" class="button pull-right">Cancel</button>
                </div>

                <?php ActiveForm::end() ?>
            </div>
        </div>
    </div>

    <!-- edit cash opname description -->
    <div class="modal fade modal-table hotel-modal" tabindex="2" role="dialog" id="edit-cashopname-description" style="z-index: 99992;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                    <h4 class="modal-title" id="title">Edit Real Cash</h4>
                </div>
                <?php $form = ActiveForm::begin([
                    'id' => 'form-update-cashopname-description',
                    'action' => ['fnb/update_cashopname_description'],
                    'fieldConfig' => [
                        'options' => [
                            'tag' => false,
                        ],
                    ],
                ]); ?>

                <div class="modal-body zero">
                    <input type="hidden" name="cashier_annotation_id" value="" />
                    <div class="col-sm-12" style="padding-left: 0;">
                        <div class="auth-form">
                            <label for="">Deskripsi</label>
                            <div class="clearfix">
                                <textarea name="deskripsi" required="" placeholder="Enter your description" class="form-control" id="deskripsi" rows="5" maxlength="1000"></textarea>
                                <div class="clear"></div>
                                <div class="error">Please fill the box above</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="submit" name="submit" value="Save" class="pull-right">
                    <button type="button" data-dismiss="modal" aria-label="Close" class="button pull-right">Cancel</button>
                </div>

                <?php ActiveForm::end() ?>
            </div>
        </div>
    </div>

    <!-- .................................- form procesing -................................. -->
    <!-- .................................- form procesing -................................. -->
    <!-- .................................- form procesing -................................. -->
    <!-- .................................- form procesing -................................. -->
    <!-- .................................- form procesing -................................. -->
    <!-- message -->
    <div class="modal fade just-modal" tabindex="2" role="dialog" id="message-modal" style="z-index: 999999;">
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

    <!-- MESSAGE CONFIRM -->
    <div class="modal fade just-modal hotel-modal" tabindex="2" role="dialog" id="message-confirm" style="z-index: 99992;">
    <div class="modal-dialog short-modal" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
            <h4 class="modal-title" id="message-title-confirm">Create Bed Type</h4>
        </div>

        <div class="modal-body">
            <p><span id="message-result-confirm"></span></p>
        </div>

            <div class="modal-footer">
                <input type="submit" name="submit" value="Yes, I am Sure" class="pull-right" id="message-button-confirm">
                <button type="button" data-dismiss="modal" aria-label="Close" class="button pull-right" id="message-button-cancel">Cancel</button>
            </div>

        </div>
    </div>
    </div>
    <!-- MESSAGE CONFIRM -->

    <!-- MESSAGE CONFIRMED -->
    <div class="modal fade just-modal hotel-modal" tabindex="2" role="dialog" id="message-confirmed" style="z-index: 99992;">
    <div class="modal-dialog short-modal" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
            <h4 class="modal-title" id="message-title-confirmed">Bed Type Successfully Created</h4>
        </div>

        <div class="modal-body">
            <p><span id="message-result-confirmed"></span></p>
        </div>

        </div>
    </div>
    </div>
    <!-- MESSAGE CONFIRMED -->

    <?php (isset(Yii::$app->controller->add_modal)) ? include(Yii::$app->controller->add_modal) : "";  ?>

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


<script src="<? echo Yii::$app->homeUrl ?>assets/js/swiper.min.js"></script>
<script src="<? echo Yii::$app->homeUrl ?>assets/js/bootstrap.min.js"></script>
<script src="//cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
<script src="<? echo Yii::$app->homeUrl ?>assets/js/datepicker.js"></script>
<script src="<? echo Yii::$app->homeUrl ?>assets/js/moment.js"></script>
<script src="<? echo Yii::$app->homeUrl ?>assets/js/datetimepicker.js"></script>
<!-- yang buat sendiri -->
<script src="<? echo Yii::$app->homeUrl ?>assets/js/main.js"></script>
<script src="<? echo Yii::$app->homeUrl ?>assets/js/main-fnb.js"></script>
</body>
</html>
