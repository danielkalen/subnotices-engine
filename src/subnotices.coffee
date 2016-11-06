do ($=jQuery)->	
	import '_parts/helpers.coffee'
	import '_parts/styles.coffee'
	import '_parts/markup.coffee'
	import '_parts/Subnotice.coffee'
	import '_parts/BrowserNotice.coffee'

	subnotify = ({type='info', title='', text='', time=Subnotice.time, delay=Subnotice.delay, extraClassnames, browserNotice})->
		subnotice = new Subnotice {type, text, time, extraClassnames}

		if browserNotice
			new BrowserNotice {title, text}

		setTimeout ()->
			subnotice.reveal()
		, delay

		return subnotice






		
	Subnotice.version = import '../.version.coffee'
	Subnotice.markup = markup
	Subnotice.style = style
	Subnotice.styleOpenState = styleOpenState
	Subnotice.instances = []
	Subnotice.direction = 'bottom'
	Subnotice.clickEvent = 'click'
	Subnotice.animationSpeed = 300
	Subnotice.time = 10000
	Subnotice.delay = 250
	Subnotice.context = document.body
	Subnotice.requiresDarkText =
		'info': true
	
	Subnotice.colorMapping = 
		'info': 'grey'
		'success': 'green'
		'error': 'red'
		'warning': 'yellow'
	
	Subnotice.colors =
		'light': '#ffffff'
		'dark': '#313131'
		# 'dark': '#181818'
		'green': '#72c322'
		'red': '#95190c'
		'yellow': '#e3b505'
		'grey': '#a2a3a5'
	
	Subnotice.icons =
		'info': ''
		'success': ''
		'error': ''
		'warning': ''
		'close': ''
	
	
	window.subnotify = subnotify
	window.Subnotice = Subnotice



