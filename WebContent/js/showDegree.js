/* 这是前端需要的度分布图数据JSON格式
无向图，数组中有两个元素
[
        [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131070],

        [256, 128, 64, 32, 16, 8, 4, 2, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256]
]

有向图，数组中有三个元素，

[
        [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131070],

        [256, 128, 64, 32, 16, 8, 4, 2, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],

        [254, 126, 66, 30, 18, 6, 6, 5, 2, 256, 128, 64, 32, 16, 8, 4, 2, 1]
]
第一个元素表示横轴，是度数，
第二个元素是对应的结点个数，对于有向图是出度结点个数

第三个元素对于有向图是入度结点个数
元素的长度是一样的，一一对应

*/
var degree2 = null; // 度图分布实例

// 度分布图模板
var dOption = {
        title: {
                text: '度数分布图',
                subtext: '孙家栋',
                x: 'right',
                y: 'bottom'
        },
        tooltip: {
                trigger: 'item'
        },
        legend: {
                data: ['度数'],
                x: 'center',
                y: 'top'
        },
        toolbox: {
                show: true,
                feature: {
                        mark: { show: true },
                        dataZoom: { show: true },
                        dataView: { show: true },
                        //magicType: { show: true, type: ['line'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                }
        },
        calculable: true,
        dataZoom: {
                show: true,
                realtime: true
        },
        xAxis: [
            {
                    type: 'category',
                    boundaryGap: true,
                    data: []
            }
        ],
        yAxis: [
            {
                    type: 'value'
            }
        ],
        series: [
            {
                    name: '度数',
                    type: 'line',
                    data: []
            },
            {
                    name: '入度',
                    type: 'line',
                    data: []
            }
        ]
};


// 画度分布图
/*
function paintDegree(root, status) {

        if (status != "success") {
                ///////////////////////////////////////////////////////
                //                  提醒用户没有加载成功                      //
                ///////////////////////////////////////////////////////
                return console.log(status);
        }
        */
        // TODO
        // Step:3 conifg ECharts's path, link to echarts.js from current page.
        // Step:3 为模块加载器配置echarts的路径，从当前页面链接到echarts.js，定义所需图表路径
        require.config({
                paths: {
                        echarts: '../js'
                }
        });

        // Step:4 require echarts and use it in the callback.
        // Step:4 动态加载echarts然后在回调函数中开始使用，注意保持按需加载结构定义图表路径
        require(
        	    [
        	        'echarts',
        	        'echarts/chart/bar',
        	        'echarts/chart/line',
        	        'echarts/chart/scatter',
        	        'echarts/chart/force',
        	        'echarts/chart/chord'
        	    ],
        	    eChart    
        	);
       function eChart(ec) {
                    //echarts = ec;
                    degree2 = ec.init(document.getElementById('degree2'));
                    $.get("../json/degree.json", function (root,status){
                        if (status != "success") {
                                 // 提示用户没有拿到图
                                 return console.log(error);
                         }
                    // 接下来是将后台返回的度分布图数据
                    // 组装成echats支持的格式

                    if (root.directed == true) {//有向图
                            dOption.legend.data[0] = "出度";
                            dOption.legend.data.push("入度");
                            dOption.series[0].name = '出度';
                            for(var i=0;i<root.degrees.length;i++){
                            dOption.series[0].data[i] = root.numbers0[i].number;
                            dOption.series[1].data[i] = root.numbers[i].number;
                    }
                    }
                    
                    else {//无向图
                    	for(var i=0;i<root.degrees.length;i++){
                            dOption.series[0].data[i] = root.numbers0[i].number;
                    	}
                            dOption.series.pop(1);
                    
                    }

                    for(var i=0;i<root.degrees.length;i++){
                        dOption.xAxis[0].data[i] = root.degrees[i].degree;
                    }
                    degree2.setOption(dOption);
            });

}
