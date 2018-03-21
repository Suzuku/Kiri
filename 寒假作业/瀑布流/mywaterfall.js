/**
 * Created by Administrator on 2016/7/20.
 */
$(document).ready(function(){
    $(window).on("load",function(){
        imgLocation();
        var dataImg={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};
        window.onscroll=function(){
            if(scrollside()){
                //each()方法遍历数据加载进来
                $.each(dataImg.data,function(index,value){
                    var box = $("<div>").addClass("box").appendTo($("#container"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    console.log("./img/"+$(value).attr("src"));
                    $("<img>").attr("src","./img/"+$(value).attr("src")).appendTo(content);
                });
                imgLocation();
            }
        };
    });
});

function scrollside(){
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
    var documentHeight=$(document).width();
    var scrollHeight=$(window).scrollTop();
    return (lastboxHeight<scrollHeight+documentHeight)?true:false;
}

function imgLocation(){
    //用jquery获取所有的box
    var box = $(".box");
    //box的宽度
    var boxWidth = box.eq(0).width();
    //每行共有几个box
    var num = Math.floor($(window).width()/boxWidth);
    //存放box的boxHeight
    var boxArr = [];
    //each方法遍历box，当只有一行的时候记录boxHeight，多于一行则找出minBoxHeight，并设置样式。
    box.each(function(index,value){
        var boxHeight = box.eq(index).height();
        if(index<num){
            boxArr[index] = boxHeight;
        }else{
            var minBoxHeight = Math.min.apply(null,boxArr);
            var minBoxIndex = $.inArray(minBoxHeight,boxArr);
            $(value).css({
                "position":"absolute",
                "top":minBoxHeight,
                "left":box.eq(minBoxIndex).position().left
            });
            //动态变化minBoxIndex
            boxArr[minBoxIndex] += box.eq(index).height();
        }
    });
}
