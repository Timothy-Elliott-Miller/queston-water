

var mapWaterStone = [];
var scene;
var graphics;
var graphics_water_block;
var Phaser;
var game;
var print_text = false;
var water_body_array = [];
var water_body_array_clear_count =0;
var water_drop_array = [];
var mapWaterStone_text_objects = [];
var tap1_on = false;
var rain_toggle = false;
var show_walls = false;
var mouseSelection = "rock";
var mouseSelectArray = [];
var mouseSelectedSquare;
var mouseDown = false;

var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
  //  backgroundColor: '#efefef',
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: true,

        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

game = new Phaser.Game(config);


function preload ()
{
    this.load.image('water_drop', 'assets/images/water_three.png');
}



function create ()
{
    "use strict";

    scene = this;
    this.add.text(0, 0, "queston.io - pin: ", { font: '18px Arial', fill: '#00ff00' });
    draw_graphics(this);
    setup();
}


function setup(){

  mapWaterStone_create();
  sim_add_boundaries();
  level_0(mapWaterStone);
  sim_render_maps();
  sim_create_buttons();

  if(auto_turn == true){
    scene.time.addEvent({ delay:150, callback: turn, callbackScope: scene, loop: true });
  }

  if(auto_turn == true){
    scene.time.addEvent({ delay:100, callback: rain_flow, callbackScope: this, loop: true });
  }

  if(auto_turn == true){
    scene.time.addEvent({ delay:350, callback: water_drops_update, callbackScope: this, loop: true });
  }



 // create a blitter that can blit bobs of water blocks on the screen
  scene.water_blitter = scene.add.blitter(0,0,'water_block_image').setAlpha(.6);
  scene.water_blitter.setDepth(1);

  scene.input.on('pointerdown', function(pointer){
    var sqr_coord = get_square_coords(pointer.x, pointer.y);


    // save the lowest 5 rows for the GUI
    if(sqr_coord[1]<ROWS-4){
      //mouseSelectArray.push(sqr_coord);
      mouseSelectedSquare = sqr_coord;
      mouseDown = true;
      mouseClickSquare(sqr_coord);
      // toggle_rock(sqr_coord);
    }
  });

  scene.input.on('pointerup', function(pointer){
    mouseDown = false;
  })

}



function tap1_turn(){
  tap1_on = !tap1_on;
}

function toggle_rain(){
  rain_toggle = !rain_toggle;
}

function mouseClickSquare(s_coord){

  if(isInsideGrid(s_coord)){
        // if the square contains water, remove it from the water body
    var col= s_coord[0];
    var row = s_coord[1];
    // var sqr_val = mapWaterStone[col][row];
    removeBlock(col,row);
    addBlock(col, row, mouseSelection)
    }
  }

// erase block function that removes all water, stone, things from the maps

function removeBlock(col, row)
{
  // remove all water and stone
  var water_stone_val = mapWaterStone[col][row];
  // if there is either water or stone
  if (water_stone_val !=0)
  {
    // remove the stone
    if(water_stone_val == -1){
      // // destroy the block sprite
       scene.wall_blocks[col][row].destroy();
       scene.wall_blocks[col][row]= 0;
      }
  }
  // if block is water remove
  if(water_stone_val>0){
    var wb = water_body_array[water_stone_val - 1];
    if (wb)
    {
      wb.remove_water_from_square([col,row]);
    }
  }
     mapWaterStone[col][row] = 0;


}

function addBlock(col,row, type)
{
  var p_coords = get_pixel_coords(col, row);
  if (type == "rock")
  {
    var wall_block = scene.matter.add.image(p_coords[0], p_coords[1],'square_image').setStatic(true);
    scene.wall_blocks[col][row]= wall_block;
    mapWaterStone[col][row] = -1;
  }
}


function mouseSelectRock(){
  mouseSelection = 'rock';

}

function mouseSelectErase(){
  mouseSelection = 'erase';

}

function clear_walls(){
  for (var col = 0; col<COLS; col++){

    for (var row = 0; row<ROWS; row++){
      if(scene.wall_blocks[col][row] !=0){
        scene.wall_blocks[col][row].destroy();
      }
      scene.wall_blocks[col][row]=0;
      mapWaterStone[col][row] = 0;
    }
  }
}


