R=Math.random
// mini jquery ;) (available in the dev console, anyway)
$ =function(x,c){return[].slice.call((c||document).querySelector(x))}
$$=function(x,c){return[].slice.call((c||document).querySelectorAll(x))}
D=window.setTimeOut // delay

// create tile
function tile(x,y,i,t){
	t=document.createElement('div')
	t.setAttribute('class','tile x'+x+' y'+y+'')
	t.style.backgroundColor='hsl('+((i*127)%360)+',100%,70%)'
	t.textContent=i
	t.pos={x:x,y:y}
	return t
}

// get tile
function getTile(x,y){return $('.tile .x'+x+' .y'+y)}

// remove tile
function removeTile(t,cb){
	t.classList.add('fade-out')
	t.addEventListener('transitionend', function(){
		game.removeChild(t)
		if(cb)cb()
	})
}

// recursively remove tiles with same numbers
function recursiveRemoveTile(t,cb,x,y,v){
	v=t.textContent
	// WIP
}

function interAction(t){
	if (game.classList.contains('interaction'))return
	removeTile(t, function(){game.classList.remove('interaction')})
}

// init game
for(i=10;i--;)
	for(j=10;j--;)
		game.appendChild(tile(i,j,7+(R()*3)|0))

window.onclick=function(e){if(e.target.classList.contains('tile'))interAction(e.target)}
