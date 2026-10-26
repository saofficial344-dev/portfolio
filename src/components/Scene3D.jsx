import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { buildDev } from "./DevAvatar.js";

/* ---------- helpers ---------- */
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x) => x * x * (3 - 2 * x);
const lerp = (a, b, t) => a + (b - a) * t;

// camera + explode keyframes along scroll progress (0..1)
const KEYS = [
  { p: 0.0,  az: 0.62,  el: 0.16, r: 10.5, ty: 0.0,   e: 0 },
  { p: 0.2,  az: 0.4,   el: 0.14, r: 10.0, ty: 0.0,   e: 0 },
  { p: 0.46, az: -0.22, el: 0.22, r: 12.2, ty: 0.0,   e: 1 },
  { p: 0.7,  az: -0.62, el: 0.06, r: 8.6,  ty: -0.35, e: 1 },
  { p: 0.88, az: 0.12,  el: 0.12, r: 11.5, ty: 0.0,   e: 0.3 },
  { p: 1.0,  az: 0.3,   el: 0.14, r: 11.5, ty: 0.0,   e: 0 },
];
function sampleKeys(p) {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i], b = KEYS[i + 1];
    if (p <= b.p) {
      const t = smooth(clamp01((p - a.p) / (b.p - a.p)));
      return {
        az: lerp(a.az, b.az, t), el: lerp(a.el, b.el, t), r: lerp(a.r, b.r, t),
        ty: lerp(a.ty, b.ty, t), e: lerp(a.e, b.e, t),
      };
    }
  }
  const l = KEYS[KEYS.length - 1];
  return { az: l.az, el: l.el, r: l.r, ty: l.ty, e: l.e };
}

function pcbTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const g = c.getContext("2d");
  g.fillStyle = "#10131f";
  g.fillRect(0, 0, 512, 512);
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  g.lineCap = "round";
  for (let i = 0; i < 70; i++) {
    g.strokeStyle = i % 5 === 0 ? "#3a4a9a" : "#222c55";
    g.lineWidth = i % 5 === 0 ? 3 : 1.6;
    let x = rnd() * 512, y = rnd() * 512;
    g.beginPath();
    g.moveTo(x, y);
    for (let s = 0; s < 4; s++) {
      if (rnd() > 0.5) x += (rnd() - 0.5) * 220; else y += (rnd() - 0.5) * 220;
      g.lineTo(x, y);
    }
    g.stroke();
    g.fillStyle = "#5568c9";
    g.beginPath(); g.arc(x, y, 3, 0, 7); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function blobTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(0,0,0,0.55)");
  gr.addColorStop(0.55, "rgba(0,0,0,0.18)");
  gr.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = gr;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

/* ---------- the PC ---------- */
function buildPC(scene) {
  const W = 2.4, H = 2.9, D = 1.15;
  const root = new THREE.Group();
  scene.add(root);

  const ledMats = []; // MeshBasicMaterials whose hue we animate
  const makeLed = (phase) => {
    const m = new THREE.MeshBasicMaterial({ color: 0x6677ff, toneMapped: false });
    m.userData.phase = phase;
    ledMats.push(m);
    return m;
  };

  const graphite = new THREE.MeshStandardMaterial({ color: 0x1b1f31, metalness: 0.75, roughness: 0.32 });
  const matte = new THREE.MeshStandardMaterial({ color: 0x0d1019, metalness: 0.3, roughness: 0.65 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x9aa3bd, metalness: 0.95, roughness: 0.22 });
  const white = new THREE.MeshStandardMaterial({ color: 0xeceff8, metalness: 0.0, roughness: 0.85 });
  const bladeMat = new THREE.MeshStandardMaterial({ color: 0x151826, metalness: 0.5, roughness: 0.4, side: THREE.DoubleSide });

  const parts = {}; // name -> { group, base, dir }
  const fans = [];
  const part = (name, dir) => {
    const group = new THREE.Group();
    root.add(group);
    parts[name] = { group, base: new THREE.Vector3(), dir: new THREE.Vector3(...dir) };
    return group;
  };
  const rbox = (w, h, d, mat, r = 0.03) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, r), mat);

  function makeFan(radius, phase) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.TorusGeometry(radius, radius * 0.07, 10, 56), makeLed(phase)));
    const rot = new THREE.Group();
    g.add(rot);
    const bladeGeo = new THREE.BoxGeometry(radius * 0.78, radius * 0.34, 0.012);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const b = new THREE.Mesh(bladeGeo, bladeMat);
      b.position.set(Math.cos(a) * radius * 0.52, Math.sin(a) * radius * 0.52, 0);
      b.rotation.z = a;
      b.rotateX(0.55);
      rot.add(b);
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.24, radius * 0.24, 0.035, 28), graphite);
    hub.rotation.x = Math.PI / 2;
    rot.add(hub);
    const cap = new THREE.Mesh(new THREE.CircleGeometry(radius * 0.13, 20), makeLed(phase + 0.5));
    cap.position.z = 0.02;
    rot.add(cap);
    fans.push({ rot, speed: 5 + phase });
    return g;
  }

  /* case shell (never explodes) */
  const shell = part("case", [0, 0, 0]);
  const back = rbox(W, H, 0.06, graphite, 0.02); back.position.z = -D / 2; shell.add(back);
  const top = rbox(W, 0.08, D, graphite, 0.03); top.position.y = H / 2; shell.add(top);
  const bottom = rbox(W, 0.08, D, graphite, 0.03); bottom.position.y = -H / 2; shell.add(bottom);
  const left = rbox(0.06, H, D, graphite, 0.02); left.position.x = -W / 2; shell.add(left);
  const right = rbox(0.06, H, D, graphite, 0.02); right.position.x = W / 2; shell.add(right);
  [[-0.9, 0], [0.9, 0]].forEach(([x]) => {
    const foot = rbox(0.4, 0.1, 0.5, matte, 0.03);
    foot.position.set(x, -H / 2 - 0.09, 0);
    shell.add(foot);
  });
  // light strip around the glass opening
  const trim = makeLed(0);
  [[W, 0.025, 0, H / 2 - 0.03], [W, 0.025, 0, -H / 2 + 0.03]].forEach(([w, h, x, y]) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w - 0.1, h, 0.02), trim);
    m.position.set(x, y, D / 2 + 0.005);
    shell.add(m);
  });
  [[-1], [1]].forEach(([s]) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.025, H - 0.1, 0.02), trim);
    m.position.set(s * (W / 2 - 0.03), 0, D / 2 + 0.005);
    shell.add(m);
  });

  /* glass front */
  const glass = part("glass", [0.7, 0.55, 3.2]);
  const glassMesh = new THREE.Mesh(
    new THREE.BoxGeometry(W - 0.04, H - 0.04, 0.03),
    new THREE.MeshPhysicalMaterial({
      color: 0xa9b8ff, transparent: true, opacity: 0.13, roughness: 0.04, metalness: 0,
      envMapIntensity: 1.6, depthWrite: false, side: THREE.DoubleSide,
    })
  );
  glassMesh.position.z = D / 2;
  glass.add(glassMesh);

  /* motherboard */
  const board = part("board", [0, 0, -0.9]);
  const bMat = new THREE.MeshStandardMaterial({ map: pcbTexture(), metalness: 0.4, roughness: 0.55 });
  const pcb = rbox(1.9, 2.2, 0.04, bMat, 0.01);
  pcb.position.set(0.1, 0.25, -0.5);
  board.add(pcb);
  const vrmL = rbox(0.2, 1.1, 0.12, graphite, 0.03); vrmL.position.set(-0.68, 0.5, -0.42); board.add(vrmL);
  const vrmT = rbox(1.0, 0.18, 0.12, graphite, 0.03); vrmT.position.set(0.1, 1.22, -0.42); board.add(vrmT);
  const vrmLine = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.0, 0.01), makeLed(0.3)); vrmLine.position.set(-0.6, 0.5, -0.355); board.add(vrmLine);
  const chip = rbox(0.5, 0.36, 0.1, steel, 0.03); chip.position.set(0.55, -0.7, -0.44); board.add(chip);
  const m2 = rbox(0.9, 0.07, 0.02, steel, 0.01); m2.position.set(0.0, -0.78, -0.47); board.add(m2);

  /* CPU cooler */
  const cooler = part("cooler", [-0.15, 1.0, 1.55]);
  const cBody = rbox(0.8, 0.8, 0.44, steel, 0.06); cBody.position.set(0.1, 0.75, -0.26); cooler.add(cBody);
  const fins = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 0.76, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x20253a, metalness: 0.8, roughness: 0.35 })
  );
  fins.position.set(0.1, 0.75, -0.035); cooler.add(fins);
  const cFan = makeFan(0.34, 0.1); cFan.position.set(0.1, 0.75, 0.0); cooler.add(cFan);

  /* RAM sticks */
  const ram = new THREE.Group();
  root.add(ram);
  parts.ram = { group: ram, base: new THREE.Vector3(), dir: new THREE.Vector3(0.9, 0.9, 1.3) };
  for (let i = 0; i < 4; i++) {
    const s = new THREE.Group();
    const body = rbox(0.09, 0.95, 0.05, graphite, 0.015);
    s.add(body);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.14, 0.056), makeLed(i * 0.35));
    strip.position.y = 0.4;
    s.add(strip);
    const label = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.5, 0.054), steel);
    label.position.y = -0.1;
    s.add(label);
    s.position.set(0.66 + i * 0.13, 0.72, -0.4);
    ram.add(s);
  }

  /* GPU */
  const gpu = part("gpu", [0.05, -0.75, 2.0]);
  const gBody = rbox(1.95, 0.62, 0.16, graphite, 0.06); gBody.position.set(0.05, -0.3, 0.12); gpu.add(gBody);
  const gLine = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.02, 0.01), makeLed(0.6));
  gLine.position.set(0.05, -0.02, 0.2); gpu.add(gLine);
  [-0.62, 0.03, 0.68].forEach((x, i) => {
    const f = makeFan(0.235, 0.7 + i * 0.25);
    f.position.set(x, -0.3, 0.205);
    gpu.add(f);
  });

  /* PSU */
  const psu = part("psu", [0, -1.15, 0.35]);
  const psuBody = rbox(W - 0.18, 0.5, D - 0.2, matte, 0.04); psuBody.position.set(0, -1.17, 0); psu.add(psuBody);
  const psuLine = new THREE.Mesh(new THREE.BoxGeometry(W - 0.5, 0.02, 0.01), makeLed(0.9)); psuLine.position.set(0, -0.95, D / 2 - 0.09); psu.add(psuLine);

  /* sleeved cables */
  const cables = part("cables", [-0.9, 0.0, 1.0]);
  [0, 1, 2].forEach((i) => {
    const o = i * 0.055;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.55 + o, -0.95, 0.0),
      new THREE.Vector3(-0.98 + o, -0.3, -0.2),
      new THREE.Vector3(-0.98 + o, 0.6, -0.35),
      new THREE.Vector3(-0.6 + o, 1.28, -0.4),
    ]);
    cables.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.022, 8), white));
  });

  Object.values(parts).forEach((p) => p.base.copy(p.group.position));

  // anchors for the DOM labels
  const anchors = {
    gpu: new THREE.Object3D(), cooler: new THREE.Object3D(), ram: new THREE.Object3D(),
    psu: new THREE.Object3D(), board: new THREE.Object3D(),
  };
  anchors.gpu.position.set(0.7, -0.3, 0.22); parts.gpu.group.add(anchors.gpu);
  anchors.cooler.position.set(0.1, 1.05, 0.0); parts.cooler.group.add(anchors.cooler);
  anchors.ram.position.set(0.95, 1.1, -0.4); parts.ram.group.add(anchors.ram);
  anchors.psu.position.set(-0.8, -1.17, D / 2 - 0.1); parts.psu.group.add(anchors.psu);
  anchors.board.position.set(-0.7, 1.25, -0.42); parts.board.group.add(anchors.board);

  const lights = [];
  const ledLight = (x, y, z) => {
    const l = new THREE.PointLight(0x6677ff, 3, 4.5, 2);
    l.position.set(x, y, z);
    root.add(l);
    lights.push(l);
  };
  ledLight(0.1, -0.2, 0.5);
  ledLight(0.9, 0.9, 0.1);

  return { root, parts, fans, ledMats, anchors, lights, H };
}

