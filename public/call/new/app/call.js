function callMeMaybe(campaign,phone,zip) {
	var data = {
	campaignId: campaign,
	userPhone: phone,
	userLocation: zip,
	}
	console.log('Assembled call data.');
	console.log(data);
	$.get({
		data: data,
		url: 'https://advocacycommons.callpower.org/call/create',
		dataType: 'json',
		complete: function (res) {
			if (res.status == '200') {
				console.log('Got response 200 OK');
				targetHTML = res.responseJSON.script;
			} else {
				console.log('Got response ' + res.status + ' ' + res.statusText);
				targetHTML = 'Looks like there was an error with your call (' + res.status + ' ' + res.statusText + ').  Reload the page and give it another shot.'
			}
			$('div#form_teaser, div#form_full_desc').slideUp();
			$('div#script')
			  .html(targetHTML)
			  .slideDown();
			$('div#form_container').fadeTo(500,0.2);
			$('input').attr('disabled','true');
			
		}
	});
}