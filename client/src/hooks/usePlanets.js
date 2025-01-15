// src/hooks/usePlanets.js

// 导入必要的模块和请求函数
import { useCallback, useEffect, useState } from "react";
import { httpGetPlanets } from "./requests"; // 获取行星数据的请求函数

// 自定义 Hook：用于获取和管理行星数据
function usePlanets() {
  const [planets, savePlanets] = useState([]); // 存储行星数据的状态

  // 获取行星数据的函数
  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await httpGetPlanets(); // 调用请求函数获取行星数据
    savePlanets(fetchedPlanets); // 将获取到的数据存储到状态中
  }, []);

  // 在组件加载时调用 getPlanets 以获取初始的行星数据
  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  // 返回获取到的行星数据
  return planets;
}

export default usePlanets;
