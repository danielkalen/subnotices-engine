Subnotice = (markup, context, @direction, @delay)->
	@el$ = $(markup)
	@wrapper$ = @appendContainer(context)
	@noticesList = @wrapper$[0].noticesList ?= []

	@allInstances.push(@)
	@el$.data 'Subnotice', @
	@append()
	@attachEvents()
	return @


Subnotice::appendContainer = (context)->
	if $(".Subnotices.direction--#{@direction}", context).length
		$(".Subnotices.direction--#{@direction}", context)
	else
		$("<div class='Subnotices direction--#{@direction}'></div>").appendTo(context)



Subnotice::append = ()->
	@isActive = true
	
	@el$.appendTo @wrapper$
	setTimeout @reveal.bind(@), @delay or 50



Subnotice::reveal = ()->
	otherNotices = @noticesList.slice()
	otherNoticesHeights = otherNotices.map (notice)-> if notice.beingDestroyed then 0 else notice.el$[0].offsetHeight
	placementOffset = if not otherNoticesHeights.length then 0 else otherNoticesHeights.reduce (a=0,b=0)-> a+b
	negation = if @direction is 'top' then '-' else ''
	noticeHeight = @el$[0].offsetHeight

	startTransform = if @direction is 'top' then 0 else "#{noticeHeight}px"
	finishTransform = if @direction is 'top' then "#{noticeHeight}px" else 0

	@noticesList.push(@)
	@el$.addClass "index--#{@noticesList.indexOf(@)+1}"
		.addClass 'show'
		.css 		'y':startTransform, "margin-bottom":"#{negation}#{placementOffset}px"
		.transition 'y':finishTransform, 300




Subnotice::attachEvents = ()->
	@el$.children('.Subnotice-close').on subnotify.clickEvent, ()=> @destroy(0)



Subnotice::destroy = (time, duration=300)-> if @isActive and time isnt false
	@beingDestroyed = true
	
	setTimeout ()=>
		index = @noticesList.indexOf(@)
		noticesInFront = @noticesList.slice(index) # Including self
		noticeHeight = @el$[0].offsetHeight
		negation = if @direction is 'top' then '-' else '+'
		
		noticesInFront.concat(@).forEach (subnotice)->
			subnotice.el$.transition 'y':"#{negation}=#{noticeHeight}px", duration

		
		if @allInstances.includes(@) then @allInstances.splice @allInstances.indexOf(@),1
		
		setTimeout ()=>
			return unless @isActive
			@isActive = @beingDestroyed = false
			@noticesList.splice @noticesList.indexOf(@),1
			@el$.removeClass('show').remove()
		, duration+20
	, time




Subnotice::allInstances = []