function rain_flow(){
  if(rain_toggle){
    for (var i = 0;i<3; i++){
      var rand_x = Math.round((Math.random())*WIDTH);

      // var rand_x =195;

      water_drop_create([rand_x, 10]);
    }

        // water_drop_create([100, 10]);

  }
}

function tap_flow(){
  if (tap1_on){
    // water_drop_create([50,20])
    //water_drop_create([55,20])
    // water_drop_create([50,20])
    // water_drop_create([55,20])
    // water_block_create([8,1]);
    // water_block_create([14,0]);
  }
}

function toggle_numbers(){
  scene.water_blitter.clear();
  print_text = !print_text;
  if(!print_text){
    for(var i = 0; i<mapWaterStone_text_objects.length; i++){
      mapWaterStone_text_objects[i].destroy();
    }
  }

}

function test_water(){
 "use strict";

  // for (var col = 0; col <11; col++){
  //   for(var row = 0; row<14; row++){
  //     water_block_create([col, row]);
  // //    water_block_create([col, 0]);
  //   //  water_block_create([col, 13]);
  //   }
  // // }
  // for (var col = 12; col <COLS-3; col++){
  //   for(var row = 4; row<11; row++){
  //     water_block_create([col, row]);
  // //    water_block_create([col, 0]);
  //   //  water_block_create([col, 13]);
  //   }
  // }

  // for (var col = 8; col <14; col++){
  //   for(var row = ROWS-5; row<ROWS; row++){
  //     water_block_create([col, row]);
  // //    water_block_create([col, 0]);
  //   //  water_block_create([col, 13]);
  //   }
  // }
    // water_block_create([0, 6]);
    // water_block_create([0, 4]);
    // water_block_create([0, 5]);

}



function turn(){
      "use strict";
  water_bodies_update();
  mapWaterStone_print();
}




//======================== water drop functions ========================//


// use this function to check if the water drop is in a water body
function water_drops_update(){
  for (var i = 0; i < water_drop_array.length; i++){

    var drop = water_drop_array[i];
    var squareCoords = get_square_coords(drop.x, drop.y);
    if (squareCoords){
      var square_val = mapWaterStone[squareCoords[0]][squareCoords[1]];
      if (square_val>0){

       // water_body_add_water(square_val);
        var wb = water_body_array[square_val-1];
        wb.add_drop_count++;
        // remove the drop from the array
        water_drop_array.splice(i,1);
        // destroy the drop sprite
        drop.destroy();
      }
      else if(square_val==-1){
        water_drop_array.splice(i,1);
        // destroy the drop sprite
        drop.destroy();
      }
      // else check if the drop is resting and try to create a block there if land below
      else{
        var xVel = drop.body.velocity.x;
        var yVel = drop.body.velocity.y;

        // if sleeping then create a new water block
        if(xVel <= .05 && yVel <= .05){

          water_block_create(squareCoords);
          water_drop_array.splice(i,1);
          // destroy the drop sprite
          drop.destroy();
        }

      }
    }

  }
}

function water_drop_create(coords){

      "use strict";

  // only create water if there isn't stone at that coord
  let sqr_coord = get_square_coords(coords[0], coords[1]);

  if(isInsideGrid(sqr_coord)){
    if (mapWaterStone[sqr_coord[0]][sqr_coord[1]] != -1){


  //   // create a new ball with the image 'empty_ball_image'
      var drop = scene.matter.add.image(coords[0],coords[1], 'water_drop', null,{ shape: { type: 'polygon', radius: DROP_SIZE/2 }, ignorePointer: true });

      drop.setCircle;
      drop.setFriction(.1);
      drop.setFrictionAir(0)
      //drop.setDensity(.00000001);
      drop.setBounce(.3);

      // drop.setBlendMode("SCREEN");
      // drop.setBlendMode('ADD');
      // drop.setSleepEvents(true, false);


    //  var x_vel = (1 - (Math.round(Math.random())*2))
     // var y_vel = (1 - (Math.round(Math.random())*2))
     // drop.setVelocityX(x_vel);
    //  drop.setVelocityY(y_vel);
      //====TODO re-write so that water drop sleep events are seperate,
      // this will allow other objects to sleep
      // also fix it so that drops don't sleep in the sky
      // drop.setSleepEvents(true,false);
      // drop.setSleepThreshold(30);
      drop.alpha = .3;
      drop.setDepth(0);
      drop.name = "drop";

      // === TODO: add a stone collision group so drops only hit stone

      water_drop_array.push(drop);
    }
    else{

    }
  }
}

