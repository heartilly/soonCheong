// ==UserScript==
// @name           allLotory
// @namespace      Wj
// @description    Lotory spy Website
// @require	  	file:///C:/Temp/soonCheong/js/domConstruture.js
// @require	  	file:///C:/Temp/soonCheong/js/jquery-1.7.2.min.js
// @include        file:///C:/Temp/soonCheong/page.html
// @include        file:///C:/Temp/soonCheong/page33.html
//@ver 1.2
// ==/UserScript==

// v1.12Mangnum 4D layout change
// v1.1 Mangnum 4D layout change

////div[parent::td[contains(., 'to view your desired past results.')]]
const  debugVar=true;

const levelVar =1;
//const monthStr =["Jan","Feb","Mar","Apr","May","Jun","Jly","Aug","Spt","Oct","Nov","Dec"];
const monthStr =["01","02","03","04","05","06","07","08","09","10","11","12"];
const dateDayFull=["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"];

// ThrosHole Level 
// 1 = normal
// 2 = lenght
// 3 = var data
// 10 = Raw file Dom

var SITE_INFO ={
		pmp: {
			url:'http://www.pmp.com.my/english/1_3d/3D_main.asp',
			charset:'iso-8859-1',
			pmpDrawDateVari:3,
			pmpResultVari:26
		},
		sg4dlastest: {
			url:'ddf',
			charset:'iso-8859-1',
			sg4dLastestDateVari:1,
			sg4dResultTopVari:3,
			sg4dResultVari:20
		},
		sg4d: {
			url:'http://www.singaporepools.com.sg/Lottery?page=four_d',
			charset:'iso-8859-1'
		},
		magnum: {
			url:'http://www.live4d.com/live4d/4dlive1.htm',
			charset:'UTF-16',
			// Verificasion condition
			magnumDrawNoVari:10,
			magnumTop3Vari:3,
			magnumReusltVari:2
		},
		toto:{
			url:'http://www.sportstoto.com.my/g_past_results/main.asp',
			charset:'UTF-8',
		},
		totolastest: {
			url:'totourl',
			charset:'UTF-8',
			// Verificasion condition
			avari:81,
			bvari:20,
			jackvari:4
		}
	}

function Ajax(site,siteId,responeDiv){

// responeDiv.removeEventListener("mouseup",Ajax2,false)
// responeDiv.innerHTML="loadding Plaxe wait"
	var cSite = site
	debug(siteId,1,"Site Id");
	var mime = 'text/html; charset='+cSite.charset;
	
	GM_xmlhttpRequest({
		method:"GET", 
		url:cSite.url,
		overrideMimeType: mime, 
		onreadystatechange: function(raw){
		//GM_log(raw.status)
		
		// if (raw.status > 2) {responeDiv.innerHTML="time out...plase try again"
		// responeDiv.addEventListener('mouseup',Ajax2,false);
		// return;
		// }
	if (raw.readyState == 1){responeDiv.innerHTML="<span class='systemInfo'>loading. The request is being prepared</span>"}
	if (raw.readyState == 2){responeDiv.innerHTML="<span class='systemInfo'>Sending Request</span>"}
	if (raw.readyState == 3){responeDiv.innerHTML="<span class='systemInfo'>Waiting Respone</span>"}
	if (raw.readyState == 4){responeDiv.innerHTML="<span class='systemInfo'>Poluting</span>"}
	
	},
		onload:function(raw) {
		// if(responeDiv){
		// responeDiv.innerHTML="<br/>Done"
		// window.setTimeout(function(){responeDiv.parentNode.removeChild(responeDiv);}, 1500);	
		// }
		text = raw.responseText
		text = text.replace(/(<[^>]*?)on(?:(?:un)?load|(?:db)?click|mouse(?:down|up|over|out|move)|key(?:press|down|up)|abort|blur|change|error|focus|re(?:size|set)|select|submit)\s*?=\s*?["'][^"']*?["']/ig, "$1");
	    text = text.replace(/<\s*?(?:script|object)[^>]*?>[\s\S]*?<\s*?\/(?:script|object)\s*?>/ig, "");
		// var htmldoc = createHTMLDocumentByString(text);
		// var parser = new DOMParser();
        // xmlDoc = parser.parseFromString(xmlDoc,"application/xml");	
        // xmlDoc = parser.parseFromString(xmlDoc,"application/xhtml+xml");	
		switch (siteId){
		case "magnum":
			magnum(text,responeDiv);
			break;
		
		case "toto":
			toto(text,responeDiv);
			break;
			
		case "totolastest":
			totolastest(text,responeDiv);
			break;

		case "pmp":
			pmp(text,responeDiv);
			break;

		case "sg4d":
			sg4d(text,responeDiv);
			break;
			
		case "sg4dlastest":
			sg4dlastest(text,responeDiv);
			break;
			
		default:
			break;
			}
		},
		onerror:function(raw){
		responeDiv.innerHTML="error plase try agian"
		}
	})
	
	}

