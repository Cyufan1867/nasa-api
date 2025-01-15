// src/pages/History.js

// 导入必要的模块和组件
import { useMemo } from "react";
import { Appear, Table, Paragraph } from "arwes"; // Arwes 框架中的 UI 组件

const History = (props) => {
  // 使用 useMemo 优化表格内容的渲染，避免不必要的重复计算
  const tableBody = useMemo(() => {
    return props.launches
      ?.filter((launch) => !launch.upcoming) // 过滤掉即将进行的发射，仅显示历史发射记录
      .map((launch) => {
        return (
          <tr key={String(launch.flightNumber)}>
            <td>
              <span
                style={{
                  color: launch.success ? "greenyellow" : "red", // 成功显示绿色，失败显示红色
                }}
              >
                █
              </span>
            </td>
            <td>{launch.flightNumber}</td> {/* 发射编号 */}
            <td>{new Date(launch.launchDate).toLocaleDateString()}</td> {/* 发射日期 */}
            <td>{launch.mission}</td> {/* 任务名称 */}
            <td>{launch.rocket}</td> {/* 火箭类型 */}
            <td>{launch.customers?.join(", ")}</td> {/* 客户名称 */}
          </tr>
        );
      });
  }, [props.launches]);

  // 返回组件内容，包含历史发射任务的描述和表格
  return (
    <article id="history">
      <Appear animate show={props.entered}>
        {/* 描述性文本，介绍任务发射的历史 */}
        <Paragraph>自 2006 年以来的发射任务历史记录，包括 SpaceX 的发射任务。</Paragraph>
        <Table animate>
          <table style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th style={{ width: "2rem" }}></th> {/* 状态颜色标记列 */}
                <th style={{ width: "3rem" }}>编号</th> {/* 发射编号 */}
                <th style={{ width: "9rem" }}>日期</th> {/* 发射日期 */}
                <th>任务</th> {/* 任务名称 */}
                <th style={{ width: "7rem" }}>火箭</th> {/* 火箭类型 */}
                <th>客户</th> {/* 客户名称 */}
              </tr>
            </thead>
            <tbody>{tableBody}</tbody> {/* 表格主体 */}
          </table>
        </Table>
      </Appear>
    </article>
  );
};

export default History;
