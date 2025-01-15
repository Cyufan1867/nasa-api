// src/hooks/requests.js


// 加载行星数据并返回 JSON 格式
async function httpGetPlanets() {
  // TODO
}

// 加载发射任务，按任务编号排序后返回 JSON 格式
async function httpGetLaunches() {
  // TODO
}

// 将提供的发射任务数据提交到发射系统
async function httpSubmitLaunch(launch) {
  // TODO
}

// 删除指定 ID 的发射任务
async function httpAbortLaunch(id) {
  // TODO
}

// 导出所有请求函数，以便在其他模块中使用
export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
