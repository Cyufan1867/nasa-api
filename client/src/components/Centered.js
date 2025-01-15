// src/components/Centered.js

// 导入必要的模块和高阶组件
import { withStyles } from "arwes"; // 用于应用自定义样式的高阶组件

// 定义样式
const styles = () => ({
  root: {
    margin: "0 auto", // 居中对齐
    maxWidth: 800, // 最大宽度为 800px
  },
  "@media (max-width: 800px)": { // 在屏幕宽度小于 800px 时应用的样式
    root: {
      margin: "0 12px", // 边距减少，适应小屏幕
    },
  },
});

// 定义 Centered 组件
const Centered = (props) => {
  const {
    classes, // 自定义样式类
    className, // 额外的类名
    children, // 子组件
    ...rest // 其余的属性
  } = props;

  return (
    <div className={`${classes.root} ${className}`} {...rest}>
      {children} {/* 渲染子组件 */}
    </div>
  );
};

// 使用 withStyles 高阶组件应用样式并导出 Centered 组件
export default withStyles(styles)(Centered);
