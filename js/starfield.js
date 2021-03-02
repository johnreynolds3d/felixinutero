"use strict";

var renderer1 = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector(".content-one canvas") });

// var renderer1 = new THREE.WebGLRenderer({ antialias: true });
// renderer1.setPixelRatio(window.devicePixelRatio);
// renderer1.setSize(window.innerWidth, window.innerHeight);

var camera1 = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10);

var scene1 = new THREE.Scene();
scene1.background = new THREE.CubeTextureLoader()
    .setPath('images/cube/MilkyWay/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
scene1.background.format = THREE.RGBFormat;

scene1.add(camera1);

function resizeCanvasToDisplaySize1(force) {
    var canvas = renderer1.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if (force || canvas.width !== width || canvas.height !== height) {

        // you must pass false here or three.js sadly fights the browser
        renderer1.setSize(width, height, false);
        camera1.aspect = width / height;
        camera1.updateProjectionMatrix();
    }
}

function animate1(time) {

    resizeCanvasToDisplaySize1();

    camera1.rotation.x += 0.0005;
    camera1.rotation.y += -0.0005;

    renderer1.render(scene1, camera1);
    requestAnimationFrame(animate1);
}
resizeCanvasToDisplaySize1(true);
requestAnimationFrame(animate1);