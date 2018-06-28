$(document).ready(function(){

	var process;
	var max_arrival_time;
	var max_run_time;
	var priority;
	var url_input;
	var total_time = [];
	var name = [];
	var length;

	$('#button1').click(function(){
		$('input[type="button"]').attr('disabled','disabled');
		$('.input_1').css("display","block");
		process = $('#process :selected').text();
	});
	
	$('#submit1').click(function(){
		
		$('.spin').css("display","block");
		max_arrival_time = $('#min_run').val();
		max_run_time = $('#max_run').val();
		priority = $('#priority').val();
		$('input[type="button"]').removeAttr('disabled');
		
		$('#min_run').val('');
		$('#max_run').val('');
		$('#priority').val('');
		
		url_input = "https://sri-project.herokuapp.com/webapi/handler/"+process+"/"+max_arrival_time+"/"+max_run_time+"/"+priority;

		$.getJSON(url_input, function(result){
			
			length = result.length;
			var i;
			
			for(i=0;i<length;i++)
			{
				total_time[i] = result[i].running_time;
				name[i] = result[i].algo_name;
			}
			
			chart();
		});
		
	});
	
	function chart()
	{
		var p = [];
		var i;
		
		for(i=0;i<length;i++)
			p[i] = {y : total_time[i], label : name[i]};
		
		
		var chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			theme: "light2", // "light1", "light2", "dark1", "dark2"
			title:{
				text: "Total Running time"
			},
			axisY: {
				title: "time(seconds) "
			},
			data: [{        
				type: "column",  
				showInLegend: true, 
				legendMarkerColor: "grey",
				dataPoints: p
			}]
		});
		
		chart.render();
		$('.spin').css("display","none");
	}
});