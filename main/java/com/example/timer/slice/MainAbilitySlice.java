package com.example.timer.slice;

import com.example.timer.ResourceTable;
import ohos.aafwk.ability.AbilitySlice;
import ohos.aafwk.content.Intent;
import ohos.agp.components.Button;
import ohos.agp.components.Component;
import ohos.agp.components.Text;
import ohos.app.dispatcher.TaskDispatcher;

import java.util.Timer;
import java.util.TimerTask;

public class MainAbilitySlice extends AbilitySlice {
    private Timer mTimer;
    private Boolean isButtonStartPressed = false;
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_ability_main);
        Button mButton = (Button) findComponentById(ResourceTable.Id_button);
        Text mText = (Text) findComponentById(ResourceTable.Id_tick_timer);
        TaskDispatcher uiTaskDispatcher = getUITaskDispatcher();

        if (mButton != null) {
            // 为按钮设置点击回调
            mButton.setClickedListener(new Component.ClickedListener() {
                @Override
                public void onClick(Component component) {

                    final int[] currentTime = {0};
                    if (isButtonStartPressed) {
                        System.out.println("停止计时》》》》》》》");
                        isButtonStartPressed = false;
                        uiTaskDispatcher.asyncDispatch(new Runnable() {
                            @Override
                            public void run() {
                                mButton.setText("开始计时");
                            }
                        });
                        mTimer.cancel();
                    } else {
                        System.out.println("开始计时》》》》》》》");
                        isButtonStartPressed = true;
                        mTimer = new Timer();
                        mTimer.scheduleAtFixedRate(new TimerTask() {
                            @Override
                            public void run() {
                                currentTime[0] += 1;
                                uiTaskDispatcher.asyncDispatch(new Runnable() {
                                    @Override
                                    public void run() {
                                        mText.setText(TimeFormatUtil.toDisplayString(currentTime[0]));
                                        mButton.setText("停止计时");
                                    }
                                });
                            }
                        }, 0, 10);
                    }
                }
            });
        };
//        if(){
//
//        }


    }

    @Override
    public void onActive() {
        super.onActive();
    }

    @Override
    public void onForeground(Intent intent) {
        super.onForeground(intent);
    }
}
