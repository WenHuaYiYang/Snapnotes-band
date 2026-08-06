/**
 * aiot-toolkit 构建配置（webpack 后处理）。
 *
 * 性能优化：关闭内联 sourcemap。
 * dev 构建下每个页面包的尾部都内嵌一段 base64 sourcemap 注释——
 * search.js 1.4MB 里有 522K 是 sourcemap，chat.js 同理。手环引擎加载页面包时
 * 必须整包解析（含扫描这段 base64），纯浪费且占主线程 1-2 秒。
 * 真机 RPK 不需要 sourcemap（IDE 调试走独立链路），这里用 postHook 强制 devtool=false，
 * 页面包体积直接降约 37%，search/chat 入口解析时间随之大减。
 *
 * 若需要 IDE 设备调试的 sourcemap，删掉本文件的 postHook 即可恢复。
 */
module.exports = {
  postHook(config) {
    // 关闭内联 sourcemap（各页面 JS 尾部的 base64 注释），减小设备端解析量
    config.devtool = false
  }
}
