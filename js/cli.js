function (){
	var form1=document.forms[0];
	window.alert(form1.element);
	for (i=0;i<=form1.element.length;i++) {
		if(form1.element[i].value=="easy"){
			return boomField(20,20,10);
		}
		else if(form1.element[i].value=="middle"){
			return boomField(30,20,50);
		}
		else (form1.element[i].value=="hard"){
			return boomField(40,20,100);
		}
	}
}