// sg4dlastest function
function sg4dlastest(raw,responeDiv){
	debug(raw,10,"Sg4D Raw File")
	// Convert to html object
	raw = createHTMLDocumentByString(raw);
	
	// Xpath Elements
	//var sg4dLastestDate = getElementsByXPath("//td[@class='normal10']",raw)
	//var sg4dResultTop = getElementsByXPath("//td[@class='resultssectiontext4Dtop3']",raw)
	//var sg4dResult = getElementsByXPath("//td[@class='resultssectiontext4D']",raw)
	var sg4dLastestDate = $('td.normal10',raw),
	 sg4dResultTop = $('td.resultssectiontext4Dtop3',raw),
	 sg4dResult = $('td.resultssectiontext4D',raw);
	
	
	// Get verify condition 
	var sg4dLastestDateVari = SITE_INFO.sg4dlastest.sg4dLastestDateVari;
	var sg4dResultTopVari = SITE_INFO.sg4dlastest.sg4dResultTopVari;
	var sg4dResultVari = SITE_INFO.sg4dlastest.sg4dResultVari;
	
	if(!sg4dLastestDate){
		failure(responeDiv);
		return;
	}
	
	debug(sg4dLastestDate.length,2,"sg4dLastestDate.length");
	debug(sg4dResultTop.length,2,"sg4dResultTop.length");
	debug(sg4dResult.length,2,"sg4dResult.length");
	
	if(sg4dLastestDate.length!=sg4dLastestDateVari|sg4dResultTop.length!=sg4dResultTopVari|sg4dResult.length!=sg4dResultVari){
		failure(responeDiv);
		debug("Failure",1,"Verification Sg4D")
		return;
	}else {	debug("!!!PASS!!!!",1,"Verification Sg4D")}

	const getDateRegexp=/(\d+)\s+(\w+)\s+(\d+)/ig;
	const sg4dRegexp=/dra.*?(\d*?)\s?<br.*\"\/>(.*)/ig;
	
	var dummyVar =sg4dLastestDate[0].innerHTML;
		 dummyVar=sg4dRegexp.exec(dummyVar);
		 sg4dDrawDate=getDateRegexp.exec(dummyVar[2]);
		 sg4dDrawDate[2]=stringToMonth(sg4dDrawDate[2]);
		 sg4dDisplayDate = sg4dDrawDate[1]+"/"+(sg4dDrawDate[2]+1)+"/"+sg4dDrawDate[3];
		 sg4dDrawDate[3]="20"+sg4dDrawDate[3];
		 sg4dDrawDate = new Date(sg4dDrawDate[3],sg4dDrawDate[2],sg4dDrawDate[1]);
		 sg4dDrawNo=[dummyVar[1],sg4dDisplayDate];
		 
		 var sg4dTop3 = [],
		 sg4dStarter =  [],
		 sg4dConsolation =  [];

		 sg4dResult.toArray().forEach(function(e,i){
			e=e.innerHTML.replace(/\s*/ig,"")
			if(i<10){
					sg4dStarter.push(e);
					return;
				} else if(i>=10){
					sg4dConsolation.push(e);
					return;
				}
			})
			
		sg4dResultTop.toArray().forEach(function(e,i){
			e=e.innerHTML.replace(/\s*/ig,"")
			sg4dTop3.push(e)
		})
		
		 debug(sg4dDrawNo,3,"sg4dDrawNo")
		 debug(sg4dDrawDate,3,"sg4dDrawDate")
		 debug(sg4dTop3,3,"sg4dTop3")
		 debug(sg4dStarter,3,"sg4dStarter")
		 debug(sg4dConsolation,3,"sg4dConsolation")
		 
		domBuildSg4d(sg4dDrawNo,sg4dDrawDate,sg4dTop3,sg4dStarter,sg4dConsolation)
		if(responeDiv){
		responeDiv.innerHTML="<span class='systemInfo done' >Done</span>"
		window.setTimeout(function(){removeButton(responeDiv)}, 1500);	
		}
}