/* ---------- component ---------- */
export default function Scene3D({ progressRef, labelEls, theme, onFail }) {
  const mountRef = useRef(null);
  const apiRef = useRef({});

  // theme changes just retune lighting
  useEffect(() => {
    apiRef.current.setTheme?.(theme);
  }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (e) {
      onFail?.();
      return;
    }
    const mobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);

    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rimA = new THREE.PointLight(0x8fa3ff, 25, 14, 2); rimA.position.set(-4, 1.5, -2); scene.add(rimA);
    const rimB = new THREE.PointLight(0xffc97a, 18, 14, 2); rimB.position.set(4.5, -0.5, -2.5); scene.add(rimB);

    const pc = buildPC(scene);
    const dev = buildDev(scene, pc.H);

    // contact shadow + stage rings
    const blob = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 4),
      new THREE.MeshBasicMaterial({ map: blobTexture(), transparent: true, depthWrite: false })
    );
    blob.rotation.x = -Math.PI / 2;
    blob.position.y = -pc.H / 2 - 0.2;
    scene.add(blob);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x4b5bff, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
    [2.7, 3.6].forEach((r) => {
      const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.012, 96), ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -pc.H / 2 - 0.19;
      scene.add(ring);
    });

    // dust
    const N = mobile ? 60 : 140;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0x4b5bff, size: 0.035, transparent: true, opacity: 0.5, depthWrite: false });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    apiRef.current.setTheme = (t) => {
      const dark = t === "dark";
      apiRef.current.dark = dark;
      scene.environmentIntensity = dark ? 0.32 : 0.9;
      key.intensity = dark ? 1.1 : 1.5;
      rimA.intensity = dark ? 38 : 16;
      rimB.intensity = dark ? 28 : 12;
      const c = dark ? 0xd6b26a : 0x142452;
      ringMat.color.setHex(c);
      dustMat.color.setHex(c);
      blob.material.opacity = dark ? 0.8 : 1;
    };
    apiRef.current.setTheme(theme);

    /* sizing */
    let w = 1, h = 1;
    const resize = () => {
      const r = mount.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const narrow = w < 820;
      // push the machine to the right on wide screens, up on narrow ones
      camera.setViewOffset(w, h, narrow ? 0 : -w * 0.2, narrow ? h * 0.16 : 0, w, h);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(mount);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const v = new THREE.Vector3();
    const tgt = new THREE.Vector3();
    const clock = new THREE.Clock();
    let cur = progressRef.current || 0;
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) { clock.getDelta(); return; }
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      cur += ((progressRef.current || 0) - cur) * (1 - Math.exp(-dt * 6));
      const k = sampleKeys(cur);
      mouse.x += (mouse.tx - mouse.x) * (1 - Math.exp(-dt * 4));
      mouse.y += (mouse.ty - mouse.y) * (1 - Math.exp(-dt * 4));

      const narrow = w < 820;
      const az = k.az + mouse.x * 0.14 + (reduce ? 0 : Math.sin(t * 0.35) * 0.04);
      const el = k.el - mouse.y * 0.05;
      const r = k.r * (narrow ? 1.45 : 1);
      tgt.set(0, k.ty, 0);
      camera.position.set(
        tgt.x + r * Math.cos(el) * Math.sin(az),
        tgt.y + r * Math.sin(el),
        tgt.z + r * Math.cos(el) * Math.cos(az)
      );
      camera.lookAt(tgt);

      // exploded view
      const e = smooth(clamp01(k.e));
      Object.values(pc.parts).forEach((p) => {
        p.group.position.copy(p.base).addScaledVector(p.dir, e);
      });
      pc.parts.glass.group.rotation.y = e * 0.35;
      pc.parts.glass.group.rotation.x = -e * 0.12;
      pc.root.rotation.y = reduce ? 0 : Math.sin(t * 0.25) * 0.05;
      blob.scale.setScalar(1 + e * 0.35);
      blob.material.opacity = (apiRef.current.dark ? 0.8 : 1) * (1 - e * 0.35);

      // RGB
      pc.ledMats.forEach((m) => {
        const hue = 0.62 + 0.36 * (0.5 + 0.5 * Math.sin(t * 0.45 + m.userData.phase * 6.0));
        m.color.setHSL(hue % 1, 0.85, 0.6);
      });
      const hueL = 0.62 + 0.36 * (0.5 + 0.5 * Math.sin(t * 0.45));
      pc.lights.forEach((l, i) => l.color.setHSL((hueL + i * 0.12) % 1, 0.9, 0.55));
      pc.fans.forEach((f) => { f.rot.rotation.z -= dt * f.speed; });
      dev.update(t, camera, narrow);
      dust.rotation.y = t * 0.02;
      dust.position.y = Math.sin(t * 0.3) * 0.1;

      renderer.render(scene, camera);

      // pin DOM labels to parts
      if (labelEls?.current) {
        camera.updateMatrixWorld();
        for (const id in pc.anchors) {
          const el2 = labelEls.current[id];
          if (!el2) continue;
          pc.anchors[id].getWorldPosition(v);
          v.project(camera);
          const x = (v.x * 0.5 + 0.5) * w;
          const y = (-v.y * 0.5 + 0.5) * h;
          el2.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        }
      }
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          const ms = Array.isArray(o.material) ? o.material : [o.material];
          ms.forEach((m) => { m.map?.dispose?.(); m.dispose(); });
        }
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss?.();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}