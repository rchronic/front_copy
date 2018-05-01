<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

 namespace app\assets;

 use yii\web\AssetBundle;

/**
 * This asset bundle provides the base JavaScript files for the Yii Framework.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class CustomAssets extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web'."/assets";
    public $sourcePath = '@app'.'/view/assets';
    public $js = [
        
    ];
    public $css = [

    ];
}