// sg4D function
function sg4d(raw,responeDiv){

	var pageDomain = 'http://www.singaporepools.com.sg'
	// Convert to html object
	raw = createHTMLDocumentByString(raw);
	
	//var getLastest = getElementsByXPath("//option[position()=2]",raw)
	var getLastest = $('option',raw)[1];
	
	var	getLastestValue = getLastest.value
	SITE_INFO.sg4dlastest.url = pageDomain+getLastestValue
	
	Ajax(SITE_INFO.sg4dlastest,"sg4dlastest",responeDiv)

}


// PMP 1+3D function
function pmp(raw,responeDiv){
	debug(raw,10,"PMP Raw File")
	// Convert to html object
		raw = createHTMLDocumentByString(raw);

	// Xpath Elements
	var pmpDrawDate = $('td.result_base strong',raw);
	var pmpResult = $('td.resultFontA strong',raw);
	//var pmpDrawDate = getElementsByXPath("//strong[parent::td[@class='result_base']]",raw)
	//var pmpResult = getElementsByXPath("//strong[ancestor::td[@class='resultFontA']]",raw)
	
	// Get verify condition 
	var pmpDrawDateVari = SITE_INFO.pmp.pmpDrawDateVari
	var pmpResultVari = SITE_INFO.pmp.pmpResultVari
	
	if(!pmpDrawDate){
		failure(responeDiv);
		return;
	}
	debug(pmpDrawDate.length,2,"pmpDrawDate.length")
	debug(pmpResult.length,2,"pmpResult.length")
	
	if(pmpDrawDate.length!=pmpDrawDateVari|pmpResult.length!=pmpResultVari){
			failure(responeDiv);
			debug("Failure",1,"Verification PMP")
			return;
		}else {	debug("!!!PASS!!!!",1,"Verification PMP")}
	
	pmpDraw = new Array();
	pmp3D = new Array();
	pmp4DTop = new Array();
	pmp4DStarters = new Array();
	pmp4DConsolation = new Array();
	
	const getDateRegexp=/(\d+)\/(\d+)\/(\d+)/ig
	
	pmpDrawDate.toArray().forEach(function(e,i){
		pmpDraw.push(e.innerHTML)
	})
	
	pmpResult.toArray().forEach(function(e,i){
		// GM_log(i+" = " +e.innerHTML)
		e=e.innerHTML
		if(i<3){pmp3D.push(e)
			} else if(i<6){pmp4DTop.push(e)
			}else if(i<16){pmp4DStarters.push(e)
			}else if(i>=16){pmp4DConsolation.push(e)}
	})

	var DrawDate=getDateRegexp.exec(pmpDraw[0])
	
	pmpDrawDate = new Date(DrawDate[3],(DrawDate[2]-1),DrawDate[1])
	DisplayDate = DrawDate[1]+"/"+DrawDate[2]+"/"+(DrawDate[3]-2000);
	// totoDraw[1] = DisplayDate

	pmpDraw[2]=pmpDraw[2].replace(/(\w+)(?:[\s\S]*)/i,"$1")	
	pmpDraw = [pmpDraw[1],DisplayDate,pmpDraw[2]]
	
	 debug(pmpDraw,3,"pmpDraw")
	 debug(pmpDrawDate,3,"pmpDrawDate")
	 debug(pmp3D,3,"pmp3D")
	 debug(pmp4DTop,3,"pmp4DTop")
	 debug(pmp4DStarters,3,"pmp4DStarters")
	 debug(pmp4DConsolation,3,"pmp4DConsolation")
	 
	domBuildPmp(pmpDraw,pmpDrawDate,pmp3D,pmp4DTop,pmp4DStarters,pmp4DConsolation)
		if(responeDiv){
		responeDiv.innerHTML="<span class='systemInfo done' >Done</span>"
		window.setTimeout(function(){removeButton(responeDiv)}, 1500);	
		}
}

