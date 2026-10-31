import { useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import {
  ACESFilmicToneMapping,
  BufferAttribute,
  MathUtils,
  SRGBColorSpace,
  TextureLoader,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type MeshStandardMaterial,
  type Points,
  type Texture,
} from "three";
import type { StageMode } from "./ProductStage.tsx";

const HERO_URLS = [
  "/img/products/thumb_1767440632_8835.jpg",
  "/img/products/thumb_1767615787_8082.jpg",
  "/img/products/thumb_1765784168_2058.jpg",
  "/img/products/thumb_1767507788_6152.jpg",
];

const HERO_HOLD = 6;
const HERO_FADE = 0.9;
const FILM_FADE = 0.4;

type Slot = { url: string | null; tex: Texture | null; aspect: number };

function smoothstep(value: number) {
  const k = MathUtils.clamp(value, 0, 1);
  return k * k * (3 - 2 * k);
}

function aspectOf(tex: Texture) {
  const image = tex.image as { width?: number; height?: number } | undefined;
  if (!image?.width || !image?.height) return 1;
  return image.width / image.height;
}

function prepareTexture(tex: Texture) {
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function Lights({ endSign }: { endSign: number }) {
  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight position={[2.7 * endSign, 3.5, 2.5]} intensity={2.35} color="#f4f7fb" />
      <directionalLight position={[-3.2 * endSign, 1.5, -1.1]} intensity={1.85} color="#1493b8" />
      <directionalLight position={[0.2 * endSign, 0.3, 3.6]} intensity={0.32} color="#c5d4e4" />
    </>
  );
}

function CameraDrift({ mode, wide, endSign }: { mode: StageMode; wide: boolean; endSign: number }) {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const shift = mode === "hero" && wide ? endSign * 0.22 : 0;
    state.camera.position.x = shift + Math.sin(t * 0.12) * 0.12;
    state.camera.position.y = 0.08 + Math.sin(t * 0.09) * 0.035;
    state.camera.position.z = 4.9;
    state.camera.lookAt(shift * 0.35, -0.02, 0);
  });
  return null;
}

function Floor({ endSign }: { endSign: number }) {
  const disc = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);
  useFrame((state) => {
    const vp = state.viewport;
    const y = -vp.height * 0.34;
    const scale = Math.max(vp.width * 0.34, 1.7);
    const x = endSign * Math.min(vp.width * 0.06, 0.45);
    if (disc.current) {
      disc.current.position.set(x, y, 0.15);
      disc.current.scale.setScalar(scale);
    }
    if (ring.current) {
      ring.current.position.set(x, y + 0.012, 0.15);
      ring.current.scale.setScalar(scale * 0.72);
    }
  });
  return (
    <>
      <mesh ref={disc} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 80]} />
        <meshStandardMaterial color="#1a2744" metalness={0.78} roughness={0.32} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1, 80]} />
        <meshBasicMaterial color="#1493b8" transparent opacity={0.55} toneMapped={false} />
      </mesh>
    </>
  );
}

