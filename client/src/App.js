// src/App.js

// 导入必要的模块和组件
import {
  BrowserRouter as Router, // 用于处理路由的组件，作为 Router 的别名
} from "react-router-dom";
import {
  Arwes, // Arwes 框架的根组件，用于提供未来科幻风格的 UI
  SoundsProvider, // 用于管理和提供声音资源的组件
  ThemeProvider, // 用于管理和提供主题配置的组件
  createSounds, // 创建声音对象的函数
  createTheme, // 创建主题对象的函数
} from "arwes";

import AppLayout from "./pages/AppLayout"; // 导入自定义的应用布局组件

import { theme, resources, sounds } from "./settings"; // 导入应用的主题、资源和声音配置

// 定义 App 组件
const App = () => {
  return (
    // 使用 ThemeProvider 提供主题上下文
    <ThemeProvider theme={createTheme(theme)}>
      {/* 使用 SoundsProvider 提供声音上下文 */}
      <SoundsProvider sounds={createSounds(sounds)}>
        {/* Arwes 组件提供了动画效果和背景模式 */}
        <Arwes animate background={resources.background.large} pattern={resources.pattern}>
          {/* anim 对象包含进入动画的状态 */}
          {anim => (
            // 使用 Router 管理应用的路由
            <Router>
              {/* 渲染 AppLayout 组件，并将动画状态传递给 show 属性 */}
              <AppLayout show={anim.entered} />
            </Router>
          )}
        </Arwes>
      </SoundsProvider>
    </ThemeProvider>
  );
};

// 导出 App 组件作为默认导出
export default App;