function failure(e,txt){
return e.innerHTML="<br /><span class='alert2'>Verification Failure</span><br/><span class='alert2'>"+txt+"</span><br /><img src='./images/dw.png' class='fleft' onmouseout='this.src='./images/dw.png'' onmouseover='this.src='./images/dw2.png''/><span class='insideHint'><br />Please try again</span>"
}
// MAGNUM 4D function
function magnum(raw,responeDiv){
	// Filltering unnessecery tag
	raw = raw.replace(/<\s?font[^>]*?>/ig,'')
	raw = raw.replace(/<\s?\/font\s?>/ig,'')
	
	debug(raw,10,"Magnum4D Raw File")
	var jQRawMagnum = $(raw),
	 magnum1st = jQRawMagnum.find("tr:contains('1st'):last td:last-child").text(),
	 magnum2nd = jQRawMagnum.find("tr:contains('2nd'):last td:last-child").text(),
	 magnum3rd = jQRawMagnum.find("tr:contains('3rd'):last td:last-child").text();
	//GM_log(magnum1st)

	// Convert to html object
		raw = createHTMLDocumentByString(raw);
		
	// Get verify condition 
	var magnumDrawNoVari = SITE_INFO.magnum.magnumDrawNoVari
	var magnumTop3Vari = SITE_INFO.magnum.magnumTop3Vari
	var magnumReusltVari = SITE_INFO.magnum.magnumReusltVari
	
	// Xpath Elements
	
	//var magnumDrawNo = getElementsByXPath("//b[parent::td[@width='50%']]",raw)
	var magnumDrawNo = jQRawMagnum.find("*:contains('Draw No'):last").text();
	var magnumDate = jQRawMagnum.find("tr:contains('Draw No'):last td:last").text();
	//var mangnumTop3 = getElementsByXPath("//tr[@height='25']/td[@colspan='2' and position()=last()]/b",raw)
	//var  magnumReuslt = getElementsByXPath("//td[@width='50%']",raw)
	//var  magnumReuslt = getElementsByXPath("//td[@width='50%' and @valign='top']",raw)
	var magnumSpecial = jQRawMagnum.find("table:contains('Special'):last tr:not(:first) td");
	var magnumCon = jQRawMagnum.find("table:contains('Consolation'):last tr:not(:first) td");
	if(!magnum3rd){
		failure(responeDiv,"magnum3rd Fail");
		return;
	}
	if(!magnumDrawNo){
		failure(responeDiv,"magnumDrawNo Fail");
		return;
	}
	//debug(mangnumTop3.length,2,"mangnumTop3.length")
	// debug(magnumDrawDate.length,2,"magnumDrawDate.length")
	if(magnumSpecial.length!=magnumDrawNoVari|magnumCon.length!=magnumDrawNoVari){
			debug("Failure",1,"Verification Magnum 4D")
			failure(responeDiv,"special or Con fail");
			return;
		}else {	debug("!!!PASS!!!!",1,"Verification Magnum 4D")}
		
	const magnumRegexp=/(?:dra[^\:]*?:\s)|\s*/ig
	const getDateRegexp=/(\d+)\/(\d+)\/(\d+)/ig
	
	//var magnumSpecial = getElementsByXPath("descendant::b",magnumReuslt[0])

	magnumDraw = new Array();
	magnumTop3 = new Array();
	//magnumStarters = jQuery.makeArray( magnumSpecial.text() );
	magnumStarters = new Array();
	magnumConsolation = new Array();
	

	magnumDrawNo = magnumDrawNo.replace(magnumRegexp,'');
	magnumDraw.push(magnumDrawNo,magnumDate)	


	magnumDate = getDateRegexp.exec(magnumDraw[1])
	magnumDrawDate = new Date(magnumDate[3],magnumDate[2]-1,magnumDate[1])
	DisplayDate = magnumDate[1]+"/"+magnumDate[2]+"/"+(magnumDate[3]-2000);
	magnumDraw[1]=DisplayDate
	// magnumDate = magnumDraw[1].match(getDateRegexp)
	mangnumTop3 = magnumTop3.push(magnum1st,magnum2nd,magnum3rd)
	//mangnumTop3.forEach(function(e,i){ magnumTop3.push(e.innerHTML) })	
			
	jQuery.each(magnumSpecial, function(i,val) {
      var val = $(val).text()
	  magnumStarters.push(val)
    });
	jQuery.each(magnumCon, function(i,val) {
      var val = $(val).text()
	  magnumConsolation.push(val)
    });
	
	//populate date
	var today = magnumDrawDate.getDate();
	if(today<10){today = "0"+today};
	var showDate= today+"-"+getDateMonth(magnumDrawDate)+"-"+magnumDrawDate.getFullYear();
			
	verticalText(showDate,getDateDayFull(magnumDrawDate));	

	debug(magnumDraw,3,"magnumDraw")
	 debug(magnumDrawDate,3,"magnumDrawDate")
	 debug(magnumTop3,3,"magnumTop3")
	 debug(magnumStarters,3,"magnumStarters")
	 debug(magnumConsolation,3,"magnumConsolation")
	 domBuildMagnum(magnumDraw,magnumDrawDate,magnumTop3,magnumStarters,magnumConsolation)
		if(responeDiv){
		responeDiv.innerHTML="<span class='systemInfo done' >Done</span>"
		window.setTimeout(function(){removeButton(responeDiv)}, 1500);	
		}
	 //verticalText(magnumDraw[1]);

	// if(responeDiv){responeDiv.parentNode.removeChild(responeDiv)}
}

