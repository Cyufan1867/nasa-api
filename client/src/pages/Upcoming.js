// src/pages/Upcoming.js

// 导入必要的模块和组件
import { useMemo } from "react";
import { 
  withStyles, // 用于应用自定义样式的高阶组件
  Appear, // 控制元素显示动画的组件
  Link, // 链接组件
  Paragraph, // 段落组件
  Table, // 表格组件
  Words, // 动画文字组件
} from "arwes";

import Clickable from "../components/Clickable"; // 自定义的 Clickable 组件

// 定义样式
const styles = () => ({
  link: {
    color: "red",
    textDecoration: "none", // 链接没有下划线
  },
});

// 定义 Upcoming 组件
const Upcoming = (props) => {
  const { 
    entered, // 控制组件进入动画
    launches, // 发射任务数据
    classes, // 样式类
    abortLaunch, // 取消发射的函数
  } = props;

  // 使用 useMemo 优化表格内容的渲染，避免不必要的重复计算
  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => launch.upcoming) // 过滤出即将进行的发射任务
      .map((launch) => {
        return (
          <tr key={String(launch.flightNumber)}>
            <td>
              {/* 点击 ✖ 按钮取消任务 */}
              <Clickable style={{ color: "red" }}>
                <Link className={classes.link} onClick={() => abortLaunch(launch.flightNumber)}>
                  ✖
                </Link>
              </Clickable>
            </td>
            <td>{launch.flightNumber}</td> {/* 发射编号 */}
            <td>{new Date(launch.launchDate).toLocaleDateString()}</td> {/* 发射日期 */}
            <td>{launch.mission}</td> {/* 任务名称 */}
            <td>{launch.rocket}</td> {/* 火箭类型 */}
            <td>{launch.target}</td> {/* 目的地 */}
          </tr>
        );
      });
  }, [launches, abortLaunch, classes.link]);

  // 返回组件内容，包含即将进行的发射任务描述和表格
  return (
    <Appear id="upcoming" animate show={entered}>
      <Paragraph>即将进行的发射任务，包括 SpaceX 和新安排的 GKD-9 火箭发射。</Paragraph>
      <Words animate>警告！点击 ✖ 将取消任务。</Words>
      <Table animate show={entered}>
        <table style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th style={{ width: "3rem" }}></th> {/* 取消任务列 */}
              <th style={{ width: "3rem" }}>编号</th> {/* 发射编号 */}
              <th style={{ width: "10rem" }}>日期</th> {/* 发射日期 */}
              <th style={{ width: "11rem" }}>任务</th> {/* 任务名称 */}
              <th style={{ width: "11rem" }}>火箭</th> {/* 火箭类型 */}
              <th>目的地</th> {/* 目的地 */}
            </tr>
          </thead>
          <tbody>{tableBody}</tbody> {/* 表格主体 */}
        </table>
      </Table>
    </Appear>
  );
};

export default withStyles(styles)(Upcoming);
