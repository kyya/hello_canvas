(function () {
  // 获取画布元素
  const canvasEl = document.querySelector("#app") as HTMLCanvasElement;
  const ctx = canvasEl.getContext("2d") as CanvasRenderingContext2D;
  const mouse = { x: 0, y: 0 };

  // 获取鼠标位置
  document.addEventListener("mousemove", (ev) => {
    mouse.x = ev.clientX;
    mouse.y = ev.clientY;
  });

  // 窗口尺寸
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;
  const radius = 200;

  // 设置画布尺寸
  canvasEl.width = innerWidth * 2;
  canvasEl.height = innerHeight * 2;
  canvasEl.style.width = innerWidth + "px";
  canvasEl.style.height = innerHeight + "px";
  ctx.scale(2, 2);

  // 开始动画
  render();

  function _distance(x1: number, y1: number, x2: number, y2: number) {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  }

  function _clamp(x: number, min: number, max: number) {
    x = Math.max(x, min);
    x = Math.min(x, max);
    return x;
  }

  function _toDegree(radian: number) {
    radian = (2 * Math.PI - radian) % (2 * Math.PI);
    return (radian / Math.PI) * 180;
  }

  function drawCircle() {
    // 绘制圆圈
    const radian = Math.atan2(mouse.y - centerY, mouse.x - centerX);

    // 圆心原点
    ctx.beginPath();
    ctx.arc(centerX, centerY, 1, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // 圆周
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // 半径上一点
    const dradius = _clamp(
      0,
      _distance(centerX, centerY, mouse.x, mouse.y),
      radius
    );
    const dpointX = centerX + dradius * Math.cos(radian);
    const dpointY = centerY + dradius * Math.sin(radian);

    // 以此的圆周
    ctx.beginPath();
    ctx.arc(centerX, centerY, dradius, 0, 2 * Math.PI);
    ctx.save();
    ctx.setLineDash([2]);
    ctx.stroke();
    ctx.restore();

    // 圆周上一点
    const pointX = centerX + radius * Math.cos(radian);
    const pointY = centerY + radius * Math.sin(radian);

    ctx.beginPath();
    ctx.arc(dpointX, dpointY, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // 圆心和圆上一点连线
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(pointX, pointY);
    ctx.stroke();

    // 虚线
    drawDashLine(centerX - radius, centerY, centerX + radius, centerY);
    drawDashLine(centerX, centerY - radius, centerX, centerY + radius);

    // 小角标
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, radian, true);
    ctx.stroke();

    ctx.fillText(_toDegree(radian).toFixed() + "°", centerX + 16, centerY - 16);
  }

  function drawDashLine(x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.save();
    ctx.setLineDash([2]);
    ctx.stroke();
    ctx.restore();
  }

  function drawSquare() {
    ctx.beginPath();
    ctx.rect(centerX - radius, centerY - radius, radius * 2, radius * 2);
    ctx.stroke();
  }

  function drawLinearGradient() {
    const centerX = 200;
    const centerY = 200;
    const radius = 50;

    const grd = ctx.createLinearGradient(
      centerX,
      centerY - radius,
      centerX,
      centerY + radius
    );
    grd.addColorStop(0, "#4e54c8");
    grd.addColorStop(1, "#8f94fb");
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.save();
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawRadialGradient() {
    const centerX = 300;
    const centerY = 300;
    const radius = 50;

    const grd = ctx.createRadialGradient(
      centerX,
      centerY,
      50,
      centerX,
      centerY,
      10
    );
    grd.addColorStop(0, "#4e54c8");
    grd.addColorStop(1, "#8f94fb");
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.save();
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    drawCircle();
    drawSquare();
    // drawLinearGradient();
    // drawRadialGradient();
    window.requestAnimationFrame(render);
  }
})();
