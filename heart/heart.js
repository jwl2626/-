import sensor from '@system.sensor'
import router from '@system.router'

var heart_rate = null;
var step_number = null;
var peidai = null;
export default {
    data: {
        heart_rate: '',
        step_number:'',
    },
    clickAction(){
        console.log("开始被点击了");
        //开始运行首先判断手表佩戴状态
        //开始监听
        //sensor.subscribeStepCounter监听步数
        sensor.subscribeStepCounter({
            success: function(ret) {
                console.log('get step value:' + ret.steps);
                step_number = ret.steps;
                console.log(heart_rate);
                console.log("给步数赋值");
            },
            fail: function(data, code) {
                console.log('Subscription failed. Code: ' + code + '; Data: ' + data);
            },
        });
        //heart_rate = sensor.subscribeStepCounter.
        //sensor.subscribeHeartRate监听心率
        sensor.subscribeHeartRate({
            success: function(ret) {
                console.log('get heartrate value:' + ret.heartRate);
                heart_rate = ret.heartRate;
            },
            fail: function(data, code) {
                console.log('Subscription failed. Code: ' + code + '; Data: ' + data);
            },
        });
        router.replace({
            //uri: 'pages/countdown/countdown',
            //uri:'pages/contact/contact',
            params: {
                "data1": step_number,
                "data2": heart_rate
            }
        });
        //停止监听sensor.unsubscribeStepCounter(); sensor.unsubscribeHeartRate();
    },
    onInit() {
        console.log("主页面的onInit()被调用");
        /*subscribeOnBodyState(Object): void，
        *订阅设备佩戴状态。针对同一个应用，多次点击调用时，
        *会覆盖前面的调用效果，即仅最后一次调用生效。*/
    },
    onReady() {
        console.log("主页面的onReady()被调用");
    },
    onShow() {
        console.log("主页面的onShow()被调用");
        //sensor.subscribeOnBodyState;开始订阅是否佩戴
        sensor.subscribeOnBodyState({
            success: function(ret) {
                console.log('get on-body state value:' + ret.value);
            },
            fail: function(data, code) {
                console.log('Subscription failed. Code: ' + code + '; Data: ' + data);
            },
        });
    },
    onDestroy() {
        console.log("主页面的onDestroy()被调用");
        sensor.unsubscribeOnBodyState();//取消订阅是否佩戴设备
    }
}
