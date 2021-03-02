"use strict";

var renderer4 = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector(".content-four canvas") });

// var renderer4 = new THREE.WebGLRenderer({ antialias: true });
// renderer4.setPixelRatio(window.devicePixelRatio);
// renderer4.setSize(window.innerWidth, window.innerHeight);

var camera4 = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10);

var scene4 = new THREE.Scene();
scene4.background = new THREE.CubeTextureLoader()
    .setPath('images/cube/skybox/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

function resizeCanvasToDisplaySize4(force) {
    var canvas = renderer4.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if (force || canvas.width !== width || canvas.height !== height) {

        // you must pass false here or three.js sadly fights the browser
        renderer4.setSize(width, height, false);
        camera4.aspect = width / height;
        camera4.updateProjectionMatrix();
    }
}

function animate4(time) {
    resizeCanvasToDisplaySize4();

    camera4.rotation.y -= 0.0006;

    renderer4.render(scene4, camera4);
    requestAnimationFrame(animate4);
}
resizeCanvasToDisplaySize4(true);
requestAnimationFrame(animate4);