// //+++++++++++++++ water body functions take the water_body as argument +++++++++++++++++++//
function water_bodies_update(){
      "use strict";
  // for each water body
  water_bodies_remove_empties();
  for(var i=0; i< water_body_array.length; i++){

    var wb = water_body_array[i];



    if (wb !=0 && wb.water.length>0){

        wb.sort_water();
        water_body_update_exits(wb);

        // add the extra water from drops
      //  water_body_add_drops_to_exits(wb);
        water_body_add_drops_to_exits_above_water(wb);
        water_body_flow_to_exits(wb);
      //  water_body_remove_water_over_holes(wb);
    }
  }
  //===TODO uncomment this!
  water_bodies_refresh();
}

function water_bodies_remove_empties(){
  for(var i=0; i< water_body_array.length; i++){

      var wb = water_body_array[i];

      if (wb !=0){
        if (wb.water.length==0){
          water_body_array[wb.id-1] =0;

        }
      }
    }
}

function water_bodies_refresh(){
    for(var i=0; i< water_body_array.length; i++){

      var wb = water_body_array[i];

      if (wb !=0){
        if (wb.refresh()==true){
      //   // time to refresh water body

        water_body_refresh(wb);
        }
      }
    }
}


// if more drops are added than exits available, leave extra drops for next time

function water_body_add_drops_to_exits_above_water(wb){

         var exit_list = wb.exitsAboveWater;

        //for each exit, try to take the highest water block and move it there
        for(var exit_index = 0; exit_index < exit_list.length; exit_index++){
          let e_col = exit_list[exit_index][0];
          let e_row = exit_list[exit_index][1];
          // check if the exit is clear on the mapWaterStone


          if(mapWaterStone[e_col][e_row]==0){

            // try to move the highest block from the water body into the exit



              // only move if we have drops left
               if (wb.add_drop_count>0){

                // move water on main mapWaterStone
                // mapWaterStone[e_col][e_row] = wb.id;
                var created = water_block_create([e_col,e_row]);
                  if(created){
                   wb.add_drop_count--;
                  }
                }
          }
        }
}
function water_body_flow_to_exits(wb){

         var exit_list = wb.exits;

        //for each exit, try to take the highest water block and move it there
        for(var exit_index = 0; exit_index < exit_list.length; exit_index++){
          let e_col = exit_list[exit_index][0];
          let e_row = exit_list[exit_index][1];

          // check if the exit is clear on the mapWaterStone
          if(mapWaterStone[e_col][e_row]==0){

            // try to move the highest block from the water body into the exit
            let h_water = wb.highest_water();

            // only continue if the high water also exists on the main mapWaterStone
            if (mapWaterStone[h_water[0]][h_water[1]] == wb.id){
              // only move if the exit is lower than the high_water
               if (h_water[1] <  e_row){

                // move water on main mapWaterStone
                // mapWaterStone[e_col][e_row] = wb.id;

                // check if the exit will have water or land below it
                if(mapWaterStone[e_col][e_row+1]==0){

                  var p_coords = get_pixel_coords(e_col,e_row);

                  var newDrop = water_drop_create([p_coords[0],p_coords[1]]);
                  water_body_remove_highest_block(wb);


                }
                else{

                  water_body_remove_highest_block(wb);
                  var created = water_block_create([e_col,e_row]);
                  // if(created){

                    // water_body_remove_highest_block(water_body_array[created[1]-1]);

                  // }
                }
              }
            }
          }

          // // if the water body is empty then stop
          // if (wb.highest_water()==false)
          // {

          //   break;
          // }
        }
}

function water_body_refresh(wb){

  // refresh water bodies

          // get the water array

          var water_array = wb.water;

          // destroy the water body
          water_body_array[wb.id-1] =0;
          // for each block in water_array destroy it on the mapWaterStone
          for (var j = 0; j< water_array.length; j++){


            mapWaterStone[water_array[j][0]][water_array[j][1]] =0;
          }

          // for each block in water_array create it again

          // create all the water
          for (var k = 0; k< water_array.length; k++){
            water_block_create(water_array[k]);
          }
}
function water_body_create(block_coords){
      "use strict";

  //create a new water body with the next available id from the water_body_array;

  // check the water_body_array to see if there are any empty slots from previous deletions
  var searching = true;
  var i = 0;
  var wb_id;
  var wb = false;
  while(searching == true){

    if (water_body_array[i]==0){

      wb_id = i+1;
      wb = new water_body(wb_id);
      water_body_array[wb_id-1] = wb;
      searching = false;
    }
    i++;
    if (i >= water_body_array.length){
      searching = false;
      wb_id = water_body_array.length+1;
      wb = new water_body(wb_id);
      water_body_array.push(wb);
    }
  }

// var wb_id = water_body_array.length+1;


  return wb_id;
}

