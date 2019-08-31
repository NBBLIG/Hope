# 提交变更
git checkout master
git add .

if [ ! $1 ]; then  
git commit -m "New content"
else
git commit -m $1
fi

git push -u origin master

# 构建
gitbook build

# 发布
git checkout ph-pages
cp -r _book/* .
git add .
git commit -m $1
git push -u origin ph-pages
git checkout master