//TOTOSPORT function
function toto(raw,responeDiv){

	var pageDomain = 'http://www.sportstoto.com.my/g_past_results/'
	// Convert to html object
	raw = createHTMLDocumentByString(raw);
	
	//var getLastest = getElementsByXPath("//a[ancestor::div[parent::td[contains(., 'to view your desired past results.')]]]",raw)
	//var	getLastestValue = getLastest[0].href
	var getLastest = $("b:contains('Date')",raw).closest('tr').next().find('a'),
	getLastestValue = getLastest[0].href;
	SITE_INFO.totolastest.url = pageDomain+getLastestValue
	
	Ajax(SITE_INFO.totolastest,"totolastest",responeDiv)

}

// TOTOLAtest function
function totolastest(raw,responeDiv){
	debug(raw,10,"TOTO Raw File")

	// Convert to html object
		raw = createHTMLDocumentByString(raw);

	// Get verify condition 
	var totoResultAViri = SITE_INFO.totolastest.avari,
	 totoResultBViri = SITE_INFO.totolastest.bvari,
	 totoJackPrizeViri = SITE_INFO.totolastest.jackvari;
	// Xpath Elements
	//var totoDataDD = getElementsByXPath("//span[@class='dataDD']",raw)
	//var totoResultA = getElementsByXPath("//span[@class='dataResultA']",raw)
	//var totoResultB = getElementsByXPath("//span[@class='dataResultB']",raw)
	//var totoJackPrize = getElementsByXPath("//span[@class='dataJackPrize']",raw)
	var totoDataDD = $("span.dataDD",raw),
	 totoResultA = $("span.dataResultA",raw),
	 totoResultB = $("span.dataResultB",raw),
	 totoJackPrize = $("span.dataJackPrize",raw);
	
	if(!totoDataDD){
		failure(responeDiv);
		return;
	}

	if(totoResultA.length!=totoResultAViri|totoResultB.length!=totoResultBViri|totoJackPrize.length!=totoJackPrizeViri){
			failure(responeDiv);	
			debug("Failure",1,"Verification TOTO SPORT");
			//return;
		}else {	debug("!!!PASS!!!!",1,"Verification TOTO SPORT")}
		
	debug(totoDataDD.length,2,"totoDataDD.length")
	debug(totoResultA.length,2,"totoResultA.length")
	debug(totoResultB.length,2,"totoResultB.length")
	debug(totoJackPrize.length,2,"totoJackPrize.length")
	
		
	const totoRegexp=/(?:(?:dra|Date)[^\.]*?(?:\.|\:)\s)|\s*/ig
	const getDateRegexp=/(\d+)\/(\d+)\/(\d+)/ig
	
	var totoDraw = [],
	toto4DTop3 = [],
	toto4DStarters = [],
	toto4DConsolation = [],
	totoMega = [],
	totoSuper = [],
	totoJackpot = [],
	totoRM = [],
	toto5D = [],
	toto5D2nd = [],
	toto5D3rd = [],
	toto6D = [];

	// Manipulate Elements
	totoDataDD.toArray().forEach(function(e,i){
		e=e.innerHTML.replace(totoRegexp,'')
		totoDraw.push(e)
		// GM_log(i+" = " +e)
	})
	totoDraw=[totoDraw[1],totoDraw[0]]
	
	var dummyVar =totoDraw[1]
		 
		 DrawDate=getDateRegexp.exec(dummyVar)
		 // sg4dDrawDate[2]=stringToMonth(sg4dDrawDate[2])

		 // sg4dDrawDate[3]="20"+sg4dDrawDate[3]
		 totoDrawDate = new Date(DrawDate[3],(DrawDate[2]-1),DrawDate[1])
		 DisplayDate = DrawDate[1]+"/"+DrawDate[2]+"/"+(DrawDate[3]-2000);
		totoDraw[1] = DisplayDate
	totoResultA.toArray().forEach(function(e,i){
	e=e.innerHTML.replace(/\s*/ig,"")
	debug(e,3,i + " = ")
		if(i<3){toto4DTop3.push(e)
		}else if(i<13){toto4DStarters.push(e)
		}else if(i<23){toto4DConsolation.push(e)
		}else if(i>40&i<46){toto5D.push(e)
		}else if(i>49&i<55){toto5D2nd.push(e)
		}else if(i>57&i<63){toto5D3rd.push(e)
		}else if(i>64&i<71){toto6D.push(e)}
		// GM_log(i+" = " +e)
	})
	
	totoResultB.toArray().forEach(function(e,i){
		e=e.innerHTML.replace(/\s*/ig,"")
		if(i<6){totoMega.push(e)
		}else if(i<12){totoSuper.push(e)	//&i!=12
		}else if(i>=12){totoJackpot.push(e)}	//&i!=20
	})
	
	totoJackPrize.toArray().forEach(function(e,i){
	e=e.innerHTML.match(/(RM[^<]*)/ig)
	
	if(i>1){
	totoRM.push(e)
	}
	// GM_log(i+" = " +e)
	})
	
	 debug(totoDrawDate,3,"totoDrawDate")
	 debug(totoDraw,3,"totoDraw")
	 debug(toto4DTop3,3,"toto4DTop3")
	 debug(toto4DStarters,3,"toto4DStarters")
	 debug(toto4DConsolation,3,"toto4DConsolation")
	 debug(toto5D,3,"toto5D")
	 debug(toto5D2nd,3,"toto5D2nd")
	 debug(toto5D3rd,3,"toto5D3rd")
	 debug(toto6D,3,"toto6D")
	 debug(totoMega,3,"totoMega")
	 debug(totoSuper,3,"totoSuper")
	 debug(totoJackpot,3,"totoJackpot")
	 debug(totoRM,3,"totoRM")
	 
	domBuildToto(totoDraw,totoDrawDate,toto4DTop3,toto4DStarters,toto4DConsolation,totoMega,totoSuper,totoJackpot,totoRM,toto5D,toto5D2nd,toto5D3rd,toto6D)	
		if(responeDiv){
		responeDiv.innerHTML="<span class='systemInfo done' >Done</span>"
		window.setTimeout(function(){removeButton(responeDiv)}, 1500);	
		}
}

