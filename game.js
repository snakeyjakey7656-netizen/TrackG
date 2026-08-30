import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 5, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("game").appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 3);

light.position.set(10, 20, 10);

scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 1));

// Ground
const groundGeometry = new THREE.BoxGeometry(50, 0.5, 100);

const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x444444
});

const ground = new THREE.Mesh(
    groundGeometry,
    groundMaterial
);

ground.position.y = -1;

scene.add(ground);

// Car
const carGeometry = new THREE.BoxGeometry(2, 1, 4);

const carMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000
});

const car = new THREE.Mesh(
    carGeometry,
    carMaterial
);

car.position.y = 0;

scene.add(car);

// Keyboard
const keys = {};

window.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});

// Game loop
function animate() {
    requestAnimationFrame(animate);

    if (keys["w"]) {
        car.position.z -= 0.15;
    }

    if (keys["s"]) {
        car.position.z += 0.15;
    }

    if (keys["a"]) {
        car.position.x -= 0.1;
    }

    if (keys["d"]) {
        car.position.x += 0.1;
    }

    // Camera follows car
    camera.position.x = car.position.x;
    camera.position.z = car.position.z + 10;

    camera.lookAt(car.position);

    renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
