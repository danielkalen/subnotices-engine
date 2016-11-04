BrowserNotice = ({@title, @text})->
	return @ unless Notification?
	if Notification.permission is 'granted'
		@reveal()
	else
		Notification.requestPermission().then (state)=> @reveal() unless state isnt 'granted'

	return @


BrowserNotice::reveal = ()->
	@notice = new Notification(@title, {'body':@text})