function water_body_update_exits(wb){
  var water_array = wb.water;

  wb.clear_exits();


  // for each of the water blocks
  var exits = [];
  var exitsAboveWater = [];
  var searching = true;
  var count = 0;
  while(searching){
    var water_block = water_array[count];

    // destroy the water block if it is on a hole in the map
    var col = water_block[0];
    var row = water_block[1];

    // set the current high water to the next available in the water array
    var high_water = water_array[0];
    if(high_water){
    // find the adjacent empty squares

    // === TODO water block is sometimes undefined? ===== ///
    if(water_block){
      var empty_space_array = mapWaterStone_get_empty_spaces_adjacent(water_block);
      for(var j = 0; j< empty_space_array.length; j++){
        var empty = empty_space_array[j];
        // if lower than highest square

        if (empty[1]>high_water[1]){
          wb.add_exit(empty);
        }
        else{
          wb.addExitAboveWater(empty);
        }
      }
    }
    }


    count++;
    if (water_array.length == 0 || count >= water_array.length){
      searching = false;
    }
  }

}




function water_body_add_water(wb_id, w_coords){
      "use strict";
  // find the correct body in the array with the id as index

  var wb = water_body_array[wb_id-1];

  wb.add_water_block(w_coords);
}

function water_body_get_water(wb_id){
      "use strict";
  var wb = water_body_array[wb_id-1];
  return wb.water_array;
}


// function to remove empty water bodies
function clear_water_bodies(){
  water_body_array = water_body_array.filter(function(e) { return e !== 0 })

}



// a function that combines all the given water bodies.
function water_bodies_merge(wb_id_array){
      "use strict";
// merge all given arrays into first one
  var main_body = water_body_array[wb_id_array[0]-1];


  for(var i=1; i<wb_id_array.length; i++){

    var new_water_body = water_body_array[wb_id_array[i]-1];

    main_body.merge_water_block_array(new_water_body);

  }

  var new_wb_array = main_body.water;
  // draw the remaining water body to the mapWaterStone (which will erase all refs to the old one)

  for(var i =0; i <new_wb_array.length; i++){
    var wb = new_wb_array[i];
    mapWaterStone[wb[0]][wb[1]] = main_body.id;
  }


  for(var i=1; i<wb_id_array.length; i++){

    water_body_array[wb_id_array[i]-1]= 0;
}
for (i =0; i<water_body_array.length; i++){

}


}


// //+++++++++++++++ water block functions  +++++++++++++++++++//


// this function removes the highest water from the wb list wb.remove_water(0)
// it assumes that it will be given the coords of the highest block
// rename it so it is clear it will remove the highest block
// make it so it removes the highest block of the wb without needing the coords as well

function water_body_remove_highest_block(wb){

  // get the coords of the highest water block in the wb list
  var water_coords = wb.highest_water();

  // reset mapWaterStone square
  mapWaterStone[water_coords[0]][water_coords[1]] = 0;

  // mapWaterStone[h_water[0]][h_water[1]]= 0;
              // set water_body mapWaterStone
  wb.remove_water(0);


  // for (var i =0; i<wb.water.length; i++)
  // {

  // }

}





