var dateDay=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
// var drawNo = "開彩期數"
// var drawDate = "日期"
const drawNo = "Draw"
const drawDate = "Date"

function h4Holder(e){
	e=document.createElement("h4")
	return e;
	}
function tdHolder(e){
	e=document.createElement("td")
	return e;
	}
	
function getDateDay(e){
	return dateDay[e.getDay()]
	}
function elementsToArray(elements){
	var newArray = []
	for(var j=0;j<elements.length;j++){
	newArray.push(elements[j])
	}
	return newArray;
}
function fillTd(obj,displayResult){
	obj.forEach(function(e,i){
	var resultTd = e.cells
		for(var j=0;j<resultTd.length;j++){
		resultTd[j].innerHTML=displayResult[j]
		}
	})
	
	}


function buildPmpDate(draw,date){
return 	"<dl><dt style='width:130px'><strong>"+drawNo+"&nbsp;</strong><big>"+draw[0]+"</big></dt><dt style='width:130px'><strong>"+drawDate+"&nbsp;</strong><big>"+draw[1]+"</big></dt></dl><dl><dt ><strong>&nbsp;&nbsp;</strong><big>"+draw[2]+"</big></dt><dt><strong>&nbsp;&nbsp;</strong><big>"+getDateDay(date)+"</big></dt></dl>"
}
function buildDate(draw,date){

return "<dt style='width:130px'><strong>" +drawNo + "&nbsp;</strong><big>" +draw[0] +"</big></dt><dt style='width:115px'><strong>" + drawDate + "&nbsp;</strong><big>" + draw[1] + "</big></dt><dt><strong></strong><big>"+ getDateDay(date) + "</big></dt>"

}
function buildJackpotDate(draw,date){

return "<dt style='width:110px'><strong>" +drawNo + "&nbsp;</strong><big>" +draw[0] +"</big></dt><dt style='width:110px'><strong>" + drawDate + "&nbsp;</strong><big>" + draw[1] + "</big></dt><dt><strong></strong><big>"+ getDateDay(date) + "</big></dt>"

}
function domBuildMagnum(draw,date,top3,sep,con){
	
	var dateContainer=document.getElementById("magnumDate")
	var top3Container=document.getElementById("magnumTop3")
	var sepContainer=document.getElementById("magnumSpe")
	var conContainer=document.getElementById("magnumCon")
	
	dateContainer.innerHTML=buildDate(draw,date)
	
	sep.forEach(function(e){
	var temp = new h4Holder()
	temp.innerHTML=e
	sepContainer.appendChild(temp)
	})
	
	con.forEach(function(e){
	var temp = new h4Holder()
	temp.innerHTML=e
	conContainer.appendChild(temp)
	})
	
	top3Container.innerHTML="<dt>"+top3[0]+"</dt><dt class='top3middle'>"+top3[1]+"</dt><dt>"+top3[2]+"</dt>"
}

function domBuildSg4d(draw,date,top3,sep,con){
	
	var dateContainer=document.getElementById("sg4dDate")
	var top3Container=document.getElementById("sg4dTop3")
	var sepContainer=document.getElementById("sg4dSpe")
	var conContainer=document.getElementById("sg4dCon")
	
	dateContainer.innerHTML=buildDate(draw,date)
	
	sep.forEach(function(e){
	var temp = new h4Holder()
	temp.innerHTML=e
	sepContainer.appendChild(temp)
	})
	
	con.forEach(function(e){
	var temp = new h4Holder()
	temp.innerHTML=e
	conContainer.appendChild(temp)
	})
		top3Container.innerHTML="<dt>"+top3[0]+"</dt><dt class='top3middle'>"+top3[1]+"</dt><dt>"+top3[2]+"</dt>"
}

