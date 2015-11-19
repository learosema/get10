R=Math.random,d=document,moves=0
// mini jquery ;) (equivalent to dev console's native $/$$ functions)
$ =function(x,c){return(c||d).querySelector(x)}
$$=function(x,c){return[].slice.call((c||d).querySelectorAll(x))}
$T=function $T(x,y){return $('.tile.x'+x+'.y'+(y<0?'h':y))} // get tile
lock=function(l){game.classList[l?'add':'remove']('lock')}

// create tile
function tile(x,y,v,t){
	t=document.createElement('div')
	t.setPos=function(x,y){t.pos={x:x,y:y};t.setAttribute('class','tile x'+x+' y'+(y<0?'h':y))}
	t.setVal=function(v){t.textContent=v;t.style.backgroundColor='hsl('+((v*50)%360)+',100%,50%)'}
	t.setVal(v);t.setPos(x,y)
	return t
}

// remove tile and execute callback on transition end
function removeTile(t,cb,e,h){
	t.classList.add('fade-out')
	setTimeout(function(){
		try{game.removeChild(t)}catch(e){}
		if(cb)cb()
	},100)
}

// get adjacent tiles with same numbers
function getAdjacentTiles(t,t0,t1,l,D,v,r,i){
	for(r=[],v=t.textContent,i=4,D="01211012";i--;){
		l=[D[i*2]-1,D[i*2+1]-1]
		t1=$T(t.pos.x+l[0],t.pos.y+l[1])
		if(t1&&t1!=t0&&t1.textContent==v&&!t1.classList.contains('sel'))
			t1.classList.add('sel'),r.push(t1),[].push.apply(r,getAdjacentTiles(t1,t0?t0:t))
	}
	return r
}

function interAction(t,a,m){
	if (game.classList.contains('lock')||
		t.classList.contains('sel'))return
	a=getAdjacentTiles(t),m=0
	if(a.length>0)moves++,lock(true),~function removeTiles(){
		if (a.length>0)return removeTile(a.pop(),removeTiles)
		if(!m)t.setVal(t.textContent-1);m++
		~function fall(r,f,x,y,t){
			for(f=0,y=8;y>=-1;y--)for(x=10;x--;)
				if((t=$T(x,y))&&!$T(x,y+1))t.setPos(x,y+1),f++	
			if(f>0)return setTimeout(function(){fall(r)},200)
			if(r>0){for(x=10;x--;)
				if(!$T(x,0)&&R()<.5)
					game.appendChild(tile(x,-1,7+(R()*3)|0))
					setTimeout(function(){fall(r-1)},200)}
			lock(false)
		}(1)
	}()
}

// init game
for(i=10;i--;)
	for(j=10;j--;)
		game.appendChild(tile(i,j,7+(R()*3)|0))

window.onclick=function(e){if(e.target.classList.contains('tile'))interAction(e.target)}

