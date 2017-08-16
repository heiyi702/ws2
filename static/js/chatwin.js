$(function(){
	var userId = 'yonghuOpenid';
	var userNickname = '用户昵称';
    //var userPassword = '123';
	var toId = 'DOC12345';
	var toNickname='甲医生';
	//公众号id
	var oaId;
	//设置当前聊天组 key: "user1:user2" 当前用户和user2聊天 缓存用
	var group = userId + ':' + toId; 
	var documentLoading='正在连接...';
	var tipOver='连接已断开';
	var tipOk='连接成功 请开始对话';
	var tipImgErr='图片上传失败';
	//卡片默认图
	var initCardImg='static/img/LOGO.png';
	var initCardBotImg='static/img/LOGO.png';
	//文件默认图
	var initFielBotImg='static/img/LOGO.jpg';
	//图片上传失败
	var imgErrUrl='static/img/imgerr.png';
	// 默认头像
	var leftIconURL='./static/img/left.jpg';
	var rightIconURL='./static/img/right.jpg';
	//ws连接状态码
	var wsState=false;
	document.title=documentLoading;
	
	//获取信息的服务器地址
	var userMsgUrl='';
	//发送文件 图片服务器url
	var imgUrlSever;
	var fileUrlSever;
	
	
	//不支持ws直接提示
	if(!window.WebSocket){
		alert('该浏览器不支持对话，请更换浏览器！');
		return
	}
	
	//初始化better scroll
	function initScroll(){
		scroll = new BScroll(document.getElementById('hua'),{
			probeType: 2,
			startX: 0,
			click: true
		})
	}
	initScroll();
	//强制初始失焦 启动滑块
	$('.input').eq(0).blur();
			
	/* 登录后加载已缓存的数据 */
	if(localStorage[group]) {
		var localContent = JSON.parse(localStorage[group]);
		//循环数组
		$(localContent).each(function(key, obj) {
			//获取对应模板
			showHistory(obj);
			scroll.refresh();
			text2bottom();
		});
	}
	

	var hostfe = "http://wx.ics.h960.com/";

	var ws ;
	var ws=io.connect(hostfe);
	//连接成功
	ws.on('confirm', function(msg){
		document.title='正在与'+toNickname+'对话';
		showTip(tipOk);
        getUserMsg();
		wsState=true;
	});
	
	
    //socket.emit('send',data);  发送信息的
	//链接断开
	ws.on('disconnect',function(){
        //showTip(tipOver);
		wsState=false;
	})
    

	//接收文字信息
	ws.on('message', function(data){
        text = data.text.content;
        leftIconURL = data.headimgurl;
        showFormTxt(text);
		/*if(data.touser==userId){
			//接收文字信息
			if(data.msgtype=='text'){
				var txt=data.text.content;
                leftIconURL = data.headimgurl;
				showFormTxt(txt);
				text2bottom();
				detailMessage(txt, data.FromUserName, 'txt',msgid);
			}else{
				if(data.MsgType=='text'){
					var txt=data.Content;
					otherDetailMessage(txt, data.FromUserName, 'txt',msgid);
				}
			}
		}*/
		
	});
	
	//接收图片消息
	/*ws.on('', function(data){
		var msgid=data.MsgId;
		if(data.FromUserName==toId){
			//接收文字信息
			if(data.MsgType=='img'){
				var url=data.Content;
				showFormImg(url);
				detailMessage(url, data.FromUserName, 'img',msgid);
			}else{
				if(data.MsgType=='img'){
					var txt=data.Content;
					otherDetailMessage(url, data.FromUserName, 'img',msgid);
				}
			}
		}
		
	});
	
	//接收卡片推送消息
	ws.on('', function(data){
		var msgid=data.MsgId;
		if(data.FromUserName==toId){
			//接收文字信息
			if(data.MsgType=='card'){
				var card=data.Content;
				showCardMsg(card);
				detailMessage(card, data.FromUserName, 'card',msgid);
			}else{
				if(data.MsgType=='card'){
					var card=data.Content;
					otherDetailMessage(card, data.FromUserName, 'card',msgid);
				}
			}
		}
		
	});
	*/
	
	
	//打开聊天获取用户基本信息
	function getUserMsg(){
		var pageurl=location.href;
			
		var userinfo = JSON.parse(decodeURIComponent(pageurl.split("?ui=")[1])); 
		//alert("UI:" + JSON.stringify(userinfo));
        oaId = userinfo.oaid;
        document.title = "《" + userinfo.oaname + "》客服中心";
		userId = userinfo.openid; 
		userNickname = userinfo.nickname; 
		rightIconURL = userinfo.headimgurl; 
        ws.emit('setname',userinfo.openid);
	}
	   
    //滚动条到最下方
	function text2bottom(){
		scroll.refresh();
		var conH=$('.con').height();
		var huaH=$('#hua').height();
		if(conH<huaH){
			scroll.scrollTo(0,0);
		}else{
			var y=conH-huaH;
			scroll.scrollTo(0,-y,0);
		}
	}
            
    //格式化时间
	function crtTimeFtt() {
		var date = new Date();
		return date.getFullYear() +
			'-' + (date.getMonth() + 1) +
			'-' + date.getDate() +
			' ' + date.getHours() +
			':' + date.getMinutes() +
			':' + date.getSeconds();
	}
	
	//转换文件大小
	function restSize(size){
		var restSize;
		if(size<1024){
			return restSize=size+'B';
		}else if(size<1048576){
			restSize=(size/1024).toFixed(1);
			return restSize=restSize+'K';
		}else if(size<8589934592){
			restSize=(size/1024/1024).toFixed(1);
			return restSize=restSize+'M';
		}else{
			restSize=(size/1024/1024/1024).toFixed(1);
			return restSize=restSize+'G';
		}
	}
	
	
	//缓存消息处理 	
	function detailMessage(data, from, type, id) {
		var localContent = new Array();
		if(localStorage[group]) {
			localContent = JSON.parse(localStorage[group]);
		}
		if(localContent.length<100){
			localContent[localContent.length] = {
				'time': crtTimeFtt(),
				'data': data, //数据
				'from': from, //谁发的
				'type': type, //文本类型
				'id': id //消息id
			};			
		}else{
			localContent.shift();
			localContent.push({
				'time': crtTimeFtt(),
				'data': data, //数据
				'from': from, //谁发的
				'type': type, //文本类型
				'id': id //消息id
			})
		}
		localStorage[group] = JSON.stringify(localContent); //存储本地；
	}
    
    //处理其他用户发送的消息 缓存处理 
	function otherDetailMessage(data,from,type,id){
	    var localContent = new Array();
	    var current_group = userId+':'+from;
	    if (localStorage[current_group]) {
	        localContent = JSON.parse(localStorage[current_group]);
	    }
	    
	    if(localContent.length<100){
			localContent[localContent.length] = {
				'time': crtTimeFtt(),
				'data': data, //数据
				'from': from, //谁发的
				'type': type, //文本类型
				'id': id //消息id
			};			
		}else{
			localContent.shift();
			localContent.push({
				'time': crtTimeFtt(),
				'data': data, //数据
				'from': from, //谁发的
				'type': type, //文本类型
				'id': id //消息id
			})
		}
	    localStorage[current_group] = JSON.stringify(localContent);//存储本地；
	}
    
    //调出表情列表 加入文本框
	$('.face').click(function() {
		if($('.faceList li').length == 0) {
			faceDown();
		}
		$('.none').slideUp(0);
		$('.faceNone').slideDown(200,text2bottom);
		var inputCon = $('.input').eq(0).val();
		//点击表情 加入到input
		$('.faceList li').on('click', function() {
			var face = $(this).data('con')
			var val = inputCon + face;
			$('.input').eq(0).val(val);
			inputCon = $('.input').eq(0).val();
			$('.more').eq(0).css('display','none');
			$('#send').css('display','block');	
		})
	})
	
	//调出更多
	$('.more').click(function() {
		$('.none').slideUp(0);
		$('.moreNone').slideDown(200,text2bottom);
	})
    
    //关闭表情 更多
	$('.con').click(function() {
		$('.none').slideUp(200,text2bottom);
	})
    
    /*//键盘弹出窗口大小设置 聚焦收回表情 更多
    function rest(){
    	$('.none').slideUp(0);
		$('body,html,#app').height(document.body.clientHeight);
		$('.con').eq(0).attr({'overflow':'hidden','height':'100%'});
		$('body,html,#app').attr({'overflow':'auto'});
		scroll.destroy() 
		text2bottom();
    }
	$('.msgCon .input').eq(0).focus(function(){
		rest();
	});
	$('.msgCon .input').eq(0).blur(function() {
		$('.con').attr({'overflow':'auto'});
		$('body,html,#app').height("100%");
		$('body,html,#app').attr({'overflow':'hidden'})
		$('.con').eq(0).attr({'overflow':'auto','height':'auto'})
		initScroll();
		text2bottom();
	})*/
	
	//键盘弹出窗口大小设置 聚焦收回表情 更多
	function restFocus(){
    	$('.none').slideUp(0);
		$('.con').eq(0).attr({'overflow':'hidden','height':'100%'});
		$('html').attr({'overflow':'hidden'});
		$('body').attr({'overflow':'hidden'});
		$('#app').attr({'overflow':'hidden'});
		scroll.destroy()
		var conH=$('.con').eq(0).height();
		var huaH =$('#hua').height();

		if(conH>huaH){
			text2bottom();
		}else{
			setTimeout(function(){
				var sTop=$(document).scrollTop()
				$('#upKong').css({'height':sTop,'width':'100%'})
				$('#upKong').show();
				text2bottom();
			},500)
		}
		text2bottom();
    }
	
	$('.msgCon .input').eq(0).focus(function(){
		restFocus();
	});
	function restBlur(){
		$('#upKong').hide()
		$('.con').attr({'overflow':'auto'});
		$('body,html,#app').height("100%");
		$('body,html,#app').attr({'overflow':'hidden'})
		$('.con').eq(0).attr({'overflow':'auto','height':'auto'})
		initScroll();
		text2bottom();
		
		// var h=window.innerHeight;
	}
	$('.msgCon .input').eq(0).blur(function() {
		restBlur();
	})
	
	
	//加载表情列表
	function faceDown() {
		for(var i in data) {
			$('.faceList').append('<li class="faceCon" data-con="' + data[i].con + '"><img src="' + data[i].src + '" /></li>')
		}
	}
	
	// 字符替换为表情
	/*function replace_em(str) {
		str = str.replace(/\</g, '&lt;');
		str = str.replace(/\>/g, '&gt;');
		str = str.replace(/\n/g, '<br/>');
		str = str.replace(/\[em_([0-9]*)\]/g, '<img class="txtFace" src="static/img/face/$1.png" border="0" />');
		return str;
	}*/

	function replace_em(str) { 
         //alert("in replace_em with:" + str);  
         var reg = /\[囧\]|\[CoolGuy\]|\[Blush\]|\[Scream\]|\[Silent\]|\[Slight\]|\[Laugh\]|\[Grin\]|\[Cry\]|\[Scowl\]|\[Angry\]|\[Awkward\]|\[Shy\]|\[Surprise\]|\[Sob\]|\[Frown\]|\[Grimace\]|\[Drool\]|\[Sleep\]|\[Tongue\]|\[Smile\]|\[Puke\]|\[Chuckle\]|\[Joyful\]|\[Smug\]|\/\:\,@o|\/\:\:d|\/\:\:D|\/\:\:'\(|\/\:\:\||\/\:\:@|\/\:\:Q|\/\:\:\-\||\/\:\:\$|\/\:\:>|\/\:\:O|\/\:\:\-o|\/\:8\-\)|\/\:\:<|\/\:\:\(|\/\:\:\~|\/\:\:B|\/\:\:Z|\/\:\:P|\/\:\,@P|\/\:\,@-D|\/\:\:\)|\/\:\:X|\/\:\:T/g; 

        str = str.replace(reg, function(a){
            //alert(a); 
            if (faceData[a] == undefined) 
                return a; 
            else
                return faceData[a];
		});
        //alert(str); 
		return str;
	}

    function replace_emback(str) { 
        // alert("in replace_emback with:" + str);  
         var reg = /\[囧\]|\[CoolGuy\]|\[Blush\]|\[Scream\]|\[Silent\]|\[Slight\]|\[Laugh\]|\[Grin\]|\[Cry\]|\[Scowl\]|\[Angry\]|\[Awkward\]|\[Shy\]|\[Surprise\]|\[Sob\]|\[Frown\]|\[Grimace\]|\[Drool\]|\[Sleep\]|\[Tongue\]|\[Smile\]|\[Puke\]|\[Chuckle\]|\[Joyful\]|\[Smug\]|\/\:\,@o|\/\:\:d|\/\:\:D|\/\:\:'\(|\/\:\:\||\/\:\:@|\/\:\:Q|\/\:\:\-\||\/\:\:\$|\/\:\:>|\/\:\:O|\/\:\:\-o|\/\:8\-\)|\/\:\:<|\/\:\:\(|\/\:\:\~|\/\:\:B|\/\:\:Z|\/\:\:P|\/\:\,@P|\/\:\,@-D|\/\:\:\)|\/\:\:X|\/\:\:T/g; 
         str = str.replace(reg, function(a){
           // alert(a); 
            if (faceData[a] == undefined) 
                return a; 
            else
                return faceData[a];
         });
         //alert("Result: " + str); 
         return str;
     }
	
	//显示历史信息
	function showHistory(msg){
		if(msg.from=='me'){
			if(msg.type=='txt'){
				if(msg.data){
					showMyTxt(msg.data);
				}
				
			}else if(msg.type=='img'){
				showMyImg(msg.data);
			}else if(msg.type=='file'){
				
			}
		}else if(msg.from==toId){
			if(msg.type=='txt'){
				if(msg.data){
					showFormTxt(msg.data);
				}				
			}else if(msg.type=='img'){
				showFormImg(msg.data);
			}else if(msg.type=='card'){
				console.log(msg)
				if(msg.data){
					showCardMsg(msg.data);
				}
			}
		}
		text2bottom();
	}

	//显示提示信息
	function showTip(tipMsg){
		$('.con').eq(0).append('<div class="tip"><span>'+tipMsg+'</span></div>');
		text2bottom();
	}
	
	//自己发送的文本信息发到屏幕上
	function showMyTxt(msgCon) {
		if(msgCon.trim() == '') {
			$('.input').eq(0).blur();
			return;
		}

		var msgCon = replace_emback(msgCon);

		//加入到内容区
		$('.con').append('<div class="zijiTxt"><div class="zijiR"><img src="'+
                         rightIconURL + 
                         '" /></div><div class="zijiC"><div class="speech txtP">' + 
                         msgCon + 
                         '</div></div><div class="zijiL"></div></div>');

		$('.input').eq(0).val('');
		$('.input').eq(0).blur();
		text2bottom();
		$('.input').eq(0)[0].focus();
	}
	
	//显示自己的图片信息 
	function showMyImg(url) {
		//加入到内容区
		$('.con').append('<div class="rightd"><span class="rightd_h"><img src="'+
                            rightIconURL +
                            '" /></span><div class="speech right pic"><a href="'+url+'" class="picCon"><img src="'+
                            url + '" /></a></div></div>');	
		text2bottom();
		$('.picCon img').load(function(){
			text2bottom();
		})
	}
	
	
	//显示对方的文本信息 
	function showFormTxt(msg) {
		msgCon = replace_emback(msg);
		//加入到内容区
		$('.con').append('<div class="duifangTxt"><div class="duifangL"><img src="'+
                            leftIconURL+'" /></div><div class="duifangC"><div class="speech txtP">'+
							msgCon+ '</div></div><div class="duifangR"></div></div>');
		text2bottom();
	}
	
	//显示对方的卡片信息（推送消息）
	function showCardMsg(card){
		//加入到内容区
		$('.con').append('<div class="leftd"><span class="leftd_h"><img src="'+
                         leftIconURL+'" /></span><div class="speech left cardLeft"><div class="card"><div class="cardTit"><a class="cardUrl" href="'+
                         card.cardUrl+'">'+card.cardTit+'</a></div><div class="cardCon"><a class="cardUrl cardTxt" href="'+
                         card.cardUrl+'">'+card.cardCon+'</a><a class="cardUrl cardImg" href="'+
                         card.cardUrl+'><img src="'+initCardImg+'"/></a></div><div class="cardBot"><a href="'+
                         card.cardUrl+'"><img src="'+initCardBotImg+'"/><span>'+card.cardBot+'</span></a></div></div></div></div>');
		text2bottom();
	}
	
	//显示对方的图片信息 
	function showFormImg(url) {
		//加入到内容区
		$('.con').append('<div class="leftd"><span class="leftd_h"><img src="'+
                         leftIconURL+'" /></span><div class="speech left pic"><a href="'+
                         url+'" class="picCon"><img src="'+url+'" /></a></div></div>');
		text2bottom();
		$('.picCon img').load(function(){
			text2bottom();
		})
	}
	
	
	//显示对方的文件信息 
	function showFormFile(msg) {
		//加入到内容区
		$('.con').append('<div class="leftd"><span class="leftd_h"><img src="'+leftIconURL+'" /></span>'+
					'<div class="speech left fileLeft"><div class="file"><div class="fileCon">'+
								'<a class="fileTit" href="'+msg.fileUrl+'">'+msg.fileName+'</a>'+
								'<a class="fileSize" href="'+msg.fileUrl+'">'+msg.fileSize+'</a></div><div class="fileImg">'+
								'<a class="yasuobao" href="'+msg.fileUrl+'"></a>'+
						'</div></div><div class="fileBot">'+
						'<a href="'+msg.fileUrl+'">'+
						'<img src="'+initFielBotImg+'"/>'+
						'<span>文件下方</span></a></div></div></div>');
		text2bottom();
		/*
        $('.picCon img').load(function(){
			text2bottom();
		})
        */
	}
	
	//发送文字消息
	function sendMsgTxt(){
		//获取文本内容
		var msgCon=$(".input").eq(0).val();
		if (msgCon.trim().length==0){
	    	return ;
	   }
		//设置msg信息
		var now = (new Date()).valueOf();
		var msgid = "h5c"+now.toString() + (Math.round(Math.random()*99999) + 100000);
		var setMsg={
			"FromUserName":userId,
			"ToUserName":oaId,
			"MsgType":'text',
			"Content":msgCon,
			"MsgId":msgid,
			"CreateTime":now,
		};
		if(wsState==true){
			ws.emit('send',setMsg);
			showMyTxt(msgCon);
			detailMessage(msgCon,'me','txt',msgid);		
			$('.input').eq(0)[0].focus();
		}else{
			showTip(tipOver);
			$('.input').eq(0)[0].focus();
		}
	}
	
	//回车发送文本消息
	$('.input').keyup(function(e) {
		var con=$('.input').eq(0).val();
		if(con.trim()==''){
			$('.more').eq(0).css('display','block');
			$('#send').css('display','none');
		}else{
			$('.more').eq(0).css('display','none');
			$('#send').css('display','block');						
		}
		if(e.keyCode == 13) {
            //showMyTxt(con)
			sendMsgTxt();
			$('.more').eq(0).css('display','block');
			$('#send').css('display','none');
			$('.input').eq(0)[0].focus();
		}
	})
	
	//点击发送
	$('#send').click(function(){
		sendMsgTxt();
        //var con=$('.input').eq(0).val();
        //showMyTxt(con)
		$('.more').eq(0).css('display','block');
		$('#send').css('display','none');
        //$('.none').slideUp(200,text2bottom);
		$('.input').eq(0)[0].focus();
	})
	
	//暂无发送图片 文件 功能
	$('label').click(function(e){
		e.preventDefault();
		alert('该功能暂未开放');
	})
	
	//change发送图片
	$('#photo').change(function(){
		if($('#photo').val().trim() =='' ){
			return ;
		}else{
			var img=this.files[0];
			var imgName=img.name;
			var imgSize=this.files[0].size;
			imgSize=restSize(imgSize);
			var imgType=this.files[0].type;
			var formdata = new FormData();
			formdata.append("imgName", imgName);
			formdata.append("imgSize", imgSize);
			formdata.append("imgType", imgType);
			formdata.append("userId", userId);
				
			//发送到后台
			$.ajax({
				url:imgUrlSever,
				type:'post',
				data:formdata,
				contentType:false,
				processData:false,
				success:function(res){
					//成功返回一个url
                    //console.log('ok');
					var imgurl='static/img/right.jpg';
					var imgMsg={
						'userId':userId,
						'toId':toId,
						'msgType':'img',
						"oaid":oaId,
						'img':{
							'imgCon':imgurl,
						},
					};
					//显示图片
					showMyImg(imgurl);
					text2bottom();
					//发送到ws
					send(imgMsg);
					detailMessage(imgurl,'me','img',msgid);
				},
				error:function(){
					showMyImg(imgErrUrl);
					showTip(tipImgErr);
				}
			})
			//测试样式 不发送
            /*
            var imgurl='static/img/right.jpg';
			showMyImg(imgurl)
			detailMessage(imgurl,'me','img',msgid);
            */
		}
	})
})
