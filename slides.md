# 测试，测试

Note: 这里记录一些关于测试的想法，有些可能会很快用上，有些可能将来会用上，有些可能不会用上。(2016-08-08)后台的测试覆盖工作已经启动，现在开始接续使用 `Friday` 进行测试的内容。



## 为什么要对老代码进行测试改造？

Note: 我咨询过一些技术负责人，他们现在线上跑的代码多半是没有大规模的测试用例的。开发主要靠人测，部分代码会有单元测试。



## 人肉行为测试难以满足需求

1. 业务逻辑多而复杂，经常发生改动 A 触动 B 的情况
2. 很多代码质量不高需要重构，但是不敢做，怕影响使用
3. 出现问题依赖用户反馈，影响大家的体验和对我们的信任
4. 代码规模还没大到让人绝望的程度……



## 正确的测试姿势

我认为现代互联网公司不适合配置专职测试，并将产品交由他们测试，原因有下：

1. 测试人员很可能不了解业务
2. 反馈周期长，信息交互链长，信息噪音大
3. 开发人员都不喜欢 Bug，尤其是别人发现的 Bug
4. 增加人力管理负担……


我认为正确的测试应该分为三部分。

1. 行为测试
2. 代码功能测试
3. 运维测试


### 行为测试

这部分测试由产品经理负责。他们负责产品的用户体验部分，自然应该负担起这个环节的测试工作。

1. 是否忠实还原设计稿和交互逻辑
2. 界面元素是否工作正常
3. 界面和交互设计是否合理高效
4. 其它可能未预料到的体验问题

Note: 我认为互联网公司的职人都应该有需求变动的心理准备，不需要刻意追求需求不变。换言之，如果产品经理在测试中发现体验问题，大可以作为产品 Bug 来处理。当然，个中尺度有待把握。


### 代码功能测试

这部分测试由开发人员负责。他们需要针对功能模块进行细致的单元测试开发，并针对接口和交互逻辑进行行为测试开发。

1. 基础函数的单元测试
2. 行为测试（前端）
3. 接口测试（后端）

> 我们现在要求 1 和 3 逐步达到完全覆盖。


### 运维测试

也可以称为“部署测试”或者“环境测试”，由开发人员配合运维进行测试。目的是保证代码能够在生产环境中正常工作，或者在不同环境重新部署能顺利完成，或者在集群、分布式中能顺利过渡。

1. 部署环节，包括自动化脚本、环境预处理等
2. 压力测试
3. 自动化测试和持续继承

长期来看，如果以后 Dev-Ops 继续发展，那么这部分测试有可能也会合并交给开发来完成。（多半小公司会这么搞）



好，说完测试建设思路，接下来开始逐步推进我们的测试覆盖工作。



## 第一步：接口测试

就目前的环节来看，前端框架 [Tiger Prawn](https://github.com/Dianjoy/tiger-prawn) 的升级重构对以往业务产生的影响相对较小（重构余地也不大），所以暂时放一放，先做接口部分，也就是业务逻辑相关的测试。

后端测试顺利开展，测试覆盖率稳步提高之后，再着手前端测试覆盖。


### 开发流程

1. 接口开发需要完成相应的测试用例
2. 基础框架开发需要完成单元测试用例
3. 发现 Bug 后，修复 Bug 前应先完成测试用例，存入代码仓库


### 代码上线流程

1. 小修改，需要对明确涉及的环节进行回归测试。（比如修改了 `\app\service\AD.class.php`，那么至少要完成 AD testsuite 测试。）
2. [待推进]功能开发，或变动较大，上线前需要进行全面测试（通常是晚上），通过后次日早晨上线



## 基础功能测试

主要测试 [Lemon Grass](https://github.com/Dianjoy/lemon-grass)（后简称 LM）的基础功能，比如：

1. Utils
    1. SQLHelper
2. MVC
    1. Model
    2. Collection
    3. Controller
    4. Service

这部分只是对之前的测试进行整理，尚未完成计划的100%。


### 测试环境

* phpunit
* 启动文件：bootstrap.php
* 配置信息：phpunit.xml

```shell
> phpunit
```



## 接口测试

为了减少重复代码，我们开发了 `Friday` 帮助我们读取接口定义文件，然后按照其中的要求访问接口，验证接口数据。大概流程如下：

1. 编写接口描述 `MyTest.json`
2. 创建测试类，继承 `Friday`
3. 修改测试类里的属性
4. 进行测试

> 详细文档 [Github](https://github.com/Dianjoy/lemon-grass/tree/master/test) [Gitlab](git.yxpopo.com/dianjoy/lemon-grass/tree/master/test)

Note: Friday 取自《鲁滨逊漂流记》。



### `GET` 接口测试

`GET` 测试是最简单的测试，基本上只要完成返回数据的定义即可。



### `POST` `PATCH` `DELETE` 

`POST` 测试之后，通常需要验证创建的数据是否正常写入数据库，这就需要注册回调函数。

参考 [接口测试 - 创建、修改、删除](https://github.com/Dianjoy/lemon-grass/blob/master/test/test-create-update-delete.md)



## 下一步：扩大测试覆盖率，搭建自动化测试环境


### 8月份目标

1. 接口覆盖率 70%
2. 自动化测试+持续集成环境


### 9月份目标

1. 接口覆盖率 100%
2. Bug 测试用例 100%
3. 基础框架单元测试覆盖率 100%



## 任务分配

### 肉山

1. 测试服务器
2. 肉山负责的接口测试
3. 基础组件的单元测试


### 小胖 + 陈胜

1. 编写各自负责的接口测试


### Moment + 立柯

1. 行为测试，并补充测试用例
2. 前端界面测试


## FAQ