function water_block_create(sqr_coord){

  var mapWaterStone_value = mapWaterStone[sqr_coord[0]][sqr_coord[1]];
  var touching = false;
  var wb_id;
  // if (sqr_coord[1]==18)
  // {

  // }
  // deal with the case of empty mapWaterStone value first, then deal with existing wb later
  if (mapWaterStone_value ==0){
    // holds all the wbs found touching the square without repeats
    var wb_touching_array = check_for_water_body(sqr_coord);
    // water_body_touching_array.filter((item, index)=>water_body_touching_array.indexOf(item)===index);
    var water_body_touching_array = [...new Set(wb_touching_array)];
    var water_bodies_num = water_body_touching_array.length;
    // deal with no touching first
    if (water_bodies_num == 0){


 // create a new water body and set the id to it's return value
      wb_id = water_body_create(sqr_coord,false);
    }

    // if there are other water bodies
    else if (water_bodies_num> 0){

      //set the wb_id to the first body
      wb_id = water_body_touching_array[0];

      // if there are more than 1
      if (water_bodies_num > 1){
        // merge all the water bodies into the first
        water_bodies_merge(water_body_touching_array);
      }
    }

    // if mapWaterStone_value is 0 and we have a wb_id, create the sprite and add it to the wb

    var created = false
    if (water_block_build(sqr_coord, wb_id))
    {
      created = [sqr_coord, wb_id];
    };

   //+++ update the water body so it's exits are correct
    // water_body_update_exits(water_body_array[wb_id-1]);

    return created;
  }
  else if (mapWaterStone_value < 0){

    // return true to kill the drop
    return false;
  }
  else if (mapWaterStone_value > 0){
    // the block is being created inside another block that is already part of a water body
    // water_block_add_to_water_body(sqr_coord, mapWaterStone_value);

    return false
  }


}


function water_block_build(sqr_coord, wb_id){
  if (mapWaterStone[sqr_coord[0]][sqr_coord[1]]==0){
 //   water_block_create_sprite(sqr_coord);
    if(wb_id != false){

      water_body_add_water(wb_id, sqr_coord);
      mapWaterStone_add_water(sqr_coord, wb_id);
      return true;

    }

  }
  else{

    return false;
  }

}

function update(){
  if (mouseDown){
    var sqr_coord = get_square_coords(scene.input.x, scene.input.y);
    // check if the current square is the latest in the array
    if(sqr_coord[0] != mouseSelectedSquare[0] || sqr_coord[1] != mouseSelectedSquare[1]){

      mouseSelectedSquare = sqr_coord;
      mouseClickSquare(sqr_coord);
      // mouseSelectArray.push(sqr_coord);
    }



  }

}


//=========== mapWaterStone functions

function mapWaterStone_check_no_ground_below(coords){
      "use strict";
  // return true if there is air below the given coords
  if(mapWaterStone[coords[0]][coords[1]+1]==0){
    return true;
  }
  else{
    return false;
  }
}

function mapWaterStone_get_empty_spaces_adjacent(coord){
      "use strict";

  var space_array = [];
  // return an array of all empty squares next to given coord
  for(var j=0; j<4; j++){
    var new_coords = [coord[0]+ square_mask[j][0],coord[1]+ square_mask[j][1]];

    // new_coords needs to be inside the grid
    if (new_coords[0]>=0 && new_coords[0] < COLS && new_coords[1]>=0&& new_coords[1] < ROWS){

      if ( mapWaterStone[new_coords[0]][new_coords[1]]==0){

        space_array.push(new_coords);
      }
    }
  }

  return space_array;
}





function mapWaterStone_print(){
      "use strict";

  if(print_text){
    for(var i = 0; i<mapWaterStone_text_objects.length; i++){
      mapWaterStone_text_objects[i].destroy();
    }
    for (var col = 0; col<COLS; col++){
      for (var row =0; row <ROWS; row++){

        if (mapWaterStone[col][row]>0){
          //get pixel coords of square
          var p_coords = get_pixel_coords(col, row);
          var text = scene.add.text(p_coords[0],p_coords[1], mapWaterStone[col][row],{ font: '16px Arial', fill: '#ff0fff' });
          text.setOrigin(0.5,0.5);
          mapWaterStone_text_objects.push(text);
        }
        // else if(mapWaterStone[col][row]==-1){
        //   // paint a wall
        //     var p_coords = get_pixel_coords(col, row);
        //     var wall_block = scene.matter.add.image(p_coords[0], p_coords[1],'square_image').setStatic(true);
        //     wall_block.setCollisionCategory(scene.water_collision_cat);
        // }
      }
    }
  }
  else
  {
    scene.water_blitter.clear();
    for (var col = 0; col<COLS; col++)
    {
      for (var row =0; row <ROWS; row++)
      {
        if (mapWaterStone[col][row]>0)
        {

          var p_coords = get_pixel_coords_top_left_anchor(col, row);
          scene.water_blitter.create(p_coords[0], p_coords[1]);
        }
      }
    }
  }

}

