## 关于爬取安居客淄博站二手房信息的设计

### 流程

1. 使用`superagent`请求[淄博站的地址](http://zibo.anjuke.com),获取响应`response`
2. 使用`cheerio`解析响应内容`response.text`
3. 获取一下信息：

    * 二手房列表：`ul.#houselist-mod-new`
    * 二手房内容：`.list-item`
    * 二手房发布标题：`.house-title>a`