function domBuildPmp(draw,date,top33d,top34d,sep,con){
	var top33dContainer=document.getElementById("pmp3dTop3")
	var top34dContainer=document.getElementById("pmp4dTop3")
	var sepContainer=document.getElementById("pmp4dSpe")
	var conContainer=document.getElementById("pmp4dCon")
	var dateContainer=document.getElementById("datePmp")

	dateContainer.innerHTML=buildPmpDate(draw,date)
	
	top33dContainer.innerHTML="<dt>"+top33d[0]+"</dt><dt class='top3middle'>"+top33d[1]+"</dt><dt>"+top33d[2]+"</dt>"
	
	top34dContainer.innerHTML="<dt>"+top34d[0]+"</dt><dt class='top3middle'>"+top34d[1]+"</dt><dt>"+top34d[2]+"</dt>"
	
	
	sep.forEach(function(e){
	var temp = new h4Holder()
	temp.innerHTML=e
	sepContainer.appendChild(temp)
	})
	
	con.forEach(function(e){
	var temp = new h4Holder()
	temp.innerHTML=e
	conContainer.appendChild(temp)
	})


}

function domBuildToto(draw,date,top3,sep,con,mega,superVar,jackpot,rm,toto5D,toto5D2nd,toto5D3rd,toto6D){
	
	var dateContainer=document.getElementById("toto4dDate")
	var dateJackpotContainer=document.getElementById("totoJackpotDate")
	var top3Container=document.getElementById("toto4dTop3")
	var sepContainer=document.getElementById("toto4dSpe")
	var conContainer=document.getElementById("toto4dCon")
	var megaContainer=document.getElementById("totoMegaResult")
	var superContainer=document.getElementById("totoSuperResult")
	var jackpotContainer=document.getElementById("totoJackpotResult")
	var result5dContainer=document.getElementsByName("result5dContainer")
	var result5d2ndContainer=document.getElementsByName("result5d2ndContainer")
	var result5d3rdContainer=document.getElementsByName("result5d3rdContainer")
	var result6dContainer=document.getElementsByName("result6dContainer")
	dateContainer.innerHTML=buildDate(draw,date)
	dateJackpotContainer.innerHTML=buildJackpotDate(draw,date)
	
	sep.forEach(function(e){
	var temp = new h4Holder()
	temp.innerHTML=e
	sepContainer.appendChild(temp)
	})
	
	con.forEach(function(e){
	var temp = new h4Holder()
	temp.innerHTML=e
	conContainer.appendChild(temp)
	})

	mega.forEach(function(e,i){
	var temp = new tdHolder()
	temp.innerHTML=e
	megaContainer.appendChild(temp)
	})
	
	superVar.forEach(function(e,i){
	var temp = new tdHolder()
	if(i==6){temp.setAttribute("class","additional")}
	temp.innerHTML=e
	superContainer.appendChild(temp)
	})
	
	jackpot.forEach(function(e,i){
	var temp = new tdHolder()
	if(i==6){temp.setAttribute("class","additional")}
	temp.innerHTML=e
	jackpotContainer.appendChild(temp)
	})
	
	
	for(var j=0;j<4;j++){
	var divContainer=document.getElementById("amount"+j)
	divContainer.innerHTML=rm[j]
	}
	// RM 20,000,000.00,RM 12,648,903.60,RM 10,337,407.42,RM 374,490.68,RM 1,086,365.15 ,RM 21,584.78
	top3Container.innerHTML="<dt>"+top3[0]+"</dt><dt class='top3middle'>"+top3[1]+"</dt><dt>"+top3[2]+"</dt>"
	
	//Manupilate 5D + 6D reuslt
	var result5DContainerArray= new elementsToArray(result5dContainer)
	var result5D2ndContainerArray= new elementsToArray(result5d2ndContainer)
	var result5D3rdContainerArray= new elementsToArray(result5d3rdContainer)
	var result6DContainerArray= new elementsToArray(result6dContainer)
	
	fillTd(result5DContainerArray,toto5D)
	fillTd(result5D2ndContainerArray,toto5D2nd)
	fillTd(result5D3rdContainerArray,toto5D3rd)
	fillTd(result6DContainerArray,toto6D)


}
