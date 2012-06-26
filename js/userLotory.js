function init(){
	$(".delMe").bind("click",function(){
	$(this).parent().parent().remove();
	})
}