function removeButton(e){
return e.parentNode.parentNode.removeChild(e.parentNode);
}
// Debuging Log
function debug(e,threshole,title){
	if(!debugVar){return}

	var caption = title!=null ? title+" = ":'';
	
	if(threshole<=levelVar){
			console.log(caption+e)
			return
			}
	}
function getDateDayFull(e){
	return dateDayFull[e.getDay()]
	}
function getDateMonth(e){
	return monthStr[e.getMonth()]
	}

function stringToMonth(e){
	switch(e){
		case "Jan":
		return 0;
		break;
		case "Feb":
		return 1;
		break;
		case "Mar":
		return 2;
		break;
		case "Apr":
		return 3;
		break;
		case "May":
		return 4;
		break;
		case "Jun":
		return 5;
		break;
		case "Jul":
		return 6;
		break;
		case "Aug":
		return 7;
		break;
		case "Spt":
		return 8;
		break;
		case "Oct":
		return 9;
		break;
		case "Nov":
		return 10;
		break;
		case "Dec":
		return 11;
		break;
		}
	}
function getElementsByXPath(xpath, node) {
    var node = node || document
    var doc = node.ownerDocument ? node.ownerDocument : node
    var nodesSnapshot = doc.evaluate(xpath, node, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    var data = []
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
    }
    return (data.length >= 1) ? data : null
}
function createHTMLDocumentByString(str) {
    var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '')
    var htmlDoc  = document.implementation.createDocument(null, 'html', null)
    var fragment = createDocumentFragmentByString(html)
    htmlDoc.documentElement.appendChild(htmlDoc.importNode(fragment, true))
    return htmlDoc
}
function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
}
function magnumAjax(){
Ajax(SITE_INFO.magnum,"magnum")
}

