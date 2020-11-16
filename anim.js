
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//menambahkan plane
var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 100);
var planeMats = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    roughness: 0.5,
    side: THREE.DoubleSide
});

var plane = new THREE.Mesh(planeGeometry, planeMats);
plane.position.y = -50;
plane.rotation.x =  90 * (Math.PI/180);
scene.add(plane);

//menambahkan cube
var geometry;
var cube;
var material;

var colors = [0x00ff9f, 0x00b8ff, 0x001eff, 0xbd00ff];

geometry = new THREE.BoxGeometry(10, 10, 10);
material = new THREE.MeshLambertMaterial( { 
    color: 0x00ff00, 
    roughness: 1,
} );
material.wireframe = true;
cube = new THREE.Mesh(geometry, material);

cube.position.y = 15;

scene.add(cube);

//menambahkan lightsource
var light = new THREE.AmbientLight( 0xffffff, 0.2 );

var pointLight = new THREE.PointLight( 0xffffff, 1, 400 );
pointLight.position.set(0, 25, 0);

scene.add(light);
scene.add(pointLight);

//mengubah posisi kamera awal
camera.position.z = 50;
camera.position.y = 25;

//variable pendukung untuk memutar kamera
var count = 0;
const animate = function () {
    count++;
    requestAnimationFrame( animate );
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.01;

    camera.position.x = Math.cos(count * 0.002)*50;
    camera.position.z = Math.sin(count * 0.002)*50;
    camera.lookAt(0,20,0);

    renderer.render( scene, camera );
};

animate();