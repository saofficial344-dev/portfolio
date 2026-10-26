import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ---------- the developer ---------- */
const UP = new THREE.Vector3(0, 1, 0);

function limb(r, mat) {
  const g = new THREE.Group();
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1, 12), mat);
  const s1 = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), mat);
  const s2 = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), mat);
  g.add(cyl, s1, s2);
  g.userData = { cyl, s1, s2 };
  return g;
}
function setLimb(g, a, b) {
  const { cyl, s1, s2 } = g.userData;
  const d = new THREE.Vector3().subVectors(b, a);
  cyl.position.copy(a).addScaledVector(d, 0.5);
  cyl.quaternion.setFromUnitVectors(UP, d.clone().normalize());
  cyl.scale.set(1, d.length(), 1);
  s1.position.copy(a);
  s2.position.copy(b);
}

const CODE = [
  "const app = express();",
  "app.use(cors());",
  "app.get('/api', handler);",
  "await db.connect();",
  "app.listen(5000);",
];

export function buildDev(scene, pcH) {
  const S = 0.8, X0 = 2.6, Z0 = 0.35, R = -0.6;
  const floorY = -pcH / 2 - 0.17;

  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.05, ...o });
  const skin = mat(0xd7a47c, { roughness: 0.6 });
  const hoodie = mat(0x1d2b5e, { roughness: 0.85 });
  const jeans = mat(0x242a3d, { roughness: 0.9 });
  const hair = mat(0x14110f, { roughness: 0.5 });
  const gold = mat(0xd6b26a, { metalness: 0.7, roughness: 0.3 });
  const graphite = mat(0x1b1f31, { metalness: 0.6, roughness: 0.4 });
  const white = mat(0xeceff8, { roughness: 0.6 });
  const logo = new THREE.MeshBasicMaterial({ color: 0xd6b26a, toneMapped: false });

  const group = new THREE.Group();
  group.position.set(X0, floorY, Z0);
  group.rotation.y = R;
  group.scale.setScalar(S);
  scene.add(group);

  const rb = (w, h, d, m, r = 0.03) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, r), m);

  /* chair */
  const seat = rb(0.56, 0.07, 0.54, graphite, 0.03); seat.position.set(0, 0.57, 0); group.add(seat);
  const back = rb(0.54, 0.66, 0.08, graphite, 0.04); back.position.set(0, 0.95, -0.27); back.rotation.x = -0.08; group.add(back);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.42, 10), graphite); post.position.set(0, 0.34, 0); group.add(post);
  const star = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.035, 5), graphite); star.position.set(0, 0.06, 0); group.add(star);

  /* body */
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.34, 8, 18), hoodie);
  torso.position.set(0, 0.97, 0); torso.scale.set(1.2, 1, 0.82); group.add(torso);
  const hips = new THREE.Mesh(new THREE.SphereGeometry(0.21, 16, 12), jeans); hips.position.set(0, 0.67, 0.02); hips.scale.set(1.1, 0.7, 1); group.add(hips);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.12, 10), skin); neck.position.set(0, 1.35, 0.01); group.add(neck);
  const hoodRing = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.04, 8, 20), hoodie);
  hoodRing.position.set(0, 1.3, 0.02); hoodRing.rotation.x = Math.PI / 2.1; group.add(hoodRing);

  /* legs (seated) */
  [-1, 1].forEach((s) => {
    const th = limb(0.085, jeans); setLimb(th, new THREE.Vector3(s * 0.13, 0.66, 0.02), new THREE.Vector3(s * 0.15, 0.68, 0.5)); group.add(th);
    const sh = limb(0.07, jeans); setLimb(sh, new THREE.Vector3(s * 0.15, 0.68, 0.5), new THREE.Vector3(s * 0.15, 0.13, 0.56)); group.add(sh);
    const foot = rb(0.13, 0.08, 0.26, white, 0.04); foot.position.set(s * 0.15, 0.06, 0.64); group.add(foot);
  });

  /* head */
  const head = new THREE.Group(); head.position.set(0, 1.4, 0.01); group.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.2, 28, 20), skin); skull.position.set(0, 0.2, 0.02); skull.scale.set(0.92, 1.08, 1); head.add(skull);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.215, 28, 16, 0, Math.PI * 2, 0, Math.PI * 0.55), hair);
  cap.position.set(0, 0.22, -0.005); cap.rotation.x = -0.18; head.add(cap);
  const bun = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 12), hair); bun.position.set(0, 0.17, -0.07); head.add(bun);
  const quiff = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 14), hair); quiff.scale.set(1.25, 0.7, 1.5); quiff.position.set(0.03, 0.4, 0.08); quiff.rotation.x = -0.35; quiff.rotation.z = -0.12; head.add(quiff);
  const sweep = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), hair); sweep.scale.set(1.6, 0.6, 1.1); sweep.position.set(-0.07, 0.36, 0.13); sweep.rotation.z = 0.35; head.add(sweep);
  const beard = new THREE.Mesh(new THREE.SphereGeometry(0.206, 28, 16, 0, Math.PI * 2, Math.PI * 0.74, Math.PI * 0.26), mat(0x1c1613, { roughness: 0.95 }));
  beard.position.set(0, 0.2, 0.025); beard.scale.set(0.97, 1.08, 1.02); head.add(beard);
  const stache = rb(0.1, 0.02, 0.03, hair, 0.01); stache.position.set(0, 0.148, 0.19); head.add(stache);
  const glassMat = mat(0x0f1220, { metalness: 0.6, roughness: 0.3 });
  [-1, 1].forEach((s) => {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.052, 0.006, 8, 24), glassMat); rim.position.set(s * 0.078, 0.215, 0.192); head.add(rim);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.05, 20), new THREE.MeshBasicMaterial({ color: 0x9fb4ff, transparent: true, opacity: 0.14, depthWrite: false })); lens.position.set(s * 0.078, 0.215, 0.193); head.add(lens);
    const arm = rb(0.006, 0.006, 0.17, glassMat, 0.002); arm.position.set(s * 0.133, 0.215, 0.1); head.add(arm);
  });
  const bridge = rb(0.03, 0.006, 0.006, glassMat, 0.002); bridge.position.set(0, 0.222, 0.2); head.add(bridge);
  [-1, 1].forEach((s) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.025, 10, 8), mat(0x0b0b10, { roughness: 0.3 }));
    eye.position.set(s * 0.075, 0.215, 0.185); head.add(eye);
    const brow = rb(0.08, 0.02, 0.016, hair, 0.006); brow.position.set(s * 0.075, 0.26, 0.19); brow.rotation.z = s * -0.12; head.add(brow);
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), skin); ear.position.set(s * 0.19, 0.2, 0.0); ear.scale.set(0.6, 1, 0.9); head.add(ear);
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.06, 18), gold);
    cup.rotation.z = Math.PI / 2; cup.position.set(s * 0.215, 0.2, 0.0); head.add(cup);
  });
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), skin); nose.position.set(0, 0.18, 0.2); head.add(nose);
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.008, 6, 14, Math.PI), mat(0x6b2e2e));
  smile.position.set(0, 0.125, 0.185); smile.rotation.z = Math.PI; head.add(smile);
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.218, 0.017, 8, 28, Math.PI), gold);
  band.position.set(0, 0.2, 0); head.add(band);
  const mic = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.16, 6), graphite);
  mic.position.set(0.2, 0.1, 0.09); mic.rotation.z = 0.5; mic.rotation.x = 0.7; head.add(mic);

  /* arms */
  const shoulders = [new THREE.Vector3(-0.3, 1.22, 0), new THREE.Vector3(0.3, 1.22, 0)];
  const elbows = [new THREE.Vector3(-0.31, 0.97, 0.2), new THREE.Vector3(0.31, 0.97, 0.2)];
  const handBase = [new THREE.Vector3(-0.15, 1.0, 0.8), new THREE.Vector3(0.15, 1.0, 0.8)];
  const upper = [0, 1].map((i) => { const l = limb(0.075, hoodie); setLimb(l, shoulders[i], elbows[i]); group.add(l); return l; });
  const fore = [0, 1].map(() => { const l = limb(0.065, hoodie); group.add(l); return l; });
  const hands = [0, 1].map(() => { const h = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 10), skin); group.add(h); return h; });

  /* desk + laptop + mug */
  const desk = rb(1.9, 0.06, 0.95, graphite, 0.025); desk.position.set(0, 0.92, 0.92); group.add(desk);
  const edge = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.012, 0.012), logo); edge.position.set(0, 0.95, 1.4); group.add(edge);
  [[-0.88, 0.5], [0.88, 0.5], [-0.88, 1.34], [0.88, 1.34]].forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.9, 0.05), graphite); leg.position.set(x, 0.45, z); group.add(leg);
  });
  const base = rb(0.72, 0.03, 0.5, mat(0x9aa3bd, { metalness: 0.9, roughness: 0.3 }), 0.012); base.position.set(0, 0.965, 0.86); group.add(base);
  const keys = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.004, 0.2), graphite); keys.position.set(0, 0.982, 0.8); group.add(keys);
  const hinge = new THREE.Group(); hinge.position.set(0, 0.98, 1.11); hinge.rotation.x = 0.22; group.add(hinge);
  const lid = rb(0.72, 0.48, 0.022, mat(0x9aa3bd, { metalness: 0.9, roughness: 0.3 }), 0.012); lid.position.set(0, 0.24, 0); hinge.add(lid);
  const logoDot = new THREE.Mesh(new THREE.CircleGeometry(0.05, 24), logo); logoDot.position.set(0, 0.25, 0.013); hinge.add(logoDot);
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.055, 0.11, 16), gold); mug.position.set(0.72, 1.0, 0.95); group.add(mug);

  /* soft shadow under the whole set */
  const blobC = document.createElement("canvas"); blobC.width = blobC.height = 128;
  const bg = blobC.getContext("2d");
  const gr = bg.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, "rgba(0,0,0,0.5)"); gr.addColorStop(1, "rgba(0,0,0,0)");
  bg.fillStyle = gr; bg.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.4), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(blobC), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.set(0, 0.01, 0.8); group.add(shadow);

  /* floating code bubble */
  const cv = document.createElement("canvas"); cv.width = 512; cv.height = 300;
  const cx = cv.getContext("2d");
  const bubbleTex = new THREE.CanvasTexture(cv);
  bubbleTex.colorSpace = THREE.SRGBColorSpace;
  const bubble = new THREE.Mesh(
    new THREE.PlaneGeometry(1.15, 0.67),
    new THREE.MeshBasicMaterial({ map: bubbleTex, transparent: true, depthWrite: false, toneMapped: false })
  );
  scene.add(bubble);
  let lastChars = -1;
  const drawBubble = (chars) => {
    cx.clearRect(0, 0, 512, 300);
    cx.fillStyle = "rgba(10,13,24,0.88)";
    cx.beginPath(); cx.roundRect(4, 4, 504, 292, 26); cx.fill();
    cx.strokeStyle = "rgba(214,178,106,0.8)"; cx.lineWidth = 3; cx.stroke();
    ["#ff6b8b", "#d6b26a", "#7cd6a8"].forEach((c, i) => { cx.fillStyle = c; cx.beginPath(); cx.arc(34 + i * 24, 32, 7, 0, 7); cx.fill(); });
    cx.font = "600 23px ui-monospace, Menlo, Consolas, monospace";
    let left = chars;
    CODE.forEach((line, i) => {
      if (left <= 0) return;
      const txt = line.slice(0, left); left -= line.length + 1;
      cx.fillStyle = i % 2 ? "#aab6ff" : "#d6b26a";
      cx.fillText(txt, 28, 82 + i * 42);
    });
    if (Math.floor(performance.now() / 450) % 2 === 0) { cx.fillStyle = "#d6b26a"; cx.fillRect(28 + 4, 270, 12, 4); }
    bubbleTex.needsUpdate = true;
  };
  const totalChars = CODE.join(" ").length;

  /* data beam from laptop to the PC */
  group.updateMatrixWorld(true);
  const start = group.localToWorld(new THREE.Vector3(-0.2, 1.15, 0.95));
  const end = new THREE.Vector3(0.45, -0.35, 0.35);
  const mid = new THREE.Vector3((start.x + end.x) / 2, Math.max(start.y, end.y) + 0.55, (start.z + end.z) / 2 + 0.2);
  const curve = new THREE.CatmullRomCurve3([start, mid, end]);
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xd6b26a, toneMapped: false });
  const dots = Array.from({ length: 10 }, () => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), dotMat); scene.add(m); return m; });
  const trail = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.008, 6), new THREE.MeshBasicMaterial({ color: 0xd6b26a, transparent: true, opacity: 0.35, toneMapped: false }));
  scene.add(trail);

  /* look-at-PC yaw for the head */
  const toPc = new THREE.Vector3(-X0, 0, -Z0).applyAxisAngle(UP, -R);
  const pcYaw = Math.atan2(toPc.x, toPc.z);

  const tmp = new THREE.Vector3();
  function update(t, camera, narrow) {
    const show = !narrow;
    group.visible = bubble.visible = trail.visible = show;
    dots.forEach((d) => { d.visible = show; });
    if (!show) return;

    // head: mostly on the screen, now and then a glance at the PC
    const glance = THREE.MathUtils.smoothstep(Math.sin(t * 0.45), 0.55, 0.85);
    head.rotation.y += ((pcYaw * 0.8 * glance) - head.rotation.y) * 0.08;
    head.rotation.x = 0.1 + Math.sin(t * 1.3) * 0.015;

    // typing
    for (let i = 0; i < 2; i++) {
      const h = handBase[i].clone();
      h.y += Math.max(0, Math.sin(t * 15 + i * 2.1)) * 0.018;
      h.z += Math.sin(t * 7 + i) * 0.012;
      hands[i].position.copy(h);
      setLimb(fore[i], elbows[i], h);
    }
    torso.position.y = 0.97 + Math.sin(t * 1.6) * 0.004;

    // bubble: floats above the laptop, always faces the camera, types out the code
    tmp.set(0.1, 2.55, 0.5); group.localToWorld(tmp);
    bubble.position.copy(tmp).y += Math.sin(t * 1.1) * 0.03;
    bubble.quaternion.copy(camera.quaternion);
    const chars = Math.floor((t * 14) % (totalChars + 28));
    const c2 = Math.min(chars, totalChars);
    if (c2 !== lastChars || c2 === totalChars) { lastChars = c2; drawBubble(c2); }

    // beam dots
    dots.forEach((d, i) => {
      const u = (i / dots.length + t * 0.22) % 1;
      curve.getPoint(u, d.position);
      d.scale.setScalar(0.6 + Math.sin(u * Math.PI) * 0.9);
    });
    dotMat.color.setHSL(0.11 + 0.05 * Math.sin(t * 0.8), 0.6, 0.62);
  }
  update(0, { quaternion: new THREE.Quaternion() }, false);
  return { group, update };
}