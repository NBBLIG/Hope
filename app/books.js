const sh = require("shelljs");

// 构建图书文件
const buildBook = () => {
    return sh.exec("gitbook build");
};

module.exports = {
  buildBook
};
