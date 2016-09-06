//rewrite BoomField function
//p1: creat boomField object
//var w='<img src="img/02.gif"/>';
var boomArr=[];
function boomField(colum,row,bombNum){
	this.colum=colum;
	this.row=row;
	this.bombNum=bombNum;
}

var arrTem=[];
//p2:generate boom field function
function generatField(b){ //生成扫雷的图片+布雷
	//var temRes="<table>";

	for(i=0;i<b.row;i++){		
		for(j=0;j<b.colum;j++){	
			if (j==b.colum-1){
				arrTem.push('<div class="aBlock" id="'+arrTem.length+'" onclick="javascript:cli(event,this,'+arrTem.length+')"></div></br>');
			}
			else {
				arrTem.push('<div class="aBlock" id="'+arrTem.length+'" onclick="javascript:cli(event,this,'+arrTem.length+')"></div>');
			}
		} 
	}//循环完毕，得到数组arrTem。
	setBoom(b.bombNum);//call setBoom to gengerate boom in the field
	hintBoom(arrTem,b.bombNum);//布置参数

	return arrTem.join("");
}

//初始化战场
function start(){
	let a=getForm();
	boom=new boomField(a[0],a[1],a[2]);
	arrTem=[];
	boomArr=[];
	document.getElementById('main').style.width=boom.colum*23+"px";
	document.getElementById('main').style.height=boom.row*23+"px";
	document.getElementById ('main').innerHTML=generatField(boom);
}

//布雷函数
function setBoom(n){
	for(t=0;t<n;t++){
		var un=Math.ceil(Math.random()*(arrTem.length-1));//有个问题，可能会取到两个一样的Math.random
		if(arrTem[un].search(">h")==-1){
			arrTem[un]=arrTem[un].replace("</div>","h</div>");
			boomArr.push(un);
		}
		else{
			t--;
		}		
	}	
//	return arr;
}
//标记雷数
function hintBoom(bNum){
	let n=boom.colum; 
	let m=boom.row;
	var arrDuplicate=[];	
	var arrBoomTem=[];
	for (j=0;j<boomArr.length;j++){
		var x=boomArr[j];
		if ((x+1)%n==1){
			if (x==0){
				arrBoomTem=[x+1,x+n,x+n+1];
				writeBoomNum1(arrDuplicate,arrBoomTem);
			}
			else if (x==(n*m-n)){
				arrBoomTem=[x-n,x-n+1,x+1];
				writeBoomNum1(arrDuplicate,arrBoomTem);
			}
			else{
				arrBoomTem=[x-n,x-n+1,x+1,x+n,x+n+1]
				writeBoomNum1(arrDuplicate,arrBoomTem);
			}
		}
		else if ((x+1)%n==0){
			if (x==n-1) {
				arrBoomTem=[x-1,x+n-1,x+n];
				writeBoomNum1(arrDuplicate,arrBoomTem);
			}
			else if(x==(n*m-1)){
				arrBoomTem=[x-1,x-n-1,x-n];
				writeBoomNum1(arrDuplicate,arrBoomTem);
			}
			else {
				arrBoomTem=[x-1,x+n-1,x+n,x-n-1,x-n];
				writeBoomNum1(arrDuplicate,arrBoomTem);
			}
		}
		else if (0<x&&x<(n-1)){
			arrBoomTem=[x+1,x+n+1,x+n,x+n-1,x-1];
			writeBoomNum1(arrDuplicate,arrBoomTem);
		}

		else if ((n*m-n)<x&&x<(n*m-1)){
			arrBoomTem=[x+1,x-n+1,x-n,x-n-1,x-1];
			writeBoomNum1(arrDuplicate,arrBoomTem);
		}
		else {
			arrBoomTem=[x+1,x-n+1,x-n,x-n-1,x-1,x+n+1,x+n-1,x+n];
			writeBoomNum1(arrDuplicate,arrBoomTem);
		}
	}
	for (i=0;i<arrTem.length;i++){
		isNaN(arrDuplicate[i])?arrTem[i]=arrTem[i]:arrTem[i]=arrTem[i].replace("</div>",(arrDuplicate[i]+"</div>"));
	}
}

function writeBoomNum1(arrDuplicate,arr){	
	for (i=0;i<arr.length;i++){
		if (arrTem[arr[i]].search(">h<")==-1){
		isNaN(arrDuplicate[arr[i]])?arrDuplicate[arr[i]]=1:arrDuplicate[arr[i]]+=1;
		}
	}	
	return arrDuplicate;
}

//get element by ID
function getID(id){
	return document.getElementById
	document.getElementByClassName
	document.getElementByTagName
}
//给main里的div添加onclick事件。左键为点开：z=-1，右键为插旗
function cli(a,id,i){
	if (a.button==1){
		window.alert("right click or left click please")
	}
	else {
		a.button==2?putFlag():openDiv(a,id,i);//判断左右键
	}
}

//点开函数
function openDiv(a,id,i){
	if (id.innerHTML.search("h")==-1){
		
		document.getElementById(i).style.color = "red";
		document.getElementById(i).style.backgroundColor ="RGB(180,180,180)";
	}
	else{
		window.alert(boom.row+"game over");
		document.getElementById("gOver").style.width=boom.row*22+"px";
		document.getElementById("gOver").style.height=boom.row*22+"px";
		document.getElementById("gOver").style.zIndex=1;
		document.getElementById("gOver").innerHTML="game over";
	}
}
//插旗函数
function putFlag(){
	window.alert("add Flag");
}
//如何禁止右键默认操作的同时插旗？
function getForm(){
	var x=document.getElementById("formRadio");
	//let a=[];
	for (i=0;i<=x.length;i++) {
		if(x[i].checked){
			if(x[i].value=="easy"){
				return [20,20,10];				
			}
			else if(x[i].value=="medium"){
				return [30,20,40];
			}
			else {
				return [40,20,90];
			}
		}
	}
}