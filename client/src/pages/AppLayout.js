// src/pages/AppLayout.js

// 导入必要的模块和组件
import { useState } from "react"; // useState 用于管理组件内部状态
import { Switch, Route } from "react-router-dom"; // 用于路由切换和定义不同路径的组件
import { Frame, withSounds, withStyles } from "arwes"; // Arwes 框架中的组件，用于提供 UI 风格和声音支持

import usePlanets from "../hooks/usePlanets"; // 自定义的 Hook，用于获取行星数据
import useLaunches from "../hooks/useLaunches"; // 自定义的 Hook，用于管理发射任务

import Centered from "../components/Centered"; // 居中布局的自定义组件
import Header from "../components/Header"; // 页头自定义组件
import Footer from "../components/Footer"; // 页脚自定义组件

import Launch from "./Launch"; // 发射页面组件
import History from "./History"; // 历史页面组件
import Upcoming from "./Upcoming"; // 即将进行的发射页面组件

// 定义样式
const styles = () => ({
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    margin: "auto",
  },
  centered: {
    flex: 1,
    paddingTop: "20px",
    paddingBottom: "10px",
  },
});

// 定义 AppLayout 组件
const AppLayout = (props) => {
  const { sounds, classes } = props; // 从 props 中获取声音和样式类

  const [frameVisible, setFrameVisible] = useState(true); // 控制 Frame 显示状态
  const animateFrame = () => { // 控制 Frame 的动画效果
    setFrameVisible(false);
    setTimeout(() => {
      setFrameVisible(true);
    }, 600); // 设置延时效果
  };

  // 定义播放不同声音的函数
  const onSuccessSound = () => sounds.success && sounds.success.play();
  const onAbortSound = () => sounds.abort && sounds.abort.play();
  const onFailureSound = () => sounds.warning && sounds.warning.play();

  // 获取发射任务数据和操作函数
  const {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  } = useLaunches(onSuccessSound, onAbortSound, onFailureSound);

  // 获取行星数据
  const planets = usePlanets();
  
  return (
    <div className={classes.content}>
      {/* 页头组件，包含导航点击触发动画的事件 */}
      <Header onNav={animateFrame} />
      {/* 居中布局 */}
      <Centered className={classes.centered}>
        {/* Frame 组件用于显示内容框架 */}
        <Frame
          animate
          show={frameVisible}
          corners={4}
          style={{ visibility: frameVisible ? "visible" : "hidden" }}
        >
          {anim => (
            <div style={{ padding: "20px" }}>
              {/* 路由切换组件，用于根据路径显示不同页面 */}
              <Switch>
                <Route exact path="/">
                  <Launch 
                    entered={anim.entered} // 传递动画状态
                    planets={planets} // 传递行星数据
                    submitLaunch={submitLaunch} // 传递提交发射任务函数
                    isPendingLaunch={isPendingLaunch} // 传递是否有待执行任务状态
                  />
                </Route>
                <Route exact path="/launch">
                  <Launch 
                    entered={anim.entered} 
                    planets={planets} 
                    submitLaunch={submitLaunch} 
                    isPendingLaunch={isPendingLaunch} 
                  />
                </Route>
                <Route exact path="/upcoming">
                  <Upcoming
                    entered={anim.entered}
                    launches={launches} // 传递发射任务数据
                    abortLaunch={abortLaunch} // 传递取消发射任务函数
                  />
                </Route>
                <Route exact path="/history">
                  <History
                    entered={anim.entered}
                    launches={launches} // 传递历史发射任务数据
                  />
                </Route>
              </Switch>
            </div>
          )}
        </Frame>
      </Centered>
      {/* 页脚组件 */}
      <Footer />
    </div>
  );
};

// 使用 withSounds 和 withStyles 高阶组件增强 AppLayout 组件
export default withSounds()(withStyles(styles)(AppLayout));
