
///=======TODO
//order the water in the body from highest to lowest so that when you're looking for the best block to exit it is found quickly. DONE
// once a higher water block is found stop searching, add a new ball/ block for each 5 levels (for pressure)
// create internal timers so water bodies sort themselves every .5 seconds



class water_body{
  constructor(id, first_block_coord){
    this.id = id;
    
    // 2D array of cols (spans) and rows(stretches) that contains all the water and exits for this body
    // start with one for the first water block
    this.water =[];
    this.exits=[];
    this.exitsAboveWater = [];
    this.refresh_countdown = 2;
    this.add_drop_count=0;
    
    // stores the first water block when created
  //  this.water.push(first_block_coord);
      

   // console.log("water body created with exits above: ", this.exits_above);
  }
  
  check_exists(){
    if (this.water.length<=0){
      return true;
    }
    else{
      return false;
    }
  }
  
  add_water_block(wb_coord){
  //  this.water.push(wb_coord);
    
    // console.log("------ water added to wb: ", wb_coord);
        this.water.push(wb_coord);
        // console.log("water: ", this.water[0]);

    
  }
  
  
  // remove_water(index){
  //     this.water.splice(index, 1);
  // }
  
  get_exits(){
    return this.exits;
  }
  
  getExitsAbove(){
    return this.exitsAboveWater;
  }
  
  merge_water_block_array(wb){
    //console.log("------- merge: ", wb.water, this.water);
    this.water = this.water.concat(wb.water);
   // console.log("after merge: ", this.water);
  }
  clear_body(){
 //   console.log("clearing wb: ", this.id);
    this.exits = [];
    // this.water = [];
  }
  clear_exits(){
    this.exits = [];
    this.exitsAboveWater = [];
  }
  // try to add the exit to the list, add if below highest water
  add_exit(coord){
  this.exits.push(coord);
  }
  
  addExitAboveWater(coord){
    this.exitsAboveWater.push(coord);
  }
  
  highest_water(){
    var high_water = false;
    // get the first of the sorted list of water blocks
    if (this.water.length>0){
      high_water = this.water[0];
    }
    return high_water;
  }
  
  sort_water(){
  //  console.log("------ sorting water array:", this.water[0]);
    quick_sort_rows(this.water,0,this.water.length-1);
    
  //  console.log("------ sorting water array: ", this.water[0]);
  }
  
  remove_water(index){
      this.water.splice(index, 1);
  }
  
  remove_water_from_square(coord){
    // console.log(" ++++++ remove: ", coord);
    // console.log(this.water.findIndex(checkCoord(coord)));
    var index = this.water.findIndex(checkCoord, coord);
    this.remove_water(index);
  }
  
  refresh(){
    this.refresh_countdown--;
    if(this.refresh_countdown ==0){
      this.refresh_countdown = 2;
      return true;
    }
    else{
      return false;
    }
  }
}

function checkCoord(square){
  // console.log("current water: ", square);
  // console.log(this);
  return (square[0] == this[0] && square[1] == this[1]);
}
// function water_map_get_empty_spaces_adjacent(coord, map){
//       "use strict";
//   //console.log("get empty spaces: ", coord);
//   var space_array = [];
//   // return an array of all empty squares next to given coord
//   for(var j=0; j<4; j++){
//     var new_coords = [coord[0]+ square_mask[j][0],coord[1]+ square_mask[j][1]];
//     //console.log("new coords: ", new_coords);
//     // new_coords needs to be inside the grid
//     if (new_coords[0]>=0 && new_coords[0] < COLS && new_coords[1]>=0&& new_coords[1] < ROWS){

//       if ( map[new_coords[0]][new_coords[1]]==0){
//       // console.log("new coords empty: ", new_coords);
//         space_array.push(new_coords);
//       }
//     }
//   }
// // console.log(space_array);
//   return space_array;
// }


function quick_sort_rows(A, low, high){
  if (low < high){
    var pi = partition_rows(A,low,high);
    quick_sort_rows(A, low, pi-1);
    quick_sort_rows(A, pi +1, high);
    
  };
};

function partition_rows(A, low, high){
  var pivot = A[high];

  var i = low-1;

  for(var j = low; j<= high-1; j++){

     if(A[j][1]< pivot[1]){
       i++;
       var temp_i = A[i];
       A[i] = A[j];
       A[j] = temp_i;
      }      
    

  }
   A[high] = A[i+1];
   A[i+1] = pivot;
   return (i+1);
}