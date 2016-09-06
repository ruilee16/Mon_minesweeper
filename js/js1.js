
function boomField(colum,row,bombNum){
	this.colum=colum;
	this.row=row;
	this.bombNum=bombNum;
}
var arrTem=[];
//生成战场
boomField.prototype.generatField= function (){ 
	for(i=0;i<this.row;i++){		
		for(j=0;j<this.colum;j++){	
			if (j==this.colum-1){
				arrTem.push('<div class="aBlock" id="'+arrTem.length+'" onclick="javascript:cli(event,'+arrTem.length+')"></div></br>');
			}
			else {
				arrTem.push('<div class="aBlock" id="'+arrTem.length+'" onclick="javascript:cli(event,'+arrTem.length+')"></div>');
			}
		} 
	}//循环完毕，得到数组arrTem。
	setBoom(this.bombNum);//call setBoom to gengerate boom in the field
	return arrTem.join("");
}
//初始化战场
function start(){
	let a=getForm();
	boom=new boomField(a[0],a[1],a[2]);//隐式声明boom，其作用域为全局
	arrTem=[];
	document.getElementById('main').style.width=boom.colum*32+"px";
	document.getElementById('main').style.height=boom.row*32+"px";
	document.getElementById('main').innerHTML=boom.generatField();
}
//根据选择的游戏难度，给出雷阵参数
function getForm(){
	var x=document.getElementById("formRadio");
	for (i=0;i<=x.length;i++) {
		//window.alert(x[i].value);
		if ((x[i].checked)&& (x[i].value=="easy")){
			return [5,5,5];
		}
		else if ((x[i].checked)&& (x[i].value=="medium")){
			return [10,10,20];
		}
		else if ((x[i].checked)&& (x[i].value=="hard")) {
			return [20,10,80];
		} 
	}
}

//布雷函数
function setBoom(n){
	for(t=0;t<n;t++){
		var un=Math.round(Math.random()*(arrTem.length-1));
		arrTem[un].search("boom")==-1?arrTem[un]=arrTem[un].replace("aBlock","boom"):t--;		
	}
}

//截至目前，格子已经生成
//给main里的div添加onclick事件。左键为点开：z=-1，右键为插旗
function cli(a,id){
	if (a.button==1){
		window.alert("right click or left click please")
	}
	else if (a.button==0) {
		document.getElementById(id).className=="boom"?window.alert("game over"):openDiv(id);
	}
	else {
		putFlag();
	}
}
//开格子函数：

function openDiv(id){	
	let b=openDiv1(range(id));
	isNaN(b)?cf(id):writeNum(id,b);
	return b;
}

function writeNum(id,b){
	document.getElementById(id).innerHTML=b;
	document.getElementById(id).style.background="RGB(180,180,180)";
}

function cf(id){
	document.getElementById(id).style.background="RGB(180,180,180)";
	cf1(id-boom.colum-1,id);
	cf1(id-boom.colum,id);
	cf1(id-boom.colum+1,id);
	cf1(id+1,id);
	cf1(id+boom.colum+1,id);
	cf1(id+boom.colum,id);
	cf1(id+boom.colum-1,id);
	cf1(id-1,id);
}
function cf1(a,id){
	if (checkId(a,id)){
		var d=openDiv1(range(a));
		if (!(document.getElementById(a).style.background == "rgb(180, 180, 180)")){
			if(isNaN(d)){
				cf(a);
			}
			else {
				writeNum(a,d);
			}
		}
	}
	else {
		return ;
	}
}
function checkId(a,id){
	let arr=range(id);
	if(arr.indexOf(a)==-1){
		return false;
	}
	else {return true;}
}
/*function cf(id){
	document.getElementById(id).style.background="RGB(180,180,180)";
	for (t=0;t<range(id).length;t++){
		let d=openDiv1(range(range(id)[t]));	
		if (!(document.getElementById(range(id)[t]).style.background == "rgb(180, 180, 180)")){
			if(isNaN(d)){
				cf(range(id)[t]);
			}
			else {
				writeNum(range(id)[t],d);
			}
		}
	}
	return;
}*/
//计算i格周围的雷数
function openDiv1(arr){
	let b;
	for (i=0;i<arr.length;i++){
		if (!(arrTem[arr[i]].search("boom")==-1)){
		isNaN(b)?b=1:b+=1;
		}
	}
	return b;
}
//周边函数
function range(i){
	let n=boom.colum; 
	let m=boom.row;	
	//在左侧
	if ((i+1)%n==1) {
		if (i==0) {return [i+1,i+n+1,i+n];}
			else if (i==(n*m-n)) {return [i-n,i-n+1,i+1];}
			else {return [i-n,i-n+1,i+1,i+n+1,i+n];}
		}
	else if ((i+1)%n==0) {
		if (i==n-1) {return [i+n,i+n-1,i-1];}
		else if(i==(n*m-1)) {return [i-n-1,i-n,i-1];}
		else {return [i-n-1,i-n,i+n,i+n-1,i-1];}
	}
	else if (0<i&&i<(n-1)) {
		return [i+1,i+n+1,i+n,i+n-1,i-1];
	}
	else if ((n*m-n)<i&&i<(n*m-1)) {
		return [i-n-1,i-n,i-n+1,i+1,i-1];
	}
	else {
		return [i-n-1,i-n,i-n+1,i+1,i+n+1,i+n,i+n-1,i-1];
	}
}