function FoundrySet({ endSign }: { endSign: number }) {
  const root = useRef<Group>(null);
  const tank = useRef<Group>(null);
  const pipes = useRef<Group>(null);
  const drum = useRef<Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const vp = state.viewport;
    const end = endSign;
    if (root.current) {
      root.current.position.y = -vp.height * 0.06;
      root.current.position.z = -0.35;
    }
    if (tank.current) {
      tank.current.position.set(end * vp.width * 0.34, 0.12, -0.48);
      tank.current.rotation.y = t * 0.14;
    }
    if (pipes.current) {
      pipes.current.position.set(end * vp.width * 0.44, -0.02, -0.12);
      pipes.current.rotation.y = t * 0.1 + 0.6;
    }
    if (drum.current) {
      drum.current.position.set(end * vp.width * 0.24, 0.04, -0.42);
      drum.current.rotation.y = -t * 0.11;
    }
  });

  const pipeOffsets: [number, number, number, number][] = [
    [0, 0.42, 0, 0.18],
    [0.16, 0.36, 0.06, -0.22],
    [-0.15, 0.34, 0.04, 0.46],
    [0.06, 0.4, -0.1, 0.84],
    [-0.04, 0.3, -0.12, -0.5],
  ];

  return (
    <group ref={root} position={[0, -0.2, -0.4]}>
      <group ref={tank}>
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.42, 0.5, 1.24, 28]} />
          <meshStandardMaterial color="#e7eef4" emissive="#d5dee8" emissiveIntensity={0.16} roughness={0.46} metalness={0.06} />
        </mesh>
        <mesh position={[0, 1.24, 0]}>
          <sphereGeometry args={[0.42, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#f2f6fa" emissive="#e7eef4" emissiveIntensity={0.14} roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[0, 1.34, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.1, 20]} />
          <meshStandardMaterial color="#161b2c" roughness={0.38} metalness={0.22} />
        </mesh>
      </group>
      <group ref={pipes} position={[0, 0, -0.15]}>
        {pipeOffsets.map(([x, y, z, tilt], pipeIndex) => (
          <mesh key={pipeIndex} position={[x, y, z]} rotation={[0.08, 0, tilt]}>
            <cylinderGeometry args={[0.075, 0.075, 1.05, 12]} />
            <meshStandardMaterial color="#3dbe4a" emissive="#3dbe4a" emissiveIntensity={0.22} roughness={0.36} metalness={0.08} />
          </mesh>
        ))}
      </group>
      <group ref={drum} position={[0, 0, -0.7]}>
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.76, 28]} />
          <meshStandardMaterial color="#1d4ed8" emissive="#1d4ed8" emissiveIntensity={0.28} roughness={0.34} metalness={0.16} />
        </mesh>
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.06, 28]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.34} metalness={0.18} />
        </mesh>
        <mesh position={[-0.12, 0.84, 0.05]}>
          <cylinderGeometry args={[0.04, 0.04, 0.035, 12]} />
          <meshStandardMaterial color="#e8eef4" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[0.12, 0.84, 0.05]}>
          <cylinderGeometry args={[0.04, 0.04, 0.035, 12]} />
          <meshStandardMaterial color="#e8eef4" roughness={0.4} metalness={0.05} />
        </mesh>
      </group>
    </group>
  );
}

