applyStyles = (el, styleObject, additional)->
	styleObject = $.extend {}, styleObject, additional if additional
	target = (el[0] or el)
	
	for key,value of styleObject
		switch typeof value
			when 'object'
				@applyStyles(target, value)

			when 'function'
				returnedValue = value(@)
				if typeof returnedValue is 'object'
					@applyStyles(target, returnedValue)
				else
					target.style[key] = returnedValue
			
			else
				target.style[key] = value

	return el


removeStyles = (el, styleObject, stylesToReinstate)->
	stylesToRemove = new ()-> @[key]='' for key of styleObject; @

	@applyStyles(el, stylesToRemove, stylesToReinstate)


getSubnoticeContainer = (direction)->
	existingContainer = $(".Subnotices.direction---#{direction}", Subnotice.context)
	
	if existingContainer.length
		return existingContainer
	else
		container = $(markup.container direction).appendTo(Subnotice.context)
		applyStyles(container, Subnotice.style[direction].container)
		
		return container
	

getTranslateStyleObject = (value)->
	webkitTransform: "translateY(#{value})"
	mozTransform: "translateY(#{value})"
	msTransform: "translateY(#{value})"
	oTransform: "translateY(#{value})"
	transform: "translateY(#{value})"



regExMatrixValues = /matrix3?d?\((.+)\)/
regExCommaList = /,\s*/
getCurrentTranslation = (subnotice)->
	computedStyle = window.getComputedStyle(subnotice.els.subnotice[0])
	matrix = computedStyle.transform or computedStyle.webkitTransform or computedStyle.mozTransform
	
	if matrix?.length and matrix isnt 'none'
		values = matrix.match(regExMatrixValues)[1]
		translateY = values.split(regExCommaList).slice(-1)[0]
	else
		translateY = 0
	
	return parseFloat(translateY)








