
const WIDTH = 750;
const HEIGHT = 600;
// const WIDTH = 120;
// const HEIGHT = 120;

const ROWS = HEIGHT/15;
const ROW_HEIGHT = HEIGHT/ROWS;
const COLS = WIDTH/15;
const COL_WIDTH = WIDTH/COLS;
const BRIGHT_GREEN = 0x00ff00;
const BRIGHT_PINK = 0Xff0080;
const DROP_SIZE = 14;
// const BALL_SIZE = ROW_HEIGHT-(ROW_HEIGHT/8);
const SQUARE_SIZE = ROW_HEIGHT;
const draw_grid = false;
const auto_turn = true;
const square_mask = [[-1,0],[1,0],[0,-1],[0,1]];
