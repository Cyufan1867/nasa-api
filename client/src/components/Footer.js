// src/components/Footer.js

// 导入必要的模块和组件
import { Footer as ArwesFooter, Paragraph } from "arwes"; // Arwes 框架中的 Footer 和 Paragraph 组件
import Centered from "./Centered"; // 自定义的 Centered 组件，用于居中布局

// 定义 Footer 组件
const Footer = () => {
  return (
    <ArwesFooter animate>
      <Centered>
        {/* 段落组件，用于显示版权和免责声明信息 */}
        <Paragraph style={{ fontSize: 14, margin: "10px 0" }}>
          本站非官方网站，与 NASA 或 SpaceX 无关，仅用于教育目的。
        </Paragraph>
      </Centered>
    </ArwesFooter>
  );
};

// 导出 Footer 组件
export default Footer;
