import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'; // Import types for development
/**
 * High-Fidelity Volumetric 3D Q-Emblem Chassis Engine
 * Features:
 * - Floating Constellation Framework: Added clearance gap between the Q-logo and inner tech elements
 * - Thick Structural 3D Rod Connectors (Volumetric cylinders)
 * - Midpoint Alignment: All framework elements perfectly balanced at the model's Z-center
 * - 10:8.5 Fine-Tuned Aspect Ratio (Height: 10, Width: 8.5)
 * - Unified Deep Royal Blue Pigment Core with Navy shadows, Electric Blue mid-tones,
 *   Bright Blue highlights, and a soft white-blue specular tint
 */
export function QEmblem({ height = 500 }: { height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Enforce precise 10:8.5 fine-tuned scale ratio metrics
  const width = Math.round((height * 8.5) / 10);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    let THREE: any;
    let renderer: any;
    let scene: any;
    let camera: any;
    let mainGroup: any;
    let energyRingsGroup: any;
    let animationFrameId: number;

    // Dynamically import Three.js to guarantee flawless Vite/NextJS SSR execution
    import("three").then((ThreeModule) => {
      THREE = ThreeModule;

      // 1. Scene & Canvas Initialization
      scene = new THREE.Scene();
      
      const forcedAspect = width / height;
      camera = new THREE.PerspectiveCamera(40, forcedAspect, 0.1, 1000);
      // Look straight at the center of the Q emblem; pulled back far enough
      // that the (now smaller) base pedestal below it still stays in frame.
      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);
      camera.aspect = forcedAspect;
      camera.updateProjectionMatrix();

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height, true);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      // Filmic tone mapping + a touch of exposure so the metallic material reads
      // punchy and bright instead of flat/dull, while output stays in the correct
      // (sRGB) color space for accurate on-screen brightness.
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      if ("outputColorSpace" in renderer) {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      } else if ("outputEncoding" in renderer) {
        // Fallback for older three.js versions
        (renderer as any).outputEncoding = THREE.sRGBEncoding;
      }
      
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(renderer.domElement);
      }

      // 2. High-Fidelity Studio Lighting Setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
      keyLight.position.set(5, 8, 10);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
      rimLight.position.set(-5, 5, -5);
      scene.add(rimLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
      fillLight.position.set(-5, -2, 4);
      scene.add(fillLight);

      mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // 3. Dynamic Environment Map Generation — fuller studio rig with several
      // soft-box style highlight bands so metallic surfaces catch richer,
      // brighter reflections instead of one thin streak.
      const generateEnvMap = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Base vertical gradient: brighter "sky" band through the middle,
          // darker toward the top (ceiling) and bottom (floor) — like a
          // photography studio cyclorama.
          const baseGradient = ctx.createLinearGradient(0, 0, 0, 512);
          baseGradient.addColorStop(0, "#050b1c");
          baseGradient.addColorStop(0.35, "#0d1c40");
          baseGradient.addColorStop(0.5, "#16264e");
          baseGradient.addColorStop(0.65, "#0d1c40");
          baseGradient.addColorStop(1, "#03060f");
          ctx.fillStyle = baseGradient;
          ctx.fillRect(0, 0, 1024, 512);

          // Helper to paint a soft vertical "softbox" highlight band
          const paintBand = (centerX: number, width: number, intensity: number) => {
            const band = ctx.createLinearGradient(centerX - width, 0, centerX + width, 0);
            band.addColorStop(0, "rgba(255,255,255,0)");
            band.addColorStop(0.5, `rgba(235,240,255,${intensity})`);
            band.addColorStop(1, "rgba(255,255,255,0)");
            ctx.fillStyle = band;
            ctx.fillRect(centerX - width, 0, width * 2, 512);
          };

          // Primary key-light softbox (brightest, matches key light direction)
          paintBand(512, 90, 1.0);
          // Secondary rim/fill softboxes flanking the sides for richer wraparound reflections
          paintBand(160, 55, 0.55);
          paintBand(864, 55, 0.5);
          // Subtle far-edge kicker highlights
          paintBand(40, 25, 0.3);
          paintBand(984, 25, 0.28);

          // A soft horizontal ground-bounce highlight near the lower third
          const bounce = ctx.createLinearGradient(0, 340, 0, 460);
          bounce.addColorStop(0, "rgba(180,200,255,0)");
          bounce.addColorStop(0.5, "rgba(180,200,255,0.25)");
          bounce.addColorStop(1, "rgba(180,200,255,0)");
          ctx.fillStyle = bounce;
          ctx.fillRect(0, 340, 1024, 120);
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.mapping = THREE.EquirectangularReflectionMapping;
        if ("colorSpace" in texture) {
          (texture as any).colorSpace = THREE.SRGBColorSpace;
        }
        return texture;
      };

      const envMapTexture = generateEnvMap();

      // Extrusion Global Profiles
      const extrudeSettingsQ = { depth: 0.4, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.04, bevelSegments: 4, steps: 1 };

      // Dark Brushed-Metal Physical Material Configuration
      const unifiedBlueMat = new THREE.MeshPhysicalMaterial({
        roughness: 0.16,
        metalness: 0.88,
        clearcoat: 0.5,
        clearcoatRoughness: 0.08,
        envMap: envMapTexture,
        envMapIntensity: 3.2,
        // Specular reflections: White with slight blue tint (#F4F7FF)
        specularColor: new THREE.Color(0xdfe6ff),
        specularIntensity: 0.9,
      });
      
      unifiedBlueMat.onBeforeCompile = (shader: any) => {
        shader.vertexShader = shader.vertexShader.replace(
          `#include <common>`,
          `#include <common>
            varying vec3 vPosition;
            varying vec3 vEdgeNormal;
            varying vec3 vEdgeViewDir;`
        );
        shader.vertexShader = shader.vertexShader.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
            vPosition = position;`
        );
        shader.vertexShader = shader.vertexShader.replace(
          `#include <project_vertex>`,
          `#include <project_vertex>
            vEdgeNormal = normalize( normalMatrix * normal );
            vEdgeViewDir = normalize( -mvPosition.xyz );`
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          `#include <common>`,
          `#include <common>
            varying vec3 vPosition;
            varying vec3 vEdgeNormal;
            varying vec3 vEdgeViewDir;`
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          `vec4 diffuseColor = vec4( diffuse, opacity );`,
          `
          // Reference-matched logo palette (deep royal blue chassis, navy recesses,
          // electric-blue mid, bright-blue highlight) with a chrome-silver bevel edge.
          vec3 shadowColor    = vec3(0.0392, 0.0549, 0.2039); // Deep Navy (near-black metal)
          vec3 mainColor      = vec3(0.0745, 0.1137, 0.4235); // Dark Royal Blue Metal
          vec3 midColor       = vec3(0.1255, 0.1882, 0.5647); // Steel Blue
          vec3 highlightColor = vec3(0.2431, 0.3059, 0.6863); // Muted Bright Blue Metal

          float grad = clamp((vPosition.y + 1.8) / 3.6, 0.0, 1.0);
          vec3 customBlueColor;
          if (grad < 0.33) {
            customBlueColor = mix(shadowColor, mainColor, grad / 0.33);
          } else if (grad < 0.66) {
            customBlueColor = mix(mainColor, midColor, (grad - 0.33) / 0.33);
          } else {
            customBlueColor = mix(midColor, highlightColor, (grad - 0.66) / 0.34);
          }

          // Fresnel-driven silver/white bevel rim, matching the chrome edge highlight in the reference
          float edgeFresnel = pow(1.0 - clamp(dot(normalize(vEdgeNormal), normalize(vEdgeViewDir)), 0.0, 1.0), 3.0);
          vec3 bevelSilver = vec3(0.62, 0.68, 0.82);
          customBlueColor = mix(customBlueColor, bevelSilver, clamp(edgeFresnel * 0.9, 0.0, 0.65));

          vec4 diffuseColor = vec4( customBlueColor, opacity );
          `
        );
      };

      // ================= A. INTEGRATED SLIM GRADIENT "Q" (RING + TAIL) =================
      const qMasterShape = new THREE.Shape();
      const radiusOuter = 2.1;
      
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radiusOuter;
        const y = Math.sin(angle) * radiusOuter;
        if (i === 0) qMasterShape.moveTo(x, y);
        else qMasterShape.lineTo(x, y);
      }
      qMasterShape.closePath();

      const tailShape = new THREE.Path();
      tailShape.moveTo(0.35, -1.2);
      tailShape.lineTo(1.45, -2.15); 
      tailShape.lineTo(1.05, -2.4);  
      tailShape.lineTo(-0.15, -1.5);
      tailShape.closePath();
      
      qMasterShape.innerPath = qMasterShape.innerPath || [];
      
      const qInnerHex = new THREE.Path();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * 1.5;
        const y = Math.sin(angle) * 1.5;
        if (i === 0) qInnerHex.moveTo(x, y);
        else qInnerHex.lineTo(x, y);
      }
      qInnerHex.closePath();
      qMasterShape.holes.push(qInnerHex);

      const qRingGeo = new THREE.ExtrudeGeometry(qMasterShape, extrudeSettingsQ);
      const qTailGeo = new THREE.ExtrudeGeometry(new THREE.Shape(tailShape.getPoints()), extrudeSettingsQ);
      
      const mainQGroup = new THREE.Group();
      const qRingMeshTemp = new THREE.Mesh(qRingGeo, unifiedBlueMat);
      const qTailMeshTemp = new THREE.Mesh(qTailGeo, unifiedBlueMat);
      
      mainQGroup.add(qRingMeshTemp);
      mainQGroup.add(qTailMeshTemp);
      
      const bbox = new THREE.Box3().setFromObject(mainQGroup);
      const centerOffset = new THREE.Vector3();
      bbox.getCenter(centerOffset);
      
      qRingMeshTemp.position.sub(centerOffset);
      qTailMeshTemp.position.sub(centerOffset);
      
      mainQGroup.position.z = 0.15;
      mainGroup.add(mainQGroup);

      // ================= B. CENTRAL INSET FLOATING BLUE GEMSTONE CORE =================
      const gemShape = new THREE.Shape();
      gemShape.moveTo(0, 0.8);
      gemShape.lineTo(0.55, 0);
      gemShape.lineTo(0, -0.8);
      gemShape.lineTo(-0.55, 0);
      gemShape.closePath();

      const gemInnerHole = new THREE.Path();
      gemInnerHole.moveTo(0, 0.4);
      gemInnerHole.lineTo(0.28, 0);
      gemInnerHole.lineTo(0, -0.4);
      gemInnerHole.lineTo(-0.28, 0);
      gemInnerHole.closePath();
      gemShape.holes.push(gemInnerHole);

      const gemGeo = new THREE.ExtrudeGeometry(gemShape, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.02, bevelSegments: 3, steps: 1 });
      gemGeo.center();
      
      const gemMesh = new THREE.Mesh(gemGeo, unifiedBlueMat);
      gemMesh.position.set(-centerOffset.x, -centerOffset.y, 0.25);
      mainGroup.add(gemMesh);

      // ================= C. CONSTELLATION NODE NETWORK FRAMEWORK =================
      const techComponentMat = new THREE.MeshPhysicalMaterial({
        // Dark gunmetal-blue, brushed metal tone
        color: 0x1c2c66,
        roughness: 0.2,
        metalness: 0.92,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        envMap: envMapTexture,
        envMapIntensity: 3.0,
        // Tighter, cooler specular pop for a metallic (not glassy) highlight
        specularColor: new THREE.Color(0xdfe6ff),
        specularIntensity: 0.9,
      });

      // Unified vector helper function to build realistic thick 3D structural tubes between points
      const create3DRod = (p1: THREE.Vector3, p2: THREE.Vector3, radius: number = 0.025) => {
        const distance = p1.distanceTo(p2);
        const rodGeo = new THREE.CylinderGeometry(radius, radius, distance, 8);
        const rodMesh = new THREE.Mesh(rodGeo, techComponentMat);

        rodMesh.position.copy(p1).add(p2).multiplyScalar(0.5);

        const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
        const upVector = new THREE.Vector3(0, 1, 0);
        rodMesh.quaternion.setFromUnitVectors(upVector, direction);

        return rodMesh;
      };

      const innerNodeGeo = new THREE.SphereGeometry(0.13, 32, 32);
      const outerNodeGeo = new THREE.SphereGeometry(0.15, 32, 32);

      const centerZ = 0.20; 
      
      // CRITICAL VALUES FOR PUSHING THE TECH FRAMEWORK OUTWARD CREATING A SPACE CLEARANCE GAP:
      // Incremented base inner frame ring to float 0.35 units off the emblem's outer hull edges
      const floatingTechInnerRadius = radiusOuter + 0.6; 
      const floatingTechOuterRadius = floatingTechInnerRadius + 0.9;
      
      const cornerPoints: THREE.Vector3[] = [];

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        
        // Offset inner frame tracking arrays cleanly away from emblem mesh shell
        const innerX = Math.cos(angle) * floatingTechInnerRadius - centerOffset.x;
        const innerY = Math.sin(angle) * floatingTechInnerRadius - centerOffset.y;
        const pInner = new THREE.Vector3(innerX, innerY, centerZ);
        cornerPoints.push(pInner);

        // Inner Node Sphere
        const innerNode = new THREE.Mesh(innerNodeGeo, techComponentMat);
        innerNode.position.copy(pInner);
        mainGroup.add(innerNode);

        // Outer Satellite Position
        const outerX = Math.cos(angle) * floatingTechOuterRadius - centerOffset.x;
        const outerY = Math.sin(angle) * floatingTechOuterRadius - centerOffset.y;
        const pOuter = new THREE.Vector3(outerX, outerY, centerZ);

        // Outer Satellite Node Sphere
        const outerNode = new THREE.Mesh(outerNodeGeo, techComponentMat);
        outerNode.position.copy(pOuter);
        mainGroup.add(outerNode);

        // Thick Volumetric 3D Radial Stalk
        const radialRod = create3DRod(pInner, pOuter, 0.03);
        mainGroup.add(radialRod);
      }

      // Thick Hexagonal Outer Structure Wireframe Linkage
      for (let i = 0; i < 6; i++) {
        const startPt = cornerPoints[i];
        const endPt = cornerPoints[(i + 1) % 6];

        const perimeterRod = create3DRod(startPt, endPt, 0.03);
        mainGroup.add(perimeterRod);
      }

      // ================= D. HOLOGRAPHIC METALLIC BASE / PEDESTAL =================
      // A grounded platform beneath the floating emblem — stays static while the
      // Q + constellation spin above it, matching the reference product shot.
      const baseGroup = new THREE.Group();
      const baseY = -(floatingTechOuterRadius) - 0.3; // pulled in close so the logo visibly rests on the platform
      baseGroup.position.set(0, baseY, 0);
      const baseScale = 0.7; // 30% smaller than the original pedestal size
      baseGroup.scale.setScalar(baseScale);
      scene.add(baseGroup);

      const baseRadius = radiusOuter + 0.9; // slightly narrower than the hex frame above it

      // Off-white metallic top surface (the "ring")
      const baseTopMat = new THREE.MeshPhysicalMaterial({
        color: 0xede9e0,
        metalness: 0.5,
        roughness: 0.26,
        clearcoat: 0.55,
        clearcoatRoughness: 0.14,
        envMap: envMapTexture,
        envMapIntensity: 2.2,
      });
      // Silver chrome border — only the outer edge/rim of the top disc
      const baseRimSilverMat = new THREE.MeshPhysicalMaterial({
        color: 0xe6eaf4,
        metalness: 0.6,
        roughness: 0.22,
        clearcoat: 0.7,
        clearcoatRoughness: 0.1,
        envMap: envMapTexture,
        envMapIntensity: 2.4,
      });
      // Dark gunmetal collar + foot
      const baseDarkMat = new THREE.MeshPhysicalMaterial({
        color: 0x12172c,
        metalness: 0.85,
        roughness: 0.32,
        envMap: envMapTexture,
        envMapIntensity: 2.4,
      });
      // Glowing energy accents (rings, slits, center light)
      const baseGlowMat = new THREE.MeshStandardMaterial({
        color: 0x5577ff,
        emissive: 0x5f82ff,
        emissiveIntensity: 2.4,
        metalness: 0.2,
        roughness: 0.4,
      });

      // CylinderGeometry has 3 material groups: [0] side wall, [1] top face, [2] bottom face.
      // Side wall (the rim/border) gets silver; top and bottom faces get the blue ring color.
      const topCap = new THREE.Mesh(
        new THREE.CylinderGeometry(baseRadius, baseRadius, 0.3, 64),
        [baseRimSilverMat, baseTopMat, baseTopMat]
      );
      topCap.position.y = 0.15;
      baseGroup.add(topCap);

      const midCollar = new THREE.Mesh(
        new THREE.CylinderGeometry(baseRadius * 0.92, baseRadius * 0.92, 0.4, 64),
        baseDarkMat
      );
      midCollar.position.y = -0.2;
      baseGroup.add(midCollar);

      const footRing = new THREE.Mesh(
        new THREE.CylinderGeometry(baseRadius * 1.06, baseRadius * 1.06, 0.16, 64),
        baseDarkMat
      );
      footRing.position.y = -0.48;
      baseGroup.add(footRing);

      // Thin glowing seam between the top cap and the collar
      const seamGlow = new THREE.Mesh(
        new THREE.TorusGeometry(baseRadius, 0.035, 8, 64),
        baseGlowMat
      );
      seamGlow.rotation.x = Math.PI / 2;
      seamGlow.position.y = 0.0;
      baseGroup.add(seamGlow);

      // Three glowing side "power slit" accents around the collar
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const slit = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.07, 0.06), baseGlowMat);
        slit.position.set(
          Math.cos(angle) * baseRadius * 0.93,
          -0.2,
          Math.sin(angle) * baseRadius * 0.93
        );
        slit.rotation.y = -angle + Math.PI / 2;
        baseGroup.add(slit);
      }

      // Bright center glow that reads as the light source feeding the beam upward
      const centerGlow = new THREE.Mesh(
        new THREE.CircleGeometry(baseRadius * 0.28, 32),
        new THREE.MeshBasicMaterial({
          color: 0xeaf1ff,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      centerGlow.rotation.x = -Math.PI / 2;
      centerGlow.position.y = 0.31;
      baseGroup.add(centerGlow);

      const centerLight = new THREE.PointLight(0x9db4ff, 3, 8, 2);
      centerLight.position.set(0, baseY + 0.6 * baseScale, 0);
      scene.add(centerLight);

      // Short glowing connector beam bridging the lowest tech node down to the
      // base's glow disc, so the emblem reads as physically resting on the
      // platform rather than floating separately above it.
      const baseTopSurfaceY = baseY + 0.3 * baseScale;
      const bottomNodeY = -floatingTechOuterRadius;
      const connectorHeight = Math.max(bottomNodeY - baseTopSurfaceY, 0.05);
      const connectorBeam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.09 * baseScale, connectorHeight, 16, 1, true),
        new THREE.MeshBasicMaterial({
          color: 0xaec4ff,
          transparent: true,
          opacity: 0.55,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      );
      connectorBeam.position.set(0, baseTopSurfaceY + connectorHeight / 2, 0);
      scene.add(connectorBeam);

      // Concentric energy rings etched into the top surface + faint rings radiating
      // outward on the "ground" — these get their own slow independent spin.
      energyRingsGroup = new THREE.Group();
      const ringAccentMat = new THREE.MeshBasicMaterial({
        color: 0x7fa0ff,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      [0.4, 0.58, 0.78].forEach((frac) => {
        const r = baseRadius * frac;
        const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.025, 64), ringAccentMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.32;
        energyRingsGroup.add(ring);
      });

      const groundRingRadii = [1.1, 1.3, 1.45, 1.6];
      groundRingRadii.forEach((mult, idx) => {
        const r = baseRadius * mult;
        const groundRing = new THREE.Mesh(
          new THREE.RingGeometry(r, r + 0.02, 96),
          new THREE.MeshBasicMaterial({
            color: 0x7fa0ff,
            transparent: true,
            opacity: 0.4 - idx * 0.08,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        groundRing.rotation.x = -Math.PI / 2;
        groundRing.position.y = -0.47;
        energyRingsGroup.add(groundRing);
      });

      baseGroup.add(energyRingsGroup);

      // 4. Uniform Frame Rotation Loop Engine
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (mainGroup) {
          mainGroup.rotation.y += 0.012; 
        }
        // Base stays completely static — no rotation applied to it or its rings.
        renderer.render(scene, camera);
      };
      animate();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
    };
  }, [isClient, width, height]);

  return (
    <div 
      key={`${width}-${height}`}
      className="relative flex items-center justify-center bg-transparent overflow-hidden select-none"
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        maxWidth: "100%",
        maxHeight: "100%"
      }}
    >
      <div ref={containerRef} className="w-full h-full block" />
    </div>
  );
}

export default QEmblem;