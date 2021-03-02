"use strict";

var renderer2 = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector(".content-two canvas") });

// There's no reason to set the aspect here because we're going to set it every frame anyhow
var camera2 = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10);

var scene2 = new THREE.Scene();
scene2.background = new THREE.CubeTextureLoader()
    .setPath('images/cube/winter/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

var geometry = new THREE.DodecahedronGeometry(0.4);

var material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: scene2.background, refractionRatio: 0.7 });
material.envMap.mapping = THREE.CubeRefractionMapping;

var character = new THREE.Mesh(geometry, material);

scene2.add(camera2);
camera2.add(character);
character.position.set(0, 0, -0.7);

function resizeCanvasToDisplaySize2(force) {
    var canvas = renderer2.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if (force || canvas.width !== width || canvas.height !== height) {

        // you must pass false here or three.js sadly fights the browser
        renderer2.setSize(width, height, false);
        camera2.aspect = width / height;
        camera2.updateProjectionMatrix();

        // set render target sizes here
    }
}

function animate2(time) {

    resizeCanvasToDisplaySize2();

    camera2.rotation.y += 0.0005;

    character.rotation.x += 0.002;
    character.rotation.y += 0.002;
    character.rotation.z += 0.002;

    renderer2.render(scene2, camera2);
    requestAnimationFrame(animate2);
}
resizeCanvasToDisplaySize2(true);
requestAnimationFrame(animate2);