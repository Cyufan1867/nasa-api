// src/pages/Launch.js

// 导入必要的模块和组件
import { useMemo } from "react";
import { Appear, Button, Loading, Paragraph } from "arwes"; // Arwes 框架中的 UI 组件
import Clickable from "../components/Clickable"; // 自定义的 Clickable 组件

const Launch = (props) => {
  // 使用 useMemo 优化选择项的渲染，避免不必要的重复计算
  const selectorBody = useMemo(() => {
    return props.planets?.map((planet) => (
      <option value={planet.kepler_name} key={planet.kepler_name}>
        {planet.kepler_name}
      </option>
    ));
  }, [props.planets]);

  // 获取当前日期，用于默认的发射日期
  const today = new Date().toISOString().split("T")[0];

  // 组件返回的 JSX 内容，包含表单和说明文字
  return (
    <Appear id="launch" animate show={props.entered}>
      {/* 说明性文本，介绍任务发射的概况 */}
      <Paragraph>安排任务发射，前往开普勒系外行星进行星际旅行。</Paragraph>
      <Paragraph>只有符合以下条件的已确认行星可以进行最早的计划任务：</Paragraph>
      <ul>
        <li>行星半径 &lt; 地球半径的 1.6 倍</li>
        <li>有效恒星辐射 &gt; 地球值的 0.36 倍且 &lt; 地球值的 1.11 倍</li>
      </ul>

      {/* 表单用于设置发射任务的详细信息 */}
      <form
        onSubmit={props.submitLaunch}
        style={{
          display: "inline-grid",
          gridTemplateColumns: "auto auto",
          gridGap: "10px 20px",
        }}
      >
        {/* 发射日期字段 */}
        <label htmlFor="launch-day">发射日期</label>
        <input
          type="date"
          id="launch-day"
          name="launch-day"
          min={today}
          max="2040-12-31"
          defaultValue={today}
        />
        
        {/* 任务名称字段 */}
        <label htmlFor="mission-name">任务名称</label>
        <input type="text" id="mission-name" name="mission-name" />

        {/* 火箭类型字段 */}
        <label htmlFor="rocket-name">火箭类型</label>
        <input type="text" id="rocket-name" name="rocket-name" defaultValue="Explorer IS1" />

        {/* 目标行星选择器 */}
        <label htmlFor="planets-selector">目的地系外行星</label>
        <select id="planets-selector" name="planets-selector">
          {selectorBody}
        </select>

        {/* 提交按钮 */}
        <Clickable>
          <Button
            animate
            show={props.entered}
            type="submit"
            layer="success"
            disabled={props.isPendingLaunch}
          >
            发射任务 ✔
          </Button>
        </Clickable>

        {/* 加载动画，显示在任务正在进行时 */}
        {props.isPendingLaunch && <Loading animate small />}
      </form>
    </Appear>
  );
};

export default Launch;
