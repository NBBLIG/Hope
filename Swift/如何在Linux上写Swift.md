# How to Get It on Linux

如果你打算根据官网去编译，那么我可以帮你节省这个时间：不可能。Swift官网文档早已过时，我推荐利用 [swiftenv](https://github.com/kylef/swiftenv) 来安装，不过在此之前，你需要安装一些依赖：

```sh
# 以 Ubuntu 为例
sudo apt-get install git cmake ninja-build clang python uuid-dev libicu-dev icu-devtools libbsd-dev libedit-dev libxml2-dev libsqlite3-dev swig libpython-dev libncurses5-dev pkg-config libblocksruntime-dev libcurl4-openssl-dev systemtap-sdt-dev tzdata rsync
```
安装完依赖以后，就可以参考[文档](https://swiftenv.fuller.li/en/latest/installation.html)安装 swiftenv 了：

```sh
# Make the swiftenv folder
mkdir .swiftenv
# Clone the repo
git clone https://github.com/kylef/swiftenv ~/.swiftenv
# Add swiftenv to bash profile #1:
echo 'export SWIFTENV_ROOT="$HOME/.swiftenv"' >> ~/.bashrc
# Add swiftenv to bash profile #2
echo 'export PATH="$SWIFTENV_ROOT/bin:$PATH"' >> ~/.bashrc
# Add swiftenv to bash profile #3
echo 'eval "$(swiftenv init -)"' >> ~/.bashrc

source ~/.bashrc
``` 

###### 注： 你可能听说过 [Linuxbrew](https://docs.brew.sh/Homebrew-on-Linux), 作为[Homebrew](https://brew.sh/)的兄弟项目，swiftenv也是直接可用的，在安装好`Linuxbrew`以后，输入以下命令，就可以安装了：
```sh
brew install kylef/formulae/swiftenv

# 之后也要根据提示添加以下环境变量，这里以zsh为例
echo 'if which swiftenv > /dev/null; then eval "$(swiftenv init -)"; fi' >> ~/.zshrc
```

接下安装Swift的步骤就很简单了，我们直接从Swift官方复制产物压缩包的链接，并用以下方式安装：

```sh
# 这里我们安装 5.1-Dev 版本
swiftenv install https://swift.org/builds/swift-5.1-branch/ubuntu1804/swift-5.1-DEVELOPMENT-SNAPSHOT-2019-08-23-a/swift-5.1-DEVELOPMENT-SNAPSHOT-2019-08-23-a-ubuntu18.04.tar.gz

# 安装完毕后，可以检查一下版本号来确认是否安装成功
swift --version
```