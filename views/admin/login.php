<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;

$this->title = 'Login';

?>
<div class="auth width-100">
    <div class="auth-wrapper">
        <div class="auth-header"></div>
        <div class="auth-form login-form">
            <?php $form = ActiveForm::begin([
                'id' => 'form-login',
                'fieldConfig' => [
                    'options' => [
                        'tag' => false,
                    ],
                ],
            ]);
            ?>
                <label for="">Email or Username</label>
                <div class="clearfix">
                    <?= $form->field($model, 'login_username')->textInput([
                        'placeholder' => 'type here',
                        'class' => '',
                        'required' => '',
                    ])->label(false) ?>
                    <div class="clear"></div>
                    <div class="error">Please fill the email box above</div>
                </div>

                <div id="pass">
                    <label for="" class="_show">Password <span class="password" target="#pass">Show</span></label>
                    <div class="clearfix">
                        <?= Html::activePasswordInput($model, 'login_password', [
                            'placeholder' => 'type here',
                            'class' => '',
                            'id' => 'password',
                        ]); ?>
                        <div class="clear"></div>
                        <div class="error">Please fill the password box above</div>
                    </div>
                </div>

                <?= Html::submitInput('Login', [
                    'class' => '', 'disabled' => '']);
                ?>

            <?php ActiveForm::end(); ?>
            <div class="text-center">
                <a href="<?php echo Yii::$app->homeUrl ?>admin/forgot_password">Forgot password. Help!</a>
            </div>
        </div>
    </div>
    
</div>