const sh = require("shelljs");

const fs = require('fs').promises;
const readDir = fs.readdir;

const path = require("path");

const parentDir = path.join(__dirname, "..");

// 构建图书文件
const buildBook = () => {
    return sh.exec("gitbook build");
};
// 排除的目录名称
const excludeDirs = [
    "_book",
    ".idea",
    ".git",
    "scripts",
    ".vscode",
    "node_modules",
    "app",
    "node_modules",
    "LICENSE",
    "SUMMARY"
];

// 带过滤的文件
const validFiles = [
    ".md",
    ".png",
    ".jpg"
];

const pathFilter = dirent => {
    return dirent.isDirectory() && !excludeDirs.includes(dirent.name);
};


const generateIndex = async () => {
    let paths = await readDir(parentDir, {withFileTypes: true});
    paths = paths.filter(pathFilter);
    let summary = `
    # Summary

    * [前言](README.md)
    `;
    for (let dirent of paths) {
        summary = await walk(summary, parentDir, dirent);
    }
    console.log(summary);
};

const walk = async (lastSummary, lastDir, dirent) => {
    const parsedPath = path.parse(dirent.name);
    if (dirent.isFile() ) {
        return parsedPath.ext === ".md" ? lastSummary + `
    
    * [${dirent.name}](${path.join(parentDir, lastDir, dirent.name)})
    ` : lastSummary;
    }

    const cwd = path.join(lastDir, dirent.name);
    let paths = await readDir(cwd, {withFileTypes: true});
    for (let subPath of paths) {
        lastSummary += await walk(lastSummary, cwd, subPath)
    }
    return lastSummary
};

module.exports = {
    buildBook
};