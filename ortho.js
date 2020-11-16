
const scene = new THREE.Scene();

//Orthographic camera
var width = window.innerWidth/6;
var height = window.innerHeight/6;
const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

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

var objectAmount = 32;
for(i = 0; i < objectAmount; i++){
    //menambahkan box
    if(i < objectAmount / 2 ){
        geometry = new THREE.BoxGeometry(
            Math.random()*5 + 2, 
            Math.random()*5 + 2, 
            Math.random()*5 + 2);
    }else{
        var segment = 16;
        var radius = Math.random()*3 + 1;
        geometry = new THREE.SphereGeometry(
            radius, segment, segment);
    }
        
    material = new THREE.MeshLambertMaterial( { 
        color: 0x00ff00, 
        roughness: 1,
    } );

    object = new THREE.Mesh( geometry, material );
    
    var tempColor = (colors[Math.floor(Math.random()*(colors.length))]);
    object.material.color.set(tempColor);
    
    object.position.x = Math.random()*100 - 50;
    object.position.z = Math.random()*100 - 50;
    object.position.y = Math.random()*50;

    scene.add(object);
}

//menambahkan lightsource
var light = new THREE.AmbientLight( 0xffffff, 0.2 );

var pointLight = new THREE.PointLight( 0xffffff, 1, 400 );
pointLight.position.set(0, 75, 0);

scene.add(light);
scene.add(pointLight);

//mengubah posisi kamera awal
camera.position.y = 40;

//variable pendukung untuk memutar kamera
var count = 0;
const animate = function () {
    count++;
    requestAnimationFrame( animate );

    camera.position.x = Math.cos(count * 0.002)*100;
    camera.position.z = Math.sin(count * 0.002)*100;
    camera.lookAt(0,20,0);

    renderer.render( scene, camera );
};

animate();