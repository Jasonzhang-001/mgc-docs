# mgc-docs

Make a Great Company 协作组资料。GitHub Pages 从 `main` 分支根目录发布：<https://jasonzhang-001.github.io/mgc-docs/>。

## 增加一篇文档

1. 新建 `research/<英文路径>/`，放入不改动的 Markdown 原文。
2. 在该目录执行 `ln -s '原文文件名.md' _body.md`。Jekyll 的 include 只接受英文文件名；下划线开头的 `_body.md` 是指向原文的符号链接，不会单独发布。
3. 复制 `research/c-failure-cases-v0.2/index.md`，只改 `title`、`date`、`permalink` 和 `source_file`。
4. 在 `_data/docs.yml` 增加 `title`、`date`（`YYYY-MM-DD`）和 `path`。写在最上面的排在首页第一。

Pages 使用仓库自带的 Jekyll 生成页面，不需要单独的构建流程。
