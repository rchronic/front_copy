<?php
use yii\bootstrap\ActiveForm;
/* @var $this yii\web\View */

$this->title = 'Breez Hotel Bali';
?>
<ol class="breadcrumb">
  <li class="breadcrumb-item active">Home</li>
  <!-- <li class="breadcrumb-item"><a href="#">Home</a></li> -->
</ol>
<div class="profile-section">
    <div class="img-profile">
        <div class="img-wrapper"></div>
            <?php $form = ActiveForm::begin([
                            'id' => 'form-profile',
                            'action' =>['admin/upload_photo'],
                            'fieldConfig' => [
                                'options' => [
                                    'tag' => false,
                                ],  
                            ]
                        ]); ?>
                <input type="file" id="photo-profile" name="photo_profile" accept="image/x-png,image/gif,image/jpeg" id="input" />
                <div id="image" style="background-image:url('<? echo Yii::$app->homeUrl. "assets/photo/" . $dashboard->profile->icon?>');"></div>
            <?php ActiveForm::end(); ?>
    </div>

    <div class="data-profile">
        <div class="profile-title">
            <span><? echo $dashboard->profile->status; ?></span>
            <h5>Hi <? echo explode(" ", $dashboard->profile->name)[0] ?>, welcome home! How's your sleep?</h5>
        </div>
        <div class="profile-full">
            <h3><? echo $dashboard->profile->name ?></h3>
            <p><? echo $dashboard->profile->email ?></p>
            <p><? echo $dashboard->profile->phone ?></p>
        </div>
    </div>

    <div class="button-profile text-right">
        <a href="" class="edit-profile">Edit</a>
        <a href="" class="change-password">Change Password</a>
    </div>
</div>

<div class="content-wrapper width-100">

    <h3>SERVICE</h3>

    <div class="content-menu">
        <ul>
            <? 
                foreach( $dashboard->services as $service ) {
            ?>
                <li>
                    <a href="<? echo Yii::$app->homeUrl. $service->uri; ?>">
                        <div class="menu-icon"><img src="<? echo Yii::$app->homeUrl ?>assets/icon/black/small/<? echo $service->icon ?>" alt="<? echo $service->desc; ?>"></div>
                        <div class="menu-caption"><? echo $service->label ?></div>
                    </a>
                </li>
            <?
                }
            ?>
        </ul>
    </div>
</div>

<div class="width-100">
<div class="content-wrapper width-50 border-right">

    <h3>User Management</h3>

    <div class="content-menu">
        <ul>
    <?
        foreach( $dashboard->user as $user_access ) {
    ?>
            <li>
                <a href="<? echo Yii::$app->homeUrl. $user_access->uri; ?>">
                    <div class="menu-icon"><img src="<? echo Yii::$app->homeUrl ?>assets/icon/black/small/<? echo $user_access->icon ?>" alt=""></div>
                    <div class="menu-caption"><? echo $user_access->label; ?></div>
                </a>
            </li>
    <?
        }
    ?>
        </ul>
    </div>
</div>

<div class="content-wrapper width-50">

    <h3>Property Management</h3>

    <div class="content-menu">
        <ul>
    <?
        foreach ( $dashboard->property as $property_access ) {
    ?>
            <li>
                <a href="<? echo Yii::$app->homeUrl. $property_access->uri; ?>">
                    <div class="menu-icon"><img src="<? echo Yii::$app->homeUrl ?>assets/icon/black/small/<?php echo $property_access->icon ?>" alt=""></div>
                    <div class="menu-caption"><?php echo $property_access->label ?></div>
                </a>
            </li>
    <?
        }
    ?>
        </ul>
    </div>
</div>
</div>

</div>
