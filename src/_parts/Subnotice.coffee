Subnotice = ({@type, @text, @time, @icon=Subnotice.icons[@type], @extraClassnames})->
	@animationSpeed = Subnotice.animationSpeed
	@direction = Subnotice.direction
	@els = {}
	@els.container = getSubnoticeContainer(@direction)
	@els.subnotice = $(markup.subnotice(@type, @extraClassnames)).data 'Subnotice', @
	@els.icon = $(markup.icon(@icon)).appendTo(@els.subnotice)
	@els.text = $(markup.text(@text)).appendTo(@els.subnotice)
	@els.close = $(markup.close(Subnotice.icons.close)).appendTo(@els.subnotice)
	@isActive = true

	@noticesList = @els.container[0].noticesList ?= []
	@applyStyles = applyStyles.bind(@)
	@removeStyles = removeStyles.bind(@)
	
	@appendToDOM()
	@attachEvents()
	Subnotice.instances.push(@)
	return @




Subnotice::appendToDOM = ()->
	@applyStyles(@els.container, Subnotice.style[@direction].container)
	@applyStyles(@els.subnotice, Subnotice.style[@direction].subnotice)
	@applyStyles(@els.icon, Subnotice.style[@direction].icon)
	@applyStyles(@els.text, Subnotice.style[@direction].text)
	@applyStyles(@els.close, Subnotice.style[@direction].close)

	@els.subnotice.appendTo(@els.container)




Subnotice::reveal = ()->
	otherNoticesHeights = @noticesList.slice().map (notice)-> if notice.beingDestroyed then 0 else notice.els.subnotice[0].offsetHeight
	@placementOffset = if not otherNoticesHeights.length then 0 else otherNoticesHeights.reduce (a=0,b=0)-> a+b

	@noticesList.push(@)
	@applyStyles(@els.subnotice, Subnotice.styleOpenState[@direction].subnotice, {zIndex: 100-(@noticesList.length)})

	if @time isnt false
		setTimeout (()=> @destroy()), @time



Subnotice::attachEvents = ()->
	@els.close.on Subnotice.clickEvent, ()=> @destroy()



Subnotice::destroy = (animationSpeed=@animationSpeed)-> if @isActive
	@beingDestroyed = true
	
	noticesInFront = @noticesList.slice(@noticesList.indexOf(@)) # Including self
	noticeHeight = @els.subnotice[0].offsetHeight
	noticeHeight *= -1 if @direction is 'top'
	
	noticesInFront.concat(@).forEach (subnotice)=>
		newTranslate = getCurrentTranslation(subnotice) + noticeHeight
		subnotice.applyStyles(subnotice.els.subnotice, getTranslateStyleObject("#{newTranslate}px"))

	
	if Subnotice.instances.includes(@) then Subnotice.instances.splice Subnotice.instances.indexOf(@),1
	
	setTimeout ()=>
		return if not @isActive
		@isActive = @beingDestroyed = false
				
		@noticesList.splice @noticesList.indexOf(@),1
		@els.subnotice.remove()
	, animationSpeed+20












