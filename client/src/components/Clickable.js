// src/components/Clickable.js

// 导入必要的模块和高阶组件
import { withSounds } from "arwes"; // 用于提供声音支持的高阶组件

// 定义 Clickable 组件
const Clickable = (props) => {
  const {
    children, // 子组件
    sounds, // 声音对象
    onClick, // 点击事件处理函数
    ...rest // 其他属性
  } = props;

  // 定义带有点击声音效果的点击函数
  const clickWithSound = (e) => {
    sounds.click && sounds.click.play(); // 播放点击声音（如果存在）
    onClick && onClick(e); // 执行传入的点击事件处理函数（如果存在）
  };

  return (
    // 渲染组件，用带声音效果的点击函数替代原点击事件
    <span {...rest} onClick={clickWithSound}>
      {children}
    </span>
  );
};

// 使用 withSounds 高阶组件增强 Clickable 组件并导出
export default withSounds()(Clickable);
