
App = function()
{
     	
    // this is where the WADE app is initialized
	this.init = function()
	{
	       
	      wade.app.hiscore =  100;
        // load a scene
		wade.loadScene('scene1.wsc', true, function()
        { 
       //wade.playAudio('Assets/Sound/Music/jungle_intro.ogg');
        });
        
        wade.app.loadmenu = function(){
            wade.loadScene('scene1.wsc', true, function() { });
            wade.app.onMouseUp = function(){};
            wade.app.onMouseMove =function(){};
       
        };
        wade.app.loadlevel	= function(){
             wade.loadScene('scene2.wsc', true, function()
                { 
            
                 wade.app.golden=0;
                 wade.app.score=0;
                 var shots = 18;
                 var ballc =  wade.getSceneObject("noballs");
                 var minbox = 2;
                 var metboxmin = 2;
                 var minmonkey = 4;
                 var minmetboxarea = 0;
                 var boxnum = Math.floor(Math.random() *3)  + minbox;
                 var monkeynum = Math.floor(Math.random() *4) + minmonkey;
                 var metboxnum = Math.floor(Math.random() * 3) + metboxmin;
                 var longboxnum = metboxnum - 2;
                 var startpos = 100;
                 var startpos2 = 500;
                 var special =  Math.floor(Math.random() * 100);
                 var metboxarea =  Math.floor(Math.random() * 100) +minmetboxarea;
                 var magicarea =  Math.floor(Math.random() *400 ) +minmetboxarea;
                 var end =true;
                 var totalenemy = monkeynum;
                 var magicrate = 60;
                 
                    ballc.shots=shots;
                    
            // the scene has been loaded,do something here
            if (special>magicrate){
                var magicmonkey = wade.getSceneObject("template_golden").clone();
                magicmonkey.setPosition(magicarea,200);
                wade.addSceneObject(magicmonkey,true);
            }
             for (var j=0; j<monkeynum; j++){
                var newmonkey = wade.getSceneObject("template_monkey").clone();
                
                newmonkey.setPosition(j*startpos,100);
                wade.addSceneObject(newmonkey,true);
            
            
            for(var k=0; k<boxnum; k++){
            
           var newblock = wade.getSceneObject("template_block").clone();
            special =  Math.floor(Math.random() * 100);
            if (special>90){
                
                 var longbox = wade.getSceneObject("template_longWood").clone();
            longbox.setPosition(k*startpos2, (metboxarea*-1));
            wade.addSceneObject(longbox,true);
            
                }
                else if (special>50){
            newblock.setPosition(j*startpos, 100);
            wade.addSceneObject(newblock,true);
            }
            else{
                newblock.setPosition(j*startpos, -300);
                 wade.addSceneObject(newblock,true);
            }
            special =  Math.floor(Math.random() * 100);
            }
            
            //spawn monkeys
           
            
            
            }
           
            for(var i=0; i<metboxnum; i++){
            
             var newmetal = wade.getSceneObject("template_metal").clone();
            newmetal.setPosition(i*startpos, (metboxarea*-1));
            wade.addSceneObject(newmetal,true);
            }
            
            
            var keeper = wade.getSceneObject("noballs");
            keeper.Totalenemy = totalenemy;
            
            //Music
            //wade.app.music =
           // wade.playAudio('Assets/Sound/Music/jungle.ogg');
            
           
            wade.app.onMouseMove = function(data)
            {  
                var shots =  wade.getSceneObject("noballs").shots;
                var arm = wade.getSceneObject("arm");
                var displacement = wade.vec2.sub(data.screenPosition, arm.getPosition());
                var angle = Math.atan2(displacement.y, displacement.x);
                arm.setRotation(angle);
            };
            
            
            var powerBar = wade.getSceneObject("powerbar").getSprite();
            
            wade.app.onMouseUp = function()
            { 
                if(shots>0 && end){
                    shots--;
                    
                
                
                 
                var arm = wade.getSceneObject("arm");
                var rotation = arm.getSprite().getRotation();
                var pos = wade.vec2.rotate({x:60, y:-0}, rotation);
                var vel = wade.vec2.normalize(pos);
                wade.vec2.addInPlace(pos, arm.getPosition());
                
                var ball = wade.getSceneObject("ball").clone();
                ball.setPosition(pos);
                wade.addSceneObject(ball, true);
                ballc.shots=shots;
               
                
                wade.vec2.scaleInPlace(vel, 2000*powerBar.value);
                setTimeout(function()
                {
                    ball.setVelocity(vel);
                    wade.removeSceneObject();
                }, 0);
                
                powerBar.value = 0;
                }
                else{
                if(end){
                    end=false;
                var board = wade.getSceneObject("scoreboard").clone();
                board.setPosition(0,0);
                wade.addSceneObject(board, true); 
                
                powerBar.value = 0;

                }
                }
                
            };
            
       
       
        });
        };
        
       
       
   
       
	    
	};
	




};
