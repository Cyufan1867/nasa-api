// src/components/Header.js

// 导入必要的模块和组件
import { 
  Logo, // Arwes 框架中的 Logo 组件
  Words, // Arwes 框架中的文字组件
  Header as ArwesHeader, // Arwes 框架中的 Header 组件
  Highlight, // Arwes 框架中的高亮组件
  withStyles, // 用于应用自定义样式的高阶组件
} from "arwes";
import { Link } from "react-router-dom"; // React 路由中的 Link 组件，用于导航
import Clickable from "./Clickable"; // 自定义的 Clickable 组件
import Centered from "./Centered"; // 自定义的 Centered 组件，用于居中布局

// 定义样式
const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    lineHeight: "80px",
  },
  logo: {
    display: "inherit",
    marginTop: "15px",
  },
  nav: {
    display: "inherit",
  },
  banner: {
    display: "inherit",
    fontWeight: "bold",
    marginLeft: "10px",
    marginRight: "15px",
    fontSize: 28,
  },
  clickable: {
    fontSize: 21,
    "& i": {
      marginRight: theme.padding / 2,
      fontSize: 24,
    },
  },
  link: {
    color: theme.color.content,
    textDecoration: "none",
  },
  button: {
    padding: [0, theme.padding / 2],
  },
  "@media (max-width: 800px)": {
    logo: {
      display: "none",
    },
    img: {
      display: "none",
    },
    banner: {
      display: "none",
    },
    button: {
      padding: [0, 8],
    },
    clickable: {
      fontSize: 16,
    },
  },
});

// 定义 Header 组件
const Header = (props) => {
  const { classes, onNav, ...rest } = props;
  return (
    <ArwesHeader animate>
      <Centered className={classes.root} {...rest}>
        {/* 显示网站图标 */}
        <img
          src="/favicon.png"
          alt=""
          className={classes.img}
          style={{
            margin: "15px 10px 15px 0",
            height: "50px",
            width: "auto",
          }}
        />
        {/* 显示动画 Logo */}
        <Logo animate size={50} className={classes.logo} layer="header" />
        {/* 标题文字 */}
        <Words animate className={classes.banner}>
          NASA 任务控制
        </Words>
        <nav className={`${classes.nav}`}>
          {/* 导航链接：发射页面 */}
          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer="header">
              <Link className={classes.link} to="/launch">
                <i className="material-icons">check_circle_outline</i>发射
              </Link>
            </Highlight>
          </Clickable>
          {/* 导航链接：即将进行的任务 */}
          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer="header">
              <Link className={classes.link} to="/upcoming">
                <i className="material-icons">update</i>即将进行
              </Link>
            </Highlight>
          </Clickable>
          {/* 导航链接：历史任务 */}
          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer="header">
              <Link className={classes.link} to="/history">
                <i className="material-icons">history</i>历史
              </Link>
            </Highlight>
          </Clickable>
        </nav>
      </Centered>
    </ArwesHeader>
  );
};

// 使用 withStyles 高阶组件应用样式并导出 Header 组件
export default withStyles(styles)(Header);
