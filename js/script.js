
const URL_GET_HERO = 'https://zerohero.s3apis.com/';

$(document).on('click', '.btn-get-hero', () => {

	let searchHero = $('#search-hero').val();

	if (searchHero) {

		let url = URL_GET_HERO + searchHero;

		$.get(url, (data, status) => {

			console.log("Data: ", data, "\nStatus: ", status);

			if (data && status == 'success') {
				$('.get-hero-json-container').show();
				$('#get-hero-json').html(JSON.stringify(data, null, 4));

				// chamada do Prism para colocar o estilo de código no texto
				Prism.highlightElement($('#get-hero-json')[0]);
			} else {
				$('.get-hero-json-container').hide();
				$('#get-hero-json').empty();
			}
		});

	}
});