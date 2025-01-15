// src/hooks/useLaunches.js

// 导入必要的模块和函数
import { useCallback, useEffect, useState } from "react";
import {
  httpGetLaunches, // 获取发射任务数据的请求函数
  httpSubmitLaunch, // 提交发射任务的请求函数
  httpAbortLaunch, // 取消发射任务的请求函数
} from './requests';

// 自定义 Hook：用于管理发射任务数据及其相关操作
function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
  const [launches, saveLaunches] = useState([]); // 存储发射任务数据
  const [isPendingLaunch, setPendingLaunch] = useState(false); // 用于表示是否有待执行的发射任务

  // 获取发射任务数据的函数
  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches(); // 调用请求函数获取发射任务
    saveLaunches(fetchedLaunches); // 将获取到的数据存储到状态中
  }, []);

  // 在组件加载时调用 getLaunches 以获取初始的发射任务数据
  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  // 提交新的发射任务
  const submitLaunch = useCallback(async (e) => {
    e.preventDefault(); // 阻止默认表单提交行为
    setPendingLaunch(true); // 将状态设为有待执行的发射任务
    const data = new FormData(e.target); // 从表单获取数据
    const launchDate = new Date(data.get("launch-day")); // 发射日期
    const mission = data.get("mission-name"); // 任务名称
    const rocket = data.get("rocket-name"); // 火箭类型
    const target = data.get("planets-selector"); // 目标行星

    // 调用请求函数提交发射任务
    const response = await httpSubmitLaunch({
      launchDate,
      mission,
      rocket,
      target,
    });

    const success = response.ok; // 检查请求是否成功
    if (success) {
      getLaunches(); // 重新获取发射任务数据
      setTimeout(() => {
        setPendingLaunch(false); // 重置待执行状态
        onSuccessSound(); // 播放成功声音
      }, 800);
    } else {
      onFailureSound(); // 播放失败声音
    }
  }, [getLaunches, onSuccessSound, onFailureSound]);

  // 取消指定 ID 的发射任务
  const abortLaunch = useCallback(async (id) => {
    const response = await httpAbortLaunch(id); // 调用请求函数取消发射任务

    const success = response.ok; // 检查请求是否成功
    if (success) {
      getLaunches(); // 重新获取发射任务数据
      onAbortSound(); // 播放取消任务的声音
    } else {
      onFailureSound(); // 播放失败声音
    }
  }, [getLaunches, onAbortSound, onFailureSound]);

  // 返回发射任务数据及相关操作
  return {
    launches, // 发射任务数据
    isPendingLaunch, // 是否有待执行的发射任务
    submitLaunch, // 提交发射任务的函数
    abortLaunch, // 取消发射任务的函数
  };
}

export default useLaunches;