function testPlayerCreate(){
  var playerBot = new Bot(0, "multi");
  playerBot.coords = playerStartCoords;
  var p_coords = get_pixel_coords(playerStartCoords[0],playerStartCoords[1]);
  playerBot.sprite = scene.matter.add.image(p_coords[0], p_coords[1],'player_image').setStatic(true);
  playerBot.sprite.setDepth(3);
  var newPlayer =
  {
    id : "1111",
    bot : playerBot,
    name : 'Testy',
    stateChanged : true
  }
  playerList.push(newPlayer);

}

function mapWaterStone_create(){
      "use strict";
    for (var col = 0; col <COLS; col++){
        mapWaterStone.push([]);
        for (var row=0; row <ROWS; row++){
            mapWaterStone[col].push(0);
        }
    }

  // map to store the actual sprites for ref
  scene.wall_blocks = [];
  for (var col = 0; col<COLS; col++){
    scene.wall_blocks.push([]);
    for (var row = 0; row<ROWS; row++){
      scene.wall_blocks[col].push(0);
    }
  }

}


function mapWaterStone_add_water(coord, w_id){
      "use strict";

  // check that we can add water, it is empty

  if (mapWaterStone[coord[0]][coord[1]] == 0){
    mapWaterStone[coord[0]][coord[1]]= w_id;
    return true;
  }
  else{
    return false;
  }
}

//=============== Sim functions

function sim_render_maps(){
  sim_render_mapWaterStone();

}



function sim_render_mapWaterStone(){

      "use strict";
  for (var col = 0; col<COLS; col++){
    for (var row =0; row <ROWS; row++){

      if(mapWaterStone[col][row]==-1){
        // paint a wall

          var p_coords = get_pixel_coords(col, row);
          var wall_block = scene.matter.add.image(p_coords[0], p_coords[1],'square_image').setStatic(true);
          scene.wall_blocks[col][row]= wall_block;
          // wall_block.setCollisionCategory(scene.wall_collision_cat);
        //  wall_block.setCollisionCategory(scene.wall_block_collision_cat);
      }
    }
  }
}

function sim_create_buttons(){
      var button_print = scene.matter.add.image(WIDTH- 80, HEIGHT -20, 'small_button_image').setStatic(true);
    button_print.setCollidesWith();
    button_print.setDepth(2);
    var text = scene.add.text(button_print.x, button_print.y, "numbers", { font: '22px Arial', fill: '#00ff00' });
    text.setOrigin(0.5,0.5);
    text.setDepth(2);
    button_print.setInteractive();
    button_print.on('pointerdown', ()=>{toggle_numbers()});

    // var button_plug = scene.matter.add.image(WIDTH - 80, HEIGHT -150, 'small_button_image').setStatic(true);
    // button_plug.setCollidesWith();
    // var text = scene.add.text(button_plug.x, button_plug.y, "plug", { font: '22px Arial', fill: '#00ff00' });
    // text.setOrigin(0.5,0.5);
    // button_plug.setInteractive();
    // button_plug.on('pointerdown', ()=>{plug()});

    // var button_path = scene.matter.add.image(WIDTH/2- 80, HEIGHT -20, 'small_button_image').setStatic(true);
    // button_path.setCollidesWith();
    // button_path.setDepth(2);
    // var text = scene.add.text(button_path.x, button_path.y, "refresh", { font: '22px Arial', fill: '#00ff00' });
    // text.setOrigin(0.5,0.5);
    // text.setDepth(2);
    // button_path.setInteractive();
    // button_path.on('pointerdown', ()=>{water_bodies_refresh()});

    // var button_walls = scene.matter.add.image(WIDTH - 190, HEIGHT -20, 'small_button_image').setStatic(true);
    // button_walls.setCollidesWith();
    // button_walls.setDepth(2);
    // var text = scene.add.text(button_walls.x, button_walls.y, "level", { font: '22px Arial', fill: '#00ff00' });
    // text.setOrigin(0.5,0.5);
    // text.setDepth(2);
    // button_walls.setInteractive();
    // button_walls.on('pointerdown', ()=>{toggle_walls()});



    var button_tap = scene.matter.add.image(WIDTH - 300, HEIGHT -20, 'small_button_image').setStatic(true);
    button_tap.setCollidesWith();
    button_tap.setDepth(2);
    var text = scene.add.text(button_tap.x, button_tap.y, "rain", { font: '22px Arial', fill: '#00ff00' });
    text.setOrigin(0.5,0.5);
    text.setDepth(2);
    button_tap.setInteractive();
    button_tap.on('pointerdown', ()=>{toggle_rain()});

    // //===============mouse settings=============////////

    var button_path = scene.matter.add.image(80, HEIGHT -20, 'mouse_button_image').setStatic(true);
    button_path.setCollidesWith();
    button_path.setDepth(2);
    var text = scene.add.text(button_path.x, button_path.y, "rock", { font: '22px Arial', fill: '#ff0000' });
    text.setOrigin(0.5,0.5);
    text.setDepth(2);
    button_path.setInteractive();
    button_path.on('pointerdown', ()=>{mouseSelectRock()});

    var button_erase = scene.matter.add.image(210, HEIGHT -20, 'mouse_button_image').setStatic(true);
    button_erase.setCollidesWith();
    button_erase.setDepth(2);
    var text = scene.add.text(button_erase.x, button_erase.y, "erase", { font: '22px Arial', fill: '#ff0000' });
    text.setOrigin(0.5,0.5);
    text.setDepth(2);
    button_erase.setInteractive();
    button_erase.on('pointerdown', ()=>{mouseSelectErase()});



}

