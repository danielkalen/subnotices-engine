style = {}
styleOpenState = {}

style.bottom =
	container:
		position: 'fixed'
		zIndex: '10000'
		bottom: '0'
		left: '0'
		width: '100%'

	subnotice:
		position: 'absolute'
		bottom: 0
		width: '100%'
		padding: '13px 45px 10px'
		boxSizing: 'border-box'
		transform: getTranslateStyleObject('100%')
		backgroundColor: (notice)-> Subnotice.colors[ Subnotice.colorMapping[notice.type] ] or 'grey'
		color: (notice)-> if Subnotice.requiresDarkText[notice.type] then Subnotice.colors.dark else Subnotice.colors.light
		transition: (notice)-> "transform #{notice.animationSpeed/1000}s"


	text:
		fontSize: '13px'
		fontWeight: 500
		lineHeight: 1


	icon:
		position: 'absolute'
		top: '50%'
		left: '14px'
		width: '20px'
		height: '20px'
		transform: getTranslateStyleObject('-50%')
		borderRadius: '50%'
		fontSize: '11px'
		lineHeight: '20px'
		textAlign: 'center'
		backgroundColor: (notice)-> if Subnotice.requiresDarkText[notice.type] then Subnotice.colors.dark else Subnotice.colors.light
		color: (notice)-> Subnotice.colors[ Subnotice.colorMapping[notice.type] ] or 'grey'


	close:
		position: 'absolute'
		top: '50%'
		right: '10px'
		transform: getTranslateStyleObject('-50%')
		fontSize: '15px'
		lineHeight: 1
		cursor: 'pointer'




style.top = 
	container: $.extend {}, style.bottom.container,
		top: 0
		bottom: 'auto'
	
	subnotice: $.extend {}, style.bottom.subnotice,
		transform: getTranslateStyleObject('0%')
	
	text: $.extend {}, style.bottom.text
	icon: $.extend {}, style.bottom.icon
	close: $.extend {}, style.bottom.close




styleOpenState.bottom = 
	subnotice:
		marginBottom: (notice)-> "#{notice.placementOffset}px"
		transform: getTranslateStyleObject('0%')


styleOpenState.top = 
	subnotice:
		marginBottom: (notice)-> "-#{notice.placementOffset}px"
		transform: getTranslateStyleObject('100%')









