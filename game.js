const BOARD_SIZE = 15;
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

const PADDING = canvas.width / (BOARD_SIZE + 1);
const CELL = (canvas.width - PADDING * 2) / (BOARD_SIZE - 1);
const STONE_RADIUS = CELL * 0.44;

let board = [];
let currentPlayer = 1; // 1 = 흑, 2 = 백
let gameOver = false;

function initBoard() {
  board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
  currentPlayer = 1;
  gameOver = false;
  statusEl.textContent = '흑의 차례';
  drawBoard();
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 격자선
  ctx.strokeStyle = '#8b6914';
  ctx.lineWidth = 1;
  for (let i = 0; i < BOARD_SIZE; i++) {
    const x = PADDING + i * CELL;
    const y = PADDING + i * CELL;
    ctx.beginPath();
    ctx.moveTo(x, PADDING);
    ctx.lineTo(x, PADDING + (BOARD_SIZE - 1) * CELL);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(PADDING, y);
    ctx.lineTo(PADDING + (BOARD_SIZE - 1) * CELL, y);
    ctx.stroke();
  }

  // 화점 (5곳: 중앙 + 4귀)
  const starPoints = [3, 7, 11];
  ctx.fillStyle = '#8b6914';
  for (const r of starPoints) {
    for (const c of starPoints) {
      if ((r === 7 && c === 7) ||
          (r !== 7 && c !== 7)) {
        ctx.beginPath();
        ctx.arc(PADDING + c * CELL, PADDING + r * CELL, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // 돌 그리기
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] !== 0) {
        drawStone(r, c, board[r][c]);
      }
    }
  }
}

function drawStone(row, col, player) {
  const x = PADDING + col * CELL;
  const y = PADDING + row * CELL;

  ctx.beginPath();
  ctx.arc(x, y, STONE_RADIUS, 0, Math.PI * 2);

  if (player === 1) {
    const grad = ctx.createRadialGradient(x - STONE_RADIUS * 0.3, y - STONE_RADIUS * 0.3, 1, x, y, STONE_RADIUS);
    grad.addColorStop(0, '#666');
    grad.addColorStop(1, '#000');
    ctx.fillStyle = grad;
  } else {
    const grad = ctx.createRadialGradient(x - STONE_RADIUS * 0.3, y - STONE_RADIUS * 0.3, 1, x, y, STONE_RADIUS);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(1, '#ccc');
    ctx.fillStyle = grad;
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.fill();
}

function getGridPos(x, y) {
  const col = Math.round((x - PADDING) / CELL);
  const row = Math.round((y - PADDING) / CELL);
  return { row, col };
}

function checkWin(row, col, player) {
  const directions = [
    [0, 1],   // 가로
    [1, 0],   // 세로
    [1, 1],   // 대각선 ↘
    [1, -1],  // 대각선 ↙
  ];

  for (const [dr, dc] of directions) {
    let count = 1;
    for (let i = 1; i < 5; i++) {
      const r = row + dr * i, c = col + dc * i;
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) break;
      count++;
    }
    for (let i = 1; i < 5; i++) {
      const r = row - dr * i, c = col - dc * i;
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) break;
      count++;
    }
    if (count >= 5) return true;
  }
  return false;
}

canvas.addEventListener('click', (e) => {
  if (gameOver) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  const { row, col } = getGridPos(x, y);

  if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return;
  if (board[row][col] !== 0) return;

  board[row][col] = currentPlayer;
  drawBoard();

  if (checkWin(row, col, currentPlayer)) {
    const winner = currentPlayer === 1 ? '흑' : '백';
    statusEl.textContent = `${winner} 승리! 🎉`;
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  statusEl.textContent = currentPlayer === 1 ? '흑의 차례' : '백의 차례';
});

resetBtn.addEventListener('click', initBoard);

initBoard();
