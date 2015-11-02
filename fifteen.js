"use strict";
var spacea = '300px';
var spaceb = '300px';
var pieces;
window.onload = function(){
    var puzzle = document.getElementById('puzzlearea');
    pieces = puzzle.children;
    var placeTop = 0;
    var placeLeft = -100;
    for (var i=0; i<pieces.length; i++){
        pieces[i].className = 'puzzlepiece';
        if (placeLeft < 300){
            placeLeft = placeLeft + 100;
            pieces[i].style.left = placeLeft + 'px';
            pieces[i].style.top = placeTop + 'px';
        }
        else{
            placeTop = placeTop + 100;
            placeLeft = 0;
            pieces[i].style.top = placeTop + 'px';
            pieces[i].style.left = placeLeft + 'px';
        }
        pieces[i].style.backgroundPosition= '-' + pieces[i].style.left + ' ' + '-' + pieces[i].style.top;
        pieces[i].onmouseover = function(){
			if (checkCanMove(parseInt(this.innerHTML)))
			{
				this.style.border = "2px solid red";
				this.style.color = "#006600";
			}
		};
		
		pieces[i].onmouseout = function(){
			this.style.border = "2px solid black";
			this.style.color = "#000000";
		};

		pieces[i].onclick = function(){
			if (checkCanMove(parseInt(this.innerHTML)))
			{
				swap(this.innerHTML-1);
				if (checkFinish())
				{
					youWin();
				}
				return;
			}
		};
	}

	var shufflebutton = document.getElementById('shufflebutton');
	shufflebutton.onclick = function()
	{

		for (var i=0; i<250; i++)
		{
			var rand = parseInt(Math.random()* 100) %4;
			if (rand == 0)
			{
				var tmp = calcUp(spacea, spaceb);
				if ( tmp != -1)
				{
					swap(tmp);
				}
			}
			if (rand == 1)
			{
				var tmp = calcDown(spacea, spaceb);
				if ( tmp != -1) 
				{
					swap(tmp);
				}
			}

			if (rand == 2)
			{
				var tmp = calcLeft(spacea, spaceb);
				if ( tmp != -1)
				{
					swap(tmp);
				}
			}

			if (rand == 3)
			{
				var tmp = calcRight(spacea, spaceb);
				if (tmp != -1)
				{
					swap(tmp);
				}
			}
		}
	};
};

function checkCanMove(pos)
{
	if (calcLeft(spacea, spaceb) == (pos-1))
	{
		return true;
	}

	if (calcDown(spacea, spaceb) == (pos-1))
	{
		return true;
	}

	if (calcUp(spacea, spaceb) == (pos-1))
	{
		return true;
	}

	if (calcRight(spacea, spaceb) == (pos-1))
	{
		return true;
	}
}


function youWin()
{
	alert('Y O U  W O N !');
}

function checkFinish()
{
	var flag = true;
	for (var i = 0; i < pieces.length; i++) {
		var y = parseInt(pieces[i].style.top);
		var x = parseInt(pieces[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100)
		{
			flag = false;
			break;
		}
	}
	return flag;
}

function calcLeft(x, y)
{
	var xx = parseInt(x);
	var yy = parseInt(y);

	if (xx > 0)
	{
		for (var i = 0; i < pieces.length; i++) 
		{
			if (parseInt(pieces[i].style.left) + 100 == xx && parseInt(pieces[i].style.top) == yy)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}

function calcRight (x, y) {
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (xx < 300)
	{
		for (var i =0; i<pieces.length; i++){
			if (parseInt(pieces[i].style.left) - 100 == xx && parseInt(pieces[i].style.top) == yy) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function calcUp (x, y) {
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (yy > 0)
	{
		for (var i=0; i<pieces.length; i++)
		{
			if (parseInt(pieces[i].style.top) + 100 == yy && parseInt(pieces[i].style.left) == xx) 
			{
				return i;
			}
		} 
	}
	else 
	{
		return -1;
	}
}

function calcDown (x, y)
{
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (yy < 300)
	{
		for (var i=0; i<pieces.length; i++)
		{
			if (parseInt(pieces[i].style.top) - 100 == yy && parseInt(pieces[i].style.left) == xx) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function swap (pos) {
	var temp = pieces[pos].style.top;
	pieces[pos].style.top = spaceb;
	spaceb = temp;

	temp = pieces[pos].style.left;
	pieces[pos].style.left = spacea;
	spacea = temp;
}