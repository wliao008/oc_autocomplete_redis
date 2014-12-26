
		$(function(){
			$.ajaxSetup({ scriptCharset: "utf-8" ,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8" });
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