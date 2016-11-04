import '_parts/jquery.transit.js'

do ($=jQuery)->	
	###*
	 * Public function to create a subnotice
	 * @param 	{string}	type				info | success | error | warning
	 * @return 	{object}	subnotice			A subnotice object
	###
	subnotify = ({type='info', title='', text='', time=10000, delay=250, browserNotice=false, context=subnotify.context, direction=subnotify.direction, icons=subnotify.icons})->
		markup = "<div class='Subnotice Subnotice_#{type}' data-icon='#{icons[type]}'>
					<div class='Subnotice-text'>#{text}</div>
					<div class='Subnotice-close' data-icon='#{icons.close}'></div>
				 </div>"
		
		subnotice = new Subnotice(markup, context, direction, delay)
		subnotice.destroy(time)

		if browserNotice
			new BrowserNotice {title, text}

		return subnotice


	import '_parts/subnotices-Subnotice.coffee'
	import '_parts/subnotices-BrowserNotice.coffee'
	import '_parts/subnotices-defaults.coffee'

	Subnotice.version = import '../.version.coffee'
	window.subnotify = subnotify
	subnotify.Subnotice = Subnotice