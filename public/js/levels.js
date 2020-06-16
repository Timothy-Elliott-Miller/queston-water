function level_0(mapWaterStone){
  // mapWaterStone[1][1] = -1;
  // mapWaterStone[0][1] = -1;
  // mapWaterStone[2][1] = -1;
  // mapObjects[3][2] = -2;
  //
  // for (var col = 0; col < COLS; col++){
  //     for (var row=30; row <ROWS-5; row++){
  //         mapWaterStone[col][row]= -1;
  //     }
  //   }

  //
  for (var col = COLS- 45; col < COLS; col++){
      for (var row=7; row <9; row++){
          mapWaterStone[col][row]= -1;
      }
    }
    for (var col = 0; col < COLS-3; col++){
        for (var row=30; row <32; row++){
            mapWaterStone[col][row]= -1;
        }
      }
    for (var col = 15; col < COLS-14; col++){
        for (var row=18; row <20; row++){
            mapWaterStone[col][row]= -1;
        }
      }
    for (var col = COLS-12; col < COLS-4; col++){
        for (var row=18; row <20; row++){
            mapWaterStone[col][row]= -1;
        }
      }
    for (var col = 15; col < COLS-6; col++){
        for (var row=28; row <29; row++){
            mapWaterStone[col][row]= -1;
        }
      }
    for (var col = 16; col < COLS-5; col++){
        for (var row=26; row <27; row++){
            mapWaterStone[col][row]= -1;
        }
      }
      for (var col = 15; col < COLS-6; col++){
          for (var row=24; row <25; row++){
              mapWaterStone[col][row]= -1;
          }
        }
        for (var col = 16; col < COLS-5; col++){
            for (var row=22; row <23; row++){
                mapWaterStone[col][row]= -1;
            }
          }
    for (var row = 9; row < 30; row++){
        for (var col=13; col <15; col++){
            mapWaterStone[col][row]= -1;
        }
      }
    for (var row = 9; row < 30; row++){
        for (var col=COLS-5; col <COLS-3; col++){
            mapWaterStone[col][row]= -1;
        }
      }

// floor level
  for (var col=0; col <COLS; col++){
    mapWaterStone[col][ROWS-4]= -1;
  }
  // for (var col=3; col <COLS; col++){
  //   mapWaterStone[col][ROWS-5]= -1;
  // }
}
