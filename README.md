# 找服网 · 传奇发布网新开服（静态站）

纯静态站点，所有页面平铺在本目录，直接指向 GitHub Pages 用户站 `zhaofuwz.github.io`。

## 部署

1. 把本目录下的全部文件（含 `.nojekyll`、`favicon.svg`）上传到 `zhaofuwz/zhaofuwz.github.io` 仓库根目录；
2. 仓库 Settings → Pages，Source 选 `Deploy from a branch`，分支 `main`、目录 `/ (root)`；
3. 等待 1-3 分钟，访问 https://zhaofuwz.github.io 即可。

## 文件结构（全部在根目录）

| 文件 | 说明 |
| --- | --- |
| index.html | 首页：今日开服表 + 推荐 + 攻略/资讯 |
| kaifu.html | 完整开服表（66 组，支持版本筛选） |
| banben.html | 版本专区（11 个方向对比） |
| gonglue.html / zixun.html | 攻略、资讯栏目列表 |
| a1.html - a40.html | 40 篇可打开阅读的文章 |
| search.html + search-data.js | 站内搜索（支持 ?q= 参数） |
| style.css / app.js | 样式与交互，单文件 |
| about.html / 404.html | 关于页、错误页 |
| sitemap.xml / robots.txt | SEO 用，已固定指向 zhaofuwz.github.io |

## 改内容

- 文章内容在 `articles_gonglue.py`、`articles_zixun.py`，开服数据在 `build.py` 的 `RAW_ROWS`；
- 修改后执行 `python3 build.py` 重新生成全部页面、搜索索引与 sitemap；
- 域名固定写在 `build.py` 的 `DOMAIN`，换域名时改这一处即可（canonical、sitemap 同步更新）。

## 说明

站点为信息聚合站，不提供客户端下载，不挂第三方工具链接；文中所有“攻略”按钮均指向站内文章，全站无死链。