function Ajax2(e,k){
// GM_log(e.getAttribute("id"))
// this.innerHTML="Loadding plase wait"
var cond = this.getAttribute("id")
switch (cond){
	case "magnumAct":
	Ajax(SITE_INFO.magnum,"magnum",this)
	break;
	case "pmpAct":
	Ajax(SITE_INFO.pmp,"pmp",this)
	break;
	case "sg4dAct":
	Ajax(SITE_INFO.sg4d,"sg4d",this)
	break;
	case "totoAct":
	Ajax(SITE_INFO.toto,"toto",this)
	break;
}

}
function verticalText(drawDate,drawDay){
// var txtObj ='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><text x="-600" y="100" font-family="impact" font-style="italic" font-size="110" transform="rotate(-90)" text-rendering="optimizeSpeed" fill="#000000">'+drawDate+'</text></svg>';
// var svgObj ="<object class='obj' type='image/svg+xml' data='"+ txtObj +"'></object>";
svgObj = drawDate;
$("#printDate").html(svgObj);
$("#printDay").html(drawDay);
}		

	document.getElementById("magnumAct").addEventListener('click',Ajax2,false);
	document.getElementById("pmpAct").addEventListener('click',Ajax2,false);
	document.getElementById("sg4dAct").addEventListener('click',Ajax2,false);
	document.getElementById("totoAct").addEventListener('click',Ajax2,false);
	// document.getElementById("pmpAct").addEventListener('mouseup',Ajax2,false);
	// document.getElementById("pmpAct").addEventListener('mouseup',Ajax2,false);
// Ajax(SITE_INFO.toto,"toto")
// Ajax(SITE_INFO.magnum,"magnum")
// Ajax(SITE_INFO.sg4d,"sg4d")
// Ajax(SITE_INFO.pmp,"pmp")