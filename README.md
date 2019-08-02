# Adventure Game

## WireFrame

![Wireframe image](./resources/AdventueGameWireFrame.png)


## Psuedocode 


create a game viewport.  
* create a HTML header to diplay score, reset button and game Title.  
* establish game viewport centered in the browser window with flexbox,  
* :Optional: have body background render scales gaussian blur version of the game.  
  
create the background.  
* have a background img object with a constant x scroll speed property.  
* :Optional: have parallax background with z offsets.  
  
create a character object.  
* character has x and y positions with jump(), attack(), and death collision detection() methods.  
* attack method will be either a melee or blaster option.  
  
create enemies class.  
* create enemies with x,y postitions with delete(), move() and maybe attack colision detection() methods.  
* delete enimies if attack sucessful or if ememy leaves viewport.  
  
create obstacles class.  
* obstacle objects will have x,y positions and x speed properties with delete() and move() methods.  
* delete obstacles if obstacle leaves viewport.  
  
create coins class.  
* coin objects will have x,y positions, and collision detection methods to collide with character.  
  
:Optional: laser beam class  
* laser beam object will have x,y positions and constant x speed properties with delete() and move() methods.  
  
:Optional: create air enemies class for later levels.  
* air enemies objects will have x,y properties and fire() methods.  


## User Stories 

* AAU I want to control the character's ability to jump by pressing the space bar. 

*AAU I want to be able to click a button to start a new game.

*AAU I want to be able to control the character to attack enemies with a button press. 

*AAU I want to have clear feedback about my score and if the game is over

