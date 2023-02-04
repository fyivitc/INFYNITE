/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);

//------------------------------------------------------------------------------------- 

// Poll start

jQuery('.mm-prev-btn').hide();

	var x;
	var count;
	var current;
	var percent;
	var z = [];

	init();
	getCurrentSlide();
	goToNext();
	goToPrev();
	getCount();
	// checkStatus();
	// buttonConfig();
	buildStatus();
	deliverStatus();
	submitData();
	goBack();

	function init() {
		
		jQuery('.mm-survey-container .mm-survey-page').each(function() {

			var item;
			var page;

			item = jQuery(this);
			page = item.data('page');

			item.addClass('mm-page-'+page);
			//item.html(page);

		});

	}

	function getCount() {

		count = jQuery('.mm-survey-page').length;
		return count;

	}

	function goToNext() {

		jQuery('.mm-next-btn').on('click', function() {
			goToSlide(x);
			getCount();
			current = x + 1;
			var g = current/count;
			buildProgress(g);
			var y = (count + 1);
			getButtons();
			jQuery('.mm-survey-page').removeClass('active');
			jQuery('.mm-page-'+current).addClass('active');
			getCurrentSlide();
			checkStatus();
			if( jQuery('.mm-page-'+count).hasClass('active') ){
				if( jQuery('.mm-page-'+count).hasClass('pass') ) {
					jQuery('.mm-finish-btn').addClass('active');
				}
				else {
					jQuery('.mm-page-'+count+' .mm-survery-content .mm-survey-item').on('click', function() {
						jQuery('.mm-finish-btn').addClass('active');
					});
				}
			}
			else {
				jQuery('.mm-finish-btn').removeClass('active');
				if( jQuery('.mm-page-'+current).hasClass('pass') ) {
					jQuery('.mm-survey-container').addClass('good');
					jQuery('.mm-survey').addClass('okay');
				}
				else {
					jQuery('.mm-survey-container').removeClass('good');
					jQuery('.mm-survey').removeClass('okay');
				}
			}
			buttonConfig();
		});

	}

	function goToPrev() {

		jQuery('.mm-prev-btn').on('click', function() {
			goToSlide(x);
			getCount();			
			current = (x - 1);
			var g = current/count;
			buildProgress(g);
			var y = count;
			getButtons();
			jQuery('.mm-survey-page').removeClass('active');
			jQuery('.mm-page-'+current).addClass('active');
			getCurrentSlide();
			checkStatus();
			jQuery('.mm-finish-btn').removeClass('active');
			if( jQuery('.mm-page-'+current).hasClass('pass') ) {
				jQuery('.mm-survey-container').addClass('good');
				jQuery('.mm-survey').addClass('okay');
			}
			else {
				jQuery('.mm-survey-container').removeClass('good');
				jQuery('.mm-survey').removeClass('okay');
			}
			buttonConfig();
		});

	}

	function buildProgress(g) {

		if(g > 1){
			g = g - 1;
		}
		else if (g === 0) {
			g = 1;
		}
		g = g * 100;
		jQuery('.mm-survey-progress-bar').css({ 'width' : g+'%' });

	}

	function goToSlide(x) {

		return x;

	}

	function getCurrentSlide() {

		jQuery('.mm-survey-page').each(function() {

			var item;

			item = jQuery(this);

			if( jQuery(item).hasClass('active') ) {
				x = item.data('page');
			}
			else {
				
			}

			return x;

		});

	}

	function getButtons() {

		if(current === 0) {
			current = y;
		}
		if(current === count) {
			jQuery('.mm-next-btn').hide();
		}
		else if(current === 1) {
			jQuery('.mm-prev-btn').hide();
		}
		else {
			jQuery('.mm-next-btn').show();
			jQuery('.mm-prev-btn').show();
		}

	}

	jQuery('.mm-survey-q li input').each(function() {

		var item;
		item = jQuery(this);

		jQuery(item).on('click', function() {
			if( jQuery('input:checked').length > 0 ) {
		    	// console.log(item.val());
		    	jQuery('label').parent().removeClass('active');
		    	item.closest( 'li' ).addClass('active');
			}
			else {
				//
			}
		});

	});

	percent = (x/count) * 100;
	jQuery('.mm-survey-progress-bar').css({ 'width' : percent+'%' });

	function checkStatus() {
		jQuery('.mm-survery-content .mm-survey-item').on('click', function() {
			var item;
			item = jQuery(this);
			item.closest('.mm-survey-page').addClass('pass');
		});
	}

	function buildStatus() {
		jQuery('.mm-survery-content .mm-survey-item').on('click', function() {
			var item;
			item = jQuery(this);
			item.addClass('bingo');
			item.closest('.mm-survey-page').addClass('pass');
			jQuery('.mm-survey-container').addClass('good');
		});
	}

	function deliverStatus() {
		jQuery('.mm-survey-item').on('click', function() {
			if( jQuery('.mm-survey-container').hasClass('good') ){
				jQuery('.mm-survey').addClass('okay');
			}
			else {
				jQuery('.mm-survey').removeClass('okay');	
			}
			buttonConfig();
		});
	}

	function lastPage() {
		if( jQuery('.mm-next-btn').hasClass('cool') ) {
			alert('cool');
		}
	}

	function buttonConfig() {
		if( jQuery('.mm-survey').hasClass('okay') ) {
			jQuery('.mm-next-btn button').prop('disabled', false);
		}
		else {
			jQuery('.mm-next-btn button').prop('disabled', true);
		}
	}

	// function submitData() {
	// 	jQuery('.mm-finish-btn').on('click', function() {
	// 		collectData();
	// 		jQuery('.mm-survey-bottom').slideUp();
	// 		jQuery('.mm-survey-results').slideDown();
	// 	});
	// }

	function collectData() {
		
		var map = {};
		var ax = ['0','red','mercedes','3.14','3'];
		var answer = '';
		var total = 0;
		var ttl = 0;
		var g;
		var c = 0;

		jQuery('.mm-survey-item input:checked').each(function(index, val) {
			var item;
			var data;
			var name;
			var n;

			item = jQuery(this);
			data = item.val();
			name = item.data('item');
			n = parseInt(data);
			total += n;

			map[name] = data;

		});

		// jQuery('.mm-survey-results-container .mm-survey-results-list').html('');

		// for (i = 1; i <= count; i++) {

		// 	var t = {};
		// 	var m = {};
		// 	answer += map[i] + '<br>';
			
		// 	if( map[i] === ax[i]) {
		// 		g = map[i];
		// 		p = 'correct';
		// 		c = 1;
		// 	}
		// 	else {
		// 		g = map[i];
		// 		p = 'incorrect';
		// 		c = 0;
		// 	}

			// jQuery('.mm-survey-results-list').append('<li class="mm-survey-results-item '+p+'"><span class="mm-item-number">'+i+'</span><span class="mm-item-info">'+g+' - '+p+'</span></li>');

		// 	m[i] = c;
		// 	ttl += m[i];

		// }

		
	}


	
// POll END


	//-----------------------------------------------------------------------
	 
	var options = {
		series: [44, 55],
		chart: {
		height: 350,
		type: 'radialBar',
		
		  
	  },
	  plotOptions: {
		radialBar: {
		  dataLabels: {
			name: {
			  fontSize: '22px',
			  
			  
			},
			value: {
			  fontSize: '16px',
			  
			},
			total: {
			  show: true,
			  label: 'Total',
			  formatter: function (w) {
				// By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
				return 249
			  }
			}
		  }
		}
	  },
	  labels: ['YES', 'NO'],
	  };

	  var chart = new ApexCharts(document.querySelector("#chart"), options);
	  chart.render();

	//   --------------------------------------------------------------------------------


	