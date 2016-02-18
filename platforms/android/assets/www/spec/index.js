(function() {
	$("#submitButton").click(function(){
		
		// Check if we are connected to Internet
	    if(! connectionOn){
	        popErrorMessage("Internet connection required to perform this action");
	        return;    
	    }
		
		// Check for a correct URL        $.trim($("#isiteurl").val())
	    var siteurl =  "http://localhost/moodle";
	    var username = $.trim($("#username").val());
	    var password = $.trim($("#password").val());
	    var mytoken;
	    
	    // Delete the last / if present
	    if(siteurl.charAt(siteurl.length-1) == '/'){
	        siteurl = siteurl.substring(0,siteurl.length-1);
	    }
	    
	    var stop = false;
	    var msg = "";
	    
	    if(siteurl.indexOf("http://localhost") == -1 && ! /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(siteurl)){                    
	        msg += "Bad URL<br/>";
	        stop = true;
	    }
	
		$.getJSON(siteurl+"/login/token.php",
	        {
	            username: username,
	            password: password,
	            service: "moodle_mobile_app"                       
	        }    
	        ,function(json){
	        	if(typeof(json.token) != 'undefined'){   
	                mytoken = json.token;
	                
	                var data = {};
	                var preSets = {
	                    wstoken: mytoken,
	                    siteurl: siteurl
	                }                    
	                moodleWSCall('moodle_webservice_get_siteinfo', data, addSite, preSets);
	                
	            }
	            else{                            
	                popErrorMessage("Problem connecting to the Moodle site");
	            }
		});
	}
})();