"use strict";

var renderer3 = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector(".content-three canvas") });

// var renderer3 = new THREE.WebGLRenderer({ antialias: true });
// renderer3.setPixelRatio(window.devicePixelRatio);
// renderer3.setSize(window.innerWidth, window.innerHeight);

var camera3 = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10);

var scene3 = new THREE.Scene();
scene3.background = new THREE.Color(0x505050);

var room = new THREE.Mesh(
    new THREE.BoxGeometry(6, 6, 6, 8, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0x808080, wireframe: true })
);
scene3.add(new THREE.HemisphereLight(0x606060, 0x404040));

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1).normalize();
scene3.add(light);

scene3.add(room);

var objects = [];
for (var i = 0; i < 64; i++) {

    var object = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

    object.position.x = Math.random() * 4 - 2;
    object.position.y = Math.random() * 4 - 2;
    object.position.z = Math.random() * 4 - 2;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;

    object.scale.x = Math.random() + 0.5;
    object.scale.y = Math.random() + 0.5;
    object.scale.z = Math.random() + 0.5;

    object.userData.velocity = new THREE.Vector3();
    object.userData.velocity.x = Math.random() * 0.01 - 0.005;
    object.userData.velocity.y = Math.random() * 0.01 - 0.005;
    object.userData.velocity.z = Math.random() * 0.01 - 0.005;

    object.castShadow = true;
    object.receiveShadow = true;
    object.material.transparent = true;

    scene3.add(object);
    objects.push(object);
}

function resizeCanvasToDisplaySize3(force) {
    var canvas = renderer3.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if (force || canvas.width !== width || canvas.height !== height) {

        // you must pass false here or three.js sadly fights the browser
        renderer3.setSize(width, height, false);
        camera3.aspect = width / height;
        camera3.updateProjectionMatrix();
    }
}

function animate3(time) {
    resizeCanvasToDisplaySize3();

    camera3.rotation.x += 0.0004;
    camera3.rotation.y += -0.0004;

    var clock = new THREE.Clock();    
    var delta = clock.getDelta() * 60;

    // Keep cubes inside room
    for (var i = 0; i < objects.length; i++) {

        var cube = objects[i];
        cube.position.add(cube.userData.velocity);

        if (cube.position.x < - 3 || cube.position.x > 3) {
            cube.position.x = THREE.Math.clamp(cube.position.x, - 3, 3);
            cube.userData.velocity.x = - cube.userData.velocity.x;
        }

        if (cube.position.y < - 3 || cube.position.y > 3) {
            cube.position.y = THREE.Math.clamp(cube.position.y, - 3, 3);
            cube.userData.velocity.y = - cube.userData.velocity.y;
        }

        if (cube.position.z < - 3 || cube.position.z > 3) {
            cube.position.z = THREE.Math.clamp(cube.position.z, - 3, 3);
            cube.userData.velocity.z = - cube.userData.velocity.z;
        }

        cube.rotation.x += cube.userData.velocity.x * 2 * delta;
        cube.rotation.y += cube.userData.velocity.y * 2 * delta;
        cube.rotation.z += cube.userData.velocity.z * 2 * delta;

        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;
        cube.rotation.z += 0.001;
    }

    renderer3.render(scene3, camera3);
    requestAnimationFrame(animate3);
}
resizeCanvasToDisplaySize3(true);
requestAnimationFrame(animate3);