function sim_add_boundaries(){
      "use strict";
  var wall_1  = scene.matter.add.image(-25, HEIGHT/2, 'wall_image').setStatic(true);
  // wall_1.setCollisionCategory(scene.wall_collision_cat);
  var wall_2  = scene.matter.add.image(WIDTH+25, HEIGHT/2, 'wall_image').setStatic(true);
  // wall_2.setCollisionCategory(scene.wall_collision_cat);

  var floor_1  = scene.matter.add.image(WIDTH/2, -25, 'floor_image').setStatic(true);
  // floor_1.setCollisionCategory(scene.wall_collision_cat);
  var floor_2  = scene.matter.add.image(WIDTH/2, HEIGHT+25, 'floor_image').setStatic(true);
  // floor_2.setCollisionCategory(scene.wall_collision_cat);
}

function check_for_water_body(coord){
      "use strict";
  var water_id_array = [];
  for(var j=0; j<4; j++){
    var new_coords = [coord[0]+ square_mask[j][0],coord[1]+ square_mask[j][1]];
    // new_coords is sometimes undefined, check it
    if (new_coords[0]>=0 && new_coords[0]< COLS){
      if ( mapWaterStone[new_coords[0]][new_coords[1]]>0){
        water_id_array.push (mapWaterStone[new_coords[0]][new_coords[1]]);
      }
    }
  }
  return water_id_array;
}

function draw_graphics(game){
      "use strict";
  graphics = game.make.graphics({x:0, y:0, add: false});

  graphics_water_block = game.make.graphics({x:0, y:0, add: false});

  // draw a white ball to tint later
    graphics.fillStyle(0xb349fc);
//  graphics.fillStyle(0xffffff);
  graphics.fillCircle(DROP_SIZE/2,DROP_SIZE/2,DROP_SIZE/2)
  graphics.generateTexture('player_image', DROP_SIZE, DROP_SIZE);
  graphics.clear();

  // draw a small display panel graphics
  graphics.fillStyle(0xffffff);
  graphics.fillRect(0,0,100,40);
  graphics.lineStyle(10,BRIGHT_PINK,1)
  graphics.strokeRect(0,0,100,40);
  graphics.generateTexture('small_button_image', 100,40);
  graphics.clear();

  // draw a small display panel graphics
  graphics.fillStyle(0xffffff);
  graphics.fillRect(0,0,100,40);
  graphics.lineStyle(10,BRIGHT_GREEN,1)
  graphics.strokeRect(0,0,100,40);
  graphics.generateTexture('mouse_button_image', 100,40);
  graphics.clear();

  graphics.fillStyle(0xffff00);
  graphics.fillRect(0,0,120,120);
  graphics.lineStyle(14,BRIGHT_PINK,1)
  graphics.strokeRect(0,0,120,120);
  graphics.generateTexture('block', 120,120);
  graphics.clear();

    // draw a square for holes
  graphics.fillStyle(0xae8459);
  graphics.fillRect(0,0,SQUARE_SIZE,SQUARE_SIZE);
  graphics.generateTexture('hole_image', SQUARE_SIZE,SQUARE_SIZE);
  graphics.clear();

    // draw a square for rocks
  graphics.fillStyle(0x6e6459);
  graphics.fillRect(0,0,SQUARE_SIZE,SQUARE_SIZE);
  graphics.generateTexture('square_image', SQUARE_SIZE,SQUARE_SIZE);
  graphics.clear();

  // draw a ladder square
  graphics.lineStyle(1, 0xa35608,1);
  for (var i=0; i<8; i++){
    graphics.beginPath();
    graphics.moveTo(0,4*i);
    graphics.lineTo(SQUARE_SIZE, 4*i);
    graphics.closePath();
    graphics.strokePath();
  }
  // graphics.fillRect(0,0,SQUARE_SIZE,SQUARE_SIZE);
  graphics.generateTexture('ladder_image', SQUARE_SIZE,SQUARE_SIZE);
  graphics.clear();

  // draw a tree box square
  graphics.lineStyle(1, 0x996600,1);
  for (var i=0; i<4; i++){
    graphics.beginPath();
    graphics.moveTo(0,4*i);
    graphics.lineTo(SQUARE_SIZE, 4*i);
    graphics.closePath();
    graphics.strokePath();
  }
  // graphics.fillRect(0,0,SQUARE_SIZE,SQUARE_SIZE);
  graphics.generateTexture('tree_base_image', SQUARE_SIZE,SQUARE_SIZE);
  graphics.clear();

    // draw a wall panel
  graphics.fillStyle(0xf5f5f3);
  graphics.fillRect(0,0,50,HEIGHT);
//  graphics.lineStyle(14,BRIGHT_PINK,1)
// graphics.strokeRect(0,0,140,60);
  graphics.generateTexture('wall_image', 50,HEIGHT);
  graphics.clear();

  // draw a floor panel
  graphics.fillStyle(0xf5f5f8);
  graphics.fillRect(0,0,WIDTH,50);
  //  graphics.lineStyle(14,BRIGHT_PINK,1)
  // graphics.strokeRect(0,0,140,60);
  graphics.generateTexture('floor_image', WIDTH,50);
  graphics.clear();

      // draw a water square
  graphics_water_block.fillStyle(0x03498c);
  graphics_water_block.fillRect(0,0,SQUARE_SIZE,SQUARE_SIZE);
  graphics_water_block.generateTexture('water_block_image', SQUARE_SIZE,SQUARE_SIZE);
  graphics_water_block.clear();

  if (draw_grid == true){
//    graphics.lineStyle(14,BRIGHT_PINK,1);

    var background_graphics = scene.add.graphics();
    background_graphics.lineStyle(.5, 0x00ff00, 1);

    for (var col = 0; col <COLS; col++){
        background_graphics.lineBetween(col*COL_WIDTH, 0, col*COL_WIDTH, HEIGHT);
    }

    for (var row=0; row <ROWS; row++){
        background_graphics.lineBetween(0,row*ROW_HEIGHT,WIDTH,row*ROW_HEIGHT);
    }
  }
}





function get_square_coords(x, y){
    var col = Math.floor(x/COL_WIDTH);
    var row = Math.floor(y/ROW_HEIGHT);
    if (col>=0 && col<COLS && row>=0 && row < ROWS){
      return([col, row]);
    }
    else{
      return false;
    }
}

function get_pixel_coords(x,y){
    var px = (x * COL_WIDTH)+COL_WIDTH/2;
    var py = (y * ROW_HEIGHT)+ROW_HEIGHT/2;
    return [px,py];
}


function get_pixel_coords_top_left_anchor(x,y){
    var px = (x * COL_WIDTH);
    var py = (y * ROW_HEIGHT);
    return [px,py];
}

function isInsideGrid(coords){
     if (coords[0]>=0 && coords[0] < COLS && coords[1]>=0&& coords[1] < ROWS){
         return true;
     }
     else{
         return false;
     }
}

// helper to translate a destination from the player grid to a real destination on the grid
function getDest(relDest, pos)
{

  var dest=[];
  // if x<2 then
  // use a mask to adjust the relative vals to real ones
  var xVals = [-2,-1,0,1,2];
  var yVals = [-3,-2,-1,0,1,2,3];

  // use the rel vals as indexes
  var xChange = xVals[relDest[0]];
  var realX = pos[0]+xChange;
  dest.push(realX);
  var yChange = yVals[relDest[1]];
  var realY = pos[1]+yChange;

  dest.push(realY);
  return dest;
}
