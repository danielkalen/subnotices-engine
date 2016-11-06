markup = 
	container: (direction)->
		"<div class='Subnotices direction---#{direction}'></div>"

	subnotice: (type, extraClassnames='')->
		"<div class='Subnotice __#{type} #{extraClassnames}'></div>"
	
	icon: (icon='')->
		"<div class='Subnotice-icon'><div>#{icon}</div></div>"
	
	text: (text)->
		"<div class='Subnotice-text'><div>#{text}</div></div>"
	
	close: (icon='')->
		"<div class='Subnotice-close'><div>#{icon}</div></div>"