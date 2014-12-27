$.ajaxSetup({ scriptCharset: "utf-8", contentType: "application/x-www-form-urlencoded; charset=UTF-8" });
jQuery(document).ready(function($){
	function styleItemHorizontally(pClassSelector, pElementType, pCSSMapLabel,pCSSMapInput) {
		$(pClassSelector).parent().css(pCSSMapLabel);
     	$(pClassSelector).parent().parent().find(pElementType).css(pCSSMapInput);
 	}
    // examples:
    styleItemHorizontally('.hori1','input',{'width':'100px'},{'width':'300px'});
    styleItemHorizontally('.hori2','input',{'width':'100px'},{'width':'100px'});
    styleItemHorizontally('.hori3','input',{'width':'100px'},{'width':'50px'});
    styleItemHorizontally('.hori4','input',{'width':'100px'},{'width':'25px'});
    styleItemHorizontally('.hori5','input',{'width':'100px'},{'width':'0px'});
	styleItemHorizontally('.hori6','input',{'width':'100px'},{'width':'250px'});

	//this is OpenClinica specific
	var myOutputField = $("#myOutputicd9").parent().parent().find("input");
	myOutputField.attr("readonly",true);
	var myOutputFieldIcd9p = $("#myOutputicd9p").parent().parent().find("input");
	myOutputFieldIcd9p.attr("readonly",true);
	var outputId = '';
	 $( ".autoicd" ).autocomplete({
	    source: function(req, res){
	    	outputId = $(this.element).prop("id");
			var _url="http://127.0.0.1:1337/?autoicd=" + outputId + "&callback=?";
			console.log('req.term: ' + req.term + ": " + _url);
			$.ajax({url: _url,
					dataType: "jsonp",
					data:{
						q: encodeURI(req.term)
					},
					success: function(data){
						res(data);
					},
					error: function(xhr, status, err){
						console.log(status);
						console.log(err);
					}
			});
		},
	    minLength: 2,
		select: function(event, ui){
			if (ui.item){
				console.log('#myOutput' + outputId);
				$('#myOutput' + outputId).val(ui.item.label.split(' - ')[0]);
			}
		}
 	});
});