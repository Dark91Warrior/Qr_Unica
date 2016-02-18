(function() {
	$("#index").live('pageshow',function(){
		
		setupPage();
	    logInfo("Page show fired");
	    
		$("#password").keypress(function(e) {
	        var c = e.which ? e.which : e.keyCode;
	        if(c == 13) {
	            jQuery('#submitButton').focus().click();
	        }
	    });
		
		$("#submitButton").click(
			function(){
				
				// Controlla se il dispositivo è connesso a Internet
			    if(!connectionOn){
			        alert("Internet connection required to perform this action");
			        return;    
			    }

				// Assegno alle relative variabili i dati inseriti
			    var siteurl =  "http://localhost/moodle/";
			    var username = $.trim($("#username").val());
			    var password = $.trim($("#password").val());
			    var mytoken;

			    // Cancella l'ultimo / se presente
			    if(siteurl.charAt(siteurl.length-1) == '/'){
			        siteurl = siteurl.substring(0,siteurl.length-1);
			    }
			    
			    function addSite(site){
			    	localStorage.setItem('Unica', JSON.stringify(site));
			    	
			    	/*var sites = localStorage.getItem('sites');
		            var tokens = localStorage.getItem('tokens');
		            
		            if(sites && tokens){
		                sites = JSON.parse(sites);
		                tokens = JSON.parse(tokens);
		            }
		            else{
		                sites = new Array();
		                tokens = new Array();
		            }
		            
		            // Add the site to the array of sites
		            sites.push(site);
		            tokens.push(mytoken);
		            
		            localStorage.setItem('sites',JSON.stringify(sites));
		            localStorage.setItem('tokens',JSON.stringify(tokens));
		            localStorage.setItem('current_site',sites.length - 1);*/                                    
		            window.location.assign("codeReader.html");
			    }
			    
			    // Controllo se i dati coincidono con quelli di moodle
				$.getJSON(siteurl+"/login/token.php",
			        {
			            username: username,
			            password: password,
			            service: "moodle_mobile_app"
			        }
			        ,function(json){
			        	if(typeof(json.token) != 'undefined')
			        	{
			        		// Se i dati coincidono passiamo ad una nuova scheda
			                mytoken = json.token;
			                console.log(mytoken);
			                var data = {};
		                    var preSets = {
		                        wstoken: mytoken,
		                        siteurl: siteurl
		                    }  
			                moodleWSCall('moodle_webservice_get_siteinfo', data, addSite, preSets);
			            }
			            else
			            {
			            	
			            	if(username && password)
			            		alert("Username o Password errati.");
			            	else
			            		alert("Compilare tutti i campi.");
			            }
			        });
		});
	});
})();