/* SAHNE 1 — BİR ALGORİTMA (0–10 s)  Even: halve it. Odd: × 3 + 1. Stop at 1.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const ink = (a) => `rgba(${LI.INK_RGB},${a})`;

  /** the run of the algorithm from n */
  function run(n) { const s = [n]; while (n !== 1) { n = n % 2 ? 3 * n + 1 : n / 2; s.push(n); } return s; }
  const R6 = run(6), R7 = run(7);

  function box(ctx, x, y, w, h, s, a, seed, fill, size) {
    if (a <= 0) return;
    if (fill) { ctx.fillStyle = amber(0.6 * fill * a); ctx.fillRect(x - w / 2, y - h / 2, w, h); }
    Ink.path(ctx, [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2], [x + w / 2, y + h / 2], [x - w / 2, y + h / 2], [x - w / 2, y - h / 2]], { w: 4, alpha: a, seed, taper: [0, 0] });
    F().T(ctx, s, x, y, { size, alpha: a });
  }
  function diamond(ctx, x, y, s, a, seed, size) {
    if (a <= 0) return;
    Ink.path(ctx, [[x, y - 38], [x + 95, y], [x, y + 38], [x - 95, y], [x, y - 38]], { w: 4, alpha: a, seed, taper: [0, 0] });
    F().T(ctx, s, x, y, { size, alpha: a });
  }
  const arrow = (ctx, p, q, a, seed) => { if (a <= 0) return; Ink.path(ctx, [p, q], { w: 3, alpha: a, seed, taper: [0, 0] }); const d = Math.atan2(q[1] - p[1], q[0] - p[0]); Ink.path(ctx, [[q[0] - 12 * Math.cos(d - 0.5), q[1] - 12 * Math.sin(d - 0.5)], q, [q[0] - 12 * Math.cos(d + 0.5), q[1] - 12 * Math.sin(d + 0.5)]], { w: 3, alpha: a, seed: seed + 1, taper: [0, 0] }); };

  function flowchart(ctx, env, t, lastOp) {
    const L = KD.L(env), C = L.FC, f = F(), s = L.G.s * 0.62;
    const a = (C.hide ? win(t, 4.4, 45.8) : win(t, 4.4, 79.8)) * END(t); if (a <= 0) return;
    const k = (i) => seg(t, 4.6 + i * 0.8, 5.2 + i * 0.8) * a, x = C.x, y = C.y;
    box(ctx, x, y[0], 190, 50, 'Bir sayı seç', k(0), 4100, 0, s);
    arrow(ctx, [x, y[0] + 25], [x, y[1] - 38], k(1), 4110);
    diamond(ctx, x, y[1], '1 mi?', k(1), 4120, s);
    arrow(ctx, [x + 95, y[1]], [x + 175, y[1]], k(2), 4130); box(ctx, x + 225, y[1], 90, 46, 'Dur', k(2), 4140, 0, s); f.T(ctx, 'evet', x + 132, y[1] - 18, { size: s * 0.7, alpha: k(2) });
    arrow(ctx, [x, y[1] + 38], [x, y[2] - 38], k(3), 4150); f.T(ctx, 'hayır', x + 34, (y[1] + y[2]) / 2, { size: s * 0.7, alpha: k(3), align: 'left' });
    diamond(ctx, x, y[2], 'Çift mi?', k(3), 4160, s);
    arrow(ctx, [x - 95, y[2]], [x - C.bx, y[3] - 24], k(4), 4170); arrow(ctx, [x + 95, y[2]], [x + C.bx, y[3] - 24], k(4), 4180);
    f.T(ctx, 'evet', x - C.bx - 20, y[2] + 6, { size: s * 0.7, alpha: k(4), align: 'right' }); f.T(ctx, 'hayır', x + C.bx + 20, y[2] + 6, { size: s * 0.7, alpha: k(4), align: 'left' });
    box(ctx, x - C.bx, y[3], 100, 48, '÷ 2', k(4), 4190, lastOp === 'h' ? 1 : 0, s * 1.2);
    box(ctx, x + C.bx, y[3], 130, 48, '× 3 + 1', k(4), 4200, lastOp === 'o' ? 1 : 0, s * 1.2);
    // back to "1 mi?"
    const back = k(5);
    if (back > 0) { const xl = x - C.bx - 90; Ink.path(ctx, [[x - C.bx - 50, y[3]], [xl, y[3]], [xl, y[1]]], { w: 3, alpha: back * 0.6, seed: 4210, taper: [0, 0] }); arrow(ctx, [xl, y[1]], [x - 95, y[1]], back * 0.6, 4211); }
  }

  /** a chain of numbers with arrows; times[i] = when node i appears; rows = y list */
  function chain(ctx, L, seq, times, rows, t, a, colourByParity) {
    if (a <= 0) return;
    const f = F(), C = L.CH, pos = (i) => { const r = Math.floor(i / C.per), c = i % C.per; return [C.x0 + (r % 2 ? C.per - 1 - c : c) * C.dx, rows[r]]; };
    seq.forEach((v, i) => {
      const k = seg(t, times[i], times[i] + 0.35) * a; if (k <= 0) return;
      const [x, y] = pos(i), even = v % 2 === 0;
      ctx.fillStyle = colourByParity ? (even ? amber(0.55 * k) : ink(0.12 * k)) : amber((i === seq.length - 1 ? 0.8 : 0.35) * k);
      ctx.beginPath(); ctx.arc(x, y, C.r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = ink(0.8 * k); ctx.lineWidth = 3; ctx.stroke();
      f.T(ctx, String(v), x, y, { size: C.r * (v >= 10 ? 0.95 : 1.15), alpha: k });
      if (i > 0) {
        const [px, py] = pos(i - 1), op = seq[i - 1] % 2 ? '×3+1' : '÷2';
        const dir = Math.sign(x - px);
        if (py === y) { arrow(ctx, [px + dir * (C.r + 4), y], [x - dir * (C.r + 4), y], k, 4300 + i); f.T(ctx, op, (px + x) / 2, y - C.r - 6, Object.assign({ size: C.r * 0.62, alpha: k }, f.AMB)); }
        else { arrow(ctx, [x, py + C.r + 2], [x, y - C.r - 2], k, 4300 + i); f.T(ctx, op, x + C.r + 8, (py + y) / 2, Object.assign({ size: C.r * 0.62, alpha: k, align: 'left' }, f.AMB)); }
      }
    });
  }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Bir algoritma: sayının yolculuğu'],
      [10.6, 27.8, 'Algoritmayı 6 ile çalıştıralım'],
      [28.4, 45.8, 'Algoritmayı tabloya dönüştürelim'],
      [46.4, 63.8, 'Bir de 7 ile deneyelim'],
      [64.4, 79.8, 'İlişkileri sözle ifade edelim'],
    ]);
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t), C = L.CH;
    // which operation was used last (for the flowchart highlight)
    let lastOp = null;
    const T6 = R6.map((_, i) => 11.0 + i * 1.2), T7 = R7.map((_, i) => 47.0 + i * 0.55);
    [[R6, T6], [R7, T7]].forEach(([R, T]) => { for (let i = 1; i < R.length; i++) if (t > T[i] && t < T[i] + 1.1) lastOp = R[i - 1] % 2 ? 'o' : 'h'; });
    flowchart(ctx, env, t, lastOp);
    const hideV = L.FC.hide;
    chain(ctx, L, R6, T6, C.y, t, (hideV ? win(t, 10.8, 28.2) : win(t, 10.8, 45.8)) * a, false);
    // the table
    const tb = win(t, 28.6, 45.8) * a, TB = L.TB;
    if (tb > 0) {
      f.T(ctx, 'Adım', TB.lx, TB.y[0], { size: L.G.s * 0.6, alpha: tb }); f.T(ctx, 'Sayı', TB.lx, TB.y[1], { size: L.G.s * 0.6, alpha: tb });
      R6.forEach((v, i) => { const k = seg(t, 28.8 + i * 0.25, 29.2 + i * 0.25) * tb; if (k <= 0) return; const x = TB.x0 + i * TB.dx; f.T(ctx, String(i), x, TB.y[0], { size: L.G.s * 0.65, alpha: k }); f.T(ctx, String(v), x, TB.y[1], Object.assign({ size: L.G.s * 0.7, alpha: k }, f.AMB)); });
    }
    const rows7 = hideV ? C.y2 : C.y;
    chain(ctx, L, R7, T7, rows7, t, win(t, 46.6, 79.8) * a, t > 64.4);
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'Çiftse 2’ye böl, tekse 3 ile çarp 1 ekle; 1 olunca dur'], [11.4, 27.8, '6 çift: 6 ÷ 2 = 3'],
      [29.4, 45.8, 'Her sütun bir adım: 6, 3, 10, 5, 16, 8, 4, 2, 1'], [47.4, 63.8, '7 tek: 7 × 3 + 1 = 22'],
      [65.0, 79.8, 'Çift sayı yarıya iner: küçülür']]);
    exprs(ctx, t, at(W, 1), [[13.8, 27.8, '3 tek: 3 × 3 + 1 = 10'], [34.0, 45.8, '5 ile: 5, 16, 8, 4, 2, 1 · 5 adım'],
      [52.0, 63.8, '52’ye kadar çıktı, sonra 1’e indi'], [68.6, 79.8, 'Tek sayının 3 katının 1 fazlası hep çifttir: sonra yarıya iner']]);
    exprs(ctx, t, at(W, 2), [[21.4, 27.8, '6’dan 1’e 8 adımda ulaştı', true], [38.4, 45.8, 'Tablo, algoritmanın her adımını gösterir', true],
      [56.4, 63.8, '7’den 1’e 16 adımda ulaştı', true], [72.4, 79.8, 'Denediğimiz her sayı sonunda 1’e ulaştı', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Algoritma: sırayla uygulanan adımlar', 80.6], ['Çiftse ÷ 2, tekse × 3 + 1, 1 olunca dur', 81.6], ['Tabloya dökünce ilişkiler görünür', 82.6], ['Adımları sözle açıklayabilirsin!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'An algorithm', nameTr: 'Bir algoritma', concept: 'Halve or × 3 + 1', conceptTr: '÷ 2 ya da × 3 + 1', render });
})(window.LI = window.LI || {});