function AquaMotes() {
  const ref = useRef<Points>(null);
  const count = 72;

  useLayoutEffect(() => {
    const geometry = ref.current?.geometry;
    if (!geometry) return;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 6.4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
      positions[i * 3 + 2] = -0.5 - Math.random() * 2.3;
    }
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
  }, []);

  useFrame((_, delta) => {
    const geometry = ref.current?.geometry;
    const attr = geometry?.getAttribute("position") as BufferAttribute | undefined;
    if (!attr) return;
    const step = Math.min(delta, 0.05);
    for (let i = 0; i < count; i += 1) {
      let y = attr.getY(i) + (0.07 + (i % 5) * 0.02) * step;
      if (y > 1.85) y = -1.7;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry />
      <pointsMaterial color="#1493b8" size={0.028} transparent opacity={0.62} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function PhotoRig({
  mode,
  image,
  wide,
  endSign,
  onReady,
}: {
  mode: StageMode;
  image?: string;
  wide: boolean;
  endSign: number;
  onReady: () => void;
}) {
  const rig = useRef<Group>(null);
  const groupA = useRef<Group>(null);
  const groupB = useRef<Group>(null);
  const matA = useRef<MeshBasicMaterial>(null);
  const matB = useRef<MeshBasicMaterial>(null);
  const slabA = useRef<Mesh>(null);
  const slabB = useRef<Mesh>(null);
  const slabMatA = useRef<MeshStandardMaterial>(null);
  const slabMatB = useRef<MeshStandardMaterial>(null);
  const slots = useRef<[Slot, Slot]>([
    { url: null, tex: null, aspect: 1 },
    { url: null, tex: null, aspect: 1 },
  ]);
  const heroCache = useRef(new Map<string, Promise<Texture>>());
  const front = useRef<0 | 1>(0);
  const index = useRef(0);
  const phase = useRef<"hold" | "fade">("hold");
  const elapsed = useRef(0);
  const fadeT = useRef(0);
  const fadeDur = useRef(HERO_FADE);
  const intro = useRef(0);
  const booted = useRef(false);
  const dragYaw = useRef(0);
  const dragging = useRef(false);
  const modeRef = useRef(mode);
  const wideRef = useRef(wide);
  const endRef = useRef(endSign);
  const onReadyRef = useRef(onReady);
  const filmOwned = useRef(new Set<Texture>());
  modeRef.current = mode;
  wideRef.current = wide;
  endRef.current = endSign;
  onReadyRef.current = onReady;

  const gl = useThree((state) => state.gl);

  function markReady() {
    if (booted.current) return;
    booted.current = true;
    onReadyRef.current();
  }

  function textureFor(url: string) {
    const cached = heroCache.current.get(url);
    if (cached) return cached;
    const pending = new Promise<Texture>((resolve, reject) => {
      new TextureLoader().load(
        url,
        (tex) => resolve(prepareTexture(tex)),
        undefined,
        () => {
          heroCache.current.delete(url);
          reject(new Error(url));
        },
      );
    });
    heroCache.current.set(url, pending);
    return pending;
  }

  function assign(plane: 0 | 1, tex: Texture, url: string, disposePrev: boolean) {
    const slot = slots.current[plane];
    if (disposePrev && slot.tex && slot.tex !== tex) {
      filmOwned.current.delete(slot.tex);
      slot.tex.dispose();
    }
    slot.tex = tex;
    slot.url = url;
    slot.aspect = aspectOf(tex);
    if (disposePrev) filmOwned.current.add(tex);
    const mat = plane === 0 ? matA.current : matB.current;
    if (mat) {
      mat.map = tex;
      mat.needsUpdate = true;
    }
  }

  function setOp(plane: 0 | 1, value: number) {
    const photo = plane === 0 ? matA.current : matB.current;
    const slab = plane === 0 ? slabMatA.current : slabMatB.current;
    if (photo) {
      photo.opacity = value;
      photo.depthWrite = value > 0.9;
    }
    if (slab) {
      slab.opacity = value;
      slab.depthWrite = value > 0.9;
    }
  }

  useEffect(() => {
    const cache = heroCache.current;
    const owned = filmOwned.current;
    return () => {
      cache.forEach((pending) => {
        pending.then((tex) => tex.dispose()).catch(() => undefined);
      });
      cache.clear();
      owned.forEach((tex) => tex.dispose());
      owned.clear();
    };
  }, []);

  useEffect(() => {
    if (mode !== "hero") return;
    let dead = false;
    HERO_URLS.forEach((url, i) => {
      textureFor(url)
        .then((tex) => {
          if (dead) return;
          if (i === 0 || i === 1) assign(i as 0 | 1, tex, url, false);
          if (i === 0) markReady();
        })
        .catch(() => {
          if (!dead) markReady();
        });
    });
    return () => {
      dead = true;
    };
    // Texture helpers are stable via refs; this preload runs once per mode.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if (mode === "hero" || !image) return;
    let dead = false;
    const pending = new Promise<Texture>((resolve, reject) => {
      new TextureLoader().load(
        image,
        (tex) => resolve(prepareTexture(tex)),
        undefined,
        () => reject(new Error(image)),
      );
    });
    pending
      .then((tex) => {
        if (dead) {
          tex.dispose();
          return;
        }
        const frontI = front.current;
        const current = slots.current[frontI];
        if (!current.tex) {
          assign(frontI, tex, image, true);
          markReady();
          return;
        }
        if (current.url === image) {
          tex.dispose();
          return;
        }
        phase.current = "hold";
        const backI = (1 - frontI) as 0 | 1;
        assign(backI, tex, image, true);
        phase.current = "fade";
        fadeT.current = 0;
        fadeDur.current = FILM_FADE;
      })
      .catch(() => {
        if (!dead) markReady();
      });
    return () => {
      dead = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, image]);

  useEffect(() => {
    if (mode !== "product") return;
    const el = gl.domElement;
    let x = 0;
    const down = (event: PointerEvent) => {
      dragging.current = true;
      x = event.clientX;
      el.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!dragging.current) return;
      const dx = event.clientX - x;
      x = event.clientX;
      const max = MathUtils.degToRad(30);
      dragYaw.current = MathUtils.clamp(dragYaw.current + dx * 0.0055, -max, max);
    };
    const up = (event: PointerEvent) => {
      dragging.current = false;
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl, mode]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (booted.current) intro.current = Math.min(1, intro.current + dt / 0.7);
    const introE = smoothstep(intro.current);
    const currentMode = modeRef.current;

    if (currentMode === "hero" && phase.current === "hold") {
      elapsed.current += dt;
      const back = (1 - front.current) as 0 | 1;
      const nextUrl = HERO_URLS[(index.current + 1) % HERO_URLS.length];
      const backSlot = slots.current[back];
      if (elapsed.current >= HERO_HOLD && backSlot.tex && backSlot.url === nextUrl) {
        phase.current = "fade";
        fadeT.current = 0;
        fadeDur.current = HERO_FADE;
      }
    }

    if (phase.current === "fade") {
      fadeT.current += dt;
      const k = smoothstep(fadeT.current / fadeDur.current);
      const frontI = front.current;
      const backI = (1 - frontI) as 0 | 1;
      setOp(frontI, (1 - k) * introE);
      setOp(backI, k * introE);
      if (fadeT.current >= fadeDur.current) {
        if (currentMode === "hero") index.current = (index.current + 1) % HERO_URLS.length;
        front.current = (1 - front.current) as 0 | 1;
        phase.current = "hold";
        elapsed.current = 0;
        setOp(front.current, introE);
        setOp((1 - front.current) as 0 | 1, 0);
        if (currentMode === "hero") {
          const nextUrl = HERO_URLS[(index.current + 1) % HERO_URLS.length];
          const cached = heroCache.current.get(nextUrl);
          const backI = (1 - front.current) as 0 | 1;
          cached?.then((tex) => assign(backI, tex, nextUrl, false)).catch(() => undefined);
        }
      }
    } else {
      setOp(front.current, introE);
      setOp((1 - front.current) as 0 | 1, 0);
    }

    const vp = state.viewport;
    const heroWide = currentMode === "hero" && wideRef.current;
    const fit = (aspect: number) => {
      const safe = Math.max(aspect, 0.01);
      if (heroWide) {
        let w = vp.width * 0.28;
        let h = w / safe;
        const maxH = vp.height * 0.58;
        if (h > maxH) {
          h = maxH;
          w = h * safe;
        }
        return { w, h };
      }
      let h = vp.height * 0.46;
      let w = h * safe;
      const maxW = vp.width * 0.5;
      if (w > maxW) {
        w = maxW;
        h = w / safe;
      }
      return { w, h };
    };
    const place = (group: Group | null, slab: Mesh | null, size: { w: number; h: number }) => {
      group?.scale.set(size.w, size.h, 1);
      if (!slab) return;
      const depth = size.h * 0.06;
      slab.scale.set(1, 1, depth);
      slab.position.z = -depth / 2;
    };
    place(groupA.current, slabA.current, fit(slots.current[0].aspect));
    place(groupB.current, slabB.current, fit(slots.current[1].aspect));

    const t = state.clock.elapsedTime;
    const rest = endRef.current * 0.42;
    const drift = Math.sin(t * 0.33) * MathUtils.degToRad(8);
    let extra = drift;
    if (currentMode === "product") {
      if (!dragging.current) dragYaw.current = MathUtils.damp(dragYaw.current, 0, 2.6, dt);
      const idle = dragging.current ? 0 : 1 - Math.min(1, Math.abs(dragYaw.current) / MathUtils.degToRad(12));
      extra = dragYaw.current + drift * idle;
    }
    const yaw = MathUtils.clamp(rest + extra, -1.05, 1.05);
    if (rig.current) {
      rig.current.rotation.y = yaw;
      rig.current.position.y = 0.16;
      rig.current.position.x = heroWide ? endRef.current * Math.min(vp.width * 0.06, 0.5) : 0;
    }
  });

  return (
    <group ref={rig}>
      <Float speed={1.35} rotationIntensity={0} floatIntensity={1} floatingRange={[-0.04, 0.04]} autoInvalidate={false}>
        <group ref={groupA}>
          <mesh ref={slabA}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial ref={slabMatA} color="#243049" roughness={0.42} metalness={0.28} transparent opacity={0} />
          </mesh>
          <mesh position={[0, 0, 0.004]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial ref={matA} transparent opacity={0} toneMapped={false} depthWrite={false} />
          </mesh>
        </group>
        <group ref={groupB} position={[0, 0, -0.001]}>
          <mesh ref={slabB}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial ref={slabMatB} color="#243049" roughness={0.42} metalness={0.28} transparent opacity={0} />
          </mesh>
          <mesh position={[0, 0, 0.004]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial ref={matB} transparent opacity={0} toneMapped={false} depthWrite={false} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function StudioCanvas({
  mode,
  image,
  active,
  wide,
  endSign,
  onReady,
}: {
  mode: StageMode;
  image?: string;
  active: boolean;
  wide: boolean;
  endSign: number;
  onReady: () => void;
}) {
  return (
    <Canvas
      className="absolute inset-0 h-full w-full"
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 32, position: [0, 0.05, 4.9], near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance", stencil: false }}
      onCreated={({ gl }) => {
        gl.setClearColor("#070b16");
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.outputColorSpace = SRGBColorSpace;
      }}
    >
      <color attach="background" args={["#070b16"]} />
      <fog attach="fog" args={["#070b16", 8.5, 18]} />
      <Lights endSign={endSign} />
      <CameraDrift mode={mode} wide={wide} endSign={endSign} />
      <Floor endSign={endSign} />
      <FoundrySet endSign={endSign} />
      <AquaMotes />
      <PhotoRig mode={mode} image={image} wide={wide} endSign={endSign} onReady={onReady} />
    </Canvas>
  );
}
