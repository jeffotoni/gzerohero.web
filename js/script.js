
const URL_GET_HERO = 'https://zerohero.s3apis.com/';

$(document).ready(() => {
	$('.btn-get-hero').trigger('click');
});

$(document).on('click', '.btn-get-hero', () => {
	const elButton = $('.btn-get-hero');
	let searchHero = $('#search-hero').val();

	if (searchHero) {

		let url = URL_GET_HERO + searchHero;

		showLoaderButton(elButton, () => {

			$.get(url, (data, status) => {

				console.log("Data: ", data, "\nStatus: ", status);

				if (data && status == 'success') {
					$('.get-hero-json-container').show();
					$('#get-hero-json').html(JSON.stringify(data, null, 4));

					if (data.name !== null && data.name !== undefined) {
						$('#hero-name').html(data.name);
					}

					if (data.image !== null && data.image !== undefined) {
						if (data.image.url !== null && data.image.url !== undefined) {
							$('#hero-img').attr('src', data.image.url);
						}
					}

					if (data.biography !== null && data.biography !== undefined) {
						if (data.biography['full-name'] !== null && data.biography['full-name'] !== undefined) {
							$('#hero-description').html(data.biography['full-name']);
						}
					}

					if (data.powerstats !== null && data.powerstats !== undefined) {
					
						if (data.powerstats.intelligence !== null && data.powerstats.intelligence !== undefined) {
							$('#pb-intelligence').html(data.powerstats.intelligence);
							$('#pb-intelligence').css({ width: data.powerstats.intelligence + '%' });
						}
					
						if (data.powerstats.strength !== null && data.powerstats.strength !== undefined) {
							$('#pb-strength').html(data.powerstats.strength);
							$('#pb-strength').css({ width: data.powerstats.strength + '%' });
						}
					
						if (data.powerstats.speed !== null && data.powerstats.speed !== undefined) {
							$('#pb-speed').html(data.powerstats.speed);
							$('#pb-speed').css({ width: data.powerstats.speed + '%' });
						}
					
						if (data.powerstats.durability !== null && data.powerstats.durability !== undefined) {
							$('#pb-durability').html(data.powerstats.durability);
							$('#pb-durability').css({ width: data.powerstats.durability + '%' });
						}
					
						if (data.powerstats.power !== null && data.powerstats.power !== undefined) {
							$('#pb-power').html(data.powerstats.power);
							$('#pb-power').css({ width: data.powerstats.power + '%' });
						}
					
						if (data.powerstats.combat !== null && data.powerstats.combat !== undefined) {
							$('#pb-combat').html(data.powerstats.combat);
							$('#pb-combat').css({ width: data.powerstats.combat + '%' });
						}
					}

					// chamada do Prism para colocar o estilo de código no texto
					Prism.highlightElement($('#get-hero-json')[0]);
				} else {
					$('.get-hero-json-container').hide();
					$('#get-hero-json').empty();
				}
				
			})
			.fail(() => {
				
				$('#hero-name').html('Search for a hero above. Their stats will be shown here.');
				$('#hero-description').html('');

				$('#hero-img').attr('src', '');

				$('#pb-intelligence').html('');
				$('#pb-intelligence').css({ width: 0 });

				$('#pb-strength').html('');
				$('#pb-strength').css({ width: 0 });

				$('#pb-speed').html('');
				$('#pb-speed').css({ width: 0 });

				$('#pb-durability').html('');
				$('#pb-durability').css({ width: 0 });

				$('#pb-power').html('');
				$('#pb-power').css({ width: 0 });

				$('#pb-combat').html('');
				$('#pb-combat').css({ width: 0 });

				alert('Hero not found.');

			})
			.always(() => {
				hideLoaderButton(elButton);
			});

		});

	}
});


const showLoaderButton = (elButton, callback) => {
    $(elButton).attr('disabled', 'disabled');
	$(elButton).prop('disabled', true);

    $(elButton).blur().find('.text').fadeOut(100, function () {
        $(elButton).find('.loader').fadeIn(100, function () {
            setTimeout(function () {
                if (callback) {
                	callback();
                }
            }, 1000);
        });
    });
};

const hideLoaderButton = (elButton) => {
    $(elButton).find(".loader").fadeOut(100, function () {
    	$(elButton).removeAttr("disabled").find(".text").fadeIn(100);
    	$(elButton).prop('disabled', false);
    });
};