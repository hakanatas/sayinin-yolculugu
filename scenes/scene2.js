/* SAHNE 2 — 6 İLE (10–28 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 2, start: 10, end: 28, name: "Starting at 6", nameTr: "6 ile", concept: "6 to 1 in 8 steps", conceptTr: "8 adımda 1", render });
})(window.LI = window.LI || {});
