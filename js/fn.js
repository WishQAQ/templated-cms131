/*
Powered by ly200.com		http://www.ly200.com
广州联雅网络科技有限公司		020-83226791
*/
(function ($, W){
	$.fn.extend({
		ad:function (opt){
			var opt = $.extend({
				img:null,//图片
				btn:null,//按钮,可以为空
				imgMethod:'.item',//图片容器兄弟元素的选择方法
				numClassN:'on',//按钮容器当前选中的类名
				sum:0,//图片个数
				sec:5000,//切换时间
				FinT:500,//淡入时间
				FoutT:300,//淡出时间
				opacity:1//按钮透明度,0全透明,1不透明
			}, opt);
			var oimg = $(opt.img, this);
			var obtn = $(opt.btn);
			opt.sum = parseInt(opt.sum);
			if (!oimg.length || !opt.sum){
				return this;
			}
			obtn.css('opacity', opt.opacity);
			var i = 0;//当前显示的元素下标
			var TId = '';//计时器ID
			var Switch = function (){
				i++;
				if (i>=opt.sum){
					i = 0;
				}
				oimg.eq(i).stop(true, true).fadeIn(opt.FinT).siblings(opt.imgMethod).stop(true, true).fadeOut(opt.FoutT);
				obtn.removeClass(opt.numClassN).eq(i).addClass(opt.numClassN);
			}
			TId = setInterval(Switch, opt.sec);
			obtn.each(function(index, self) {
				$(self).click(function(e) {
					clearInterval(TId);
					i = index;
					oimg.eq(i).stop(true, true).fadeIn(opt.FinT).siblings(opt.imgMethod).stop(true, true).fadeOut(opt.FoutT);
					obtn.removeClass(opt.numClassN);
					$(self).addClass(opt.numClassN);
					TId = setInterval(Switch, opt.sec);
				});//click end
			});
			return this;
		},//ad渐变切换
		adScroll:function (opt){
			var opt = $.extend({
				imgBox:null,//图片大容器
				btn:null,//按钮
				img:'li',//图片，Css选择器形式
				btnCurClass:'cur',//按钮当前样式
				speed:5000,//切换时间
				animateT:500,//动画时间
				opacity:1//按钮透明度,0全透明,1不透明
			}, opt);
			var imgBox = $(opt.imgBox, this);
			var btn = $(opt.btn, this);
			var img = $(opt.img, imgBox);//图片
			var img_num = img.length;//图片个数
			var img_width = img.outerWidth(true);//图片宽度
			var img_height = img.outerHeight(true);//图片高度
			
			if (img_num<=1){
				return this;
			}
			imgBox.scrollTop(0);
			var i = 0;//记录当前元素的下标
			var TId = '';//计时器ID
			var ScrollT = function (val, i){
				imgBox.stop(false,true).animate({scrollTop:val}, opt.animateT);
				btn.removeClass(opt.btnCurClass).eq(i).addClass(opt.btnCurClass);
			}
			
			TId = setInterval(function (){
				i++;
				if (i>=img_num){
					i = 0;
				}
				var val = i*img_height;
				ScrollT(val, i);
			}, opt.speed);
			
			imgBox.hover(function (){
				clearInterval(TId);
			}, function (){
				TId = setInterval(function (){
					i++;
					if (i>=img_num){
						i = 0;
					}
					var val = i*img_height;
					ScrollT(val, i);
				}, opt.speed);
			});
			
			btn.css('opacity', opt.opacity);
			btn.each(function(index, self) {
				var $self = $(self);
				$self.hover(function (){
					clearInterval(TId);
					var val = index*img_height;
					ScrollT(val, index);
					i = index;
					TId = setInterval(function (){
						i++;
						if (i>=img_num){
							i = 0;
						}
						var val = i*img_height;
						ScrollT(val, i);
					}, opt.speed);
				});//hover end
			});
			return this;
		}//ad上下滚动切换
	});//$.fn.extend end
	
	W.tab_div = function(tab, tabbox, curClass, etype, ToutSpeed){//选项卡切换函数, 变量tab、tabbox必须为jQuery对象,ToutSpeed鼠标延迟, etype1=>1 hover, 0 click
		if (!ToutSpeed){ToutSpeed=100;}
		var tabTId = '';
		if (etype){
			tab.hover(
				function (){
					var self_index = tab.index(this);
					tabTId = setTimeout(function (){
						tab.removeClass(curClass).eq(self_index).addClass(curClass);
						tabbox.css('display', 'none').eq(self_index).css('display', 'block');
					}, ToutSpeed);//setTimeout end
				},
				function (){
					clearTimeout(tabTId);
				}
			);//hover事件结束
		}else{
			tab.click(function (){
					var self_index = tab.index(this);
					tab.removeClass(curClass).eq(self_index).addClass(curClass);
					tabbox.css('display', 'none').eq(self_index).css('display', 'block');
				}
			);//click事件结束
		}
	}//tab_choice end
	
})(jQuery, window);