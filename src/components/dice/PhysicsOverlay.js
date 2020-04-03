import React, { Component } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { threeToCannon } from 'three-to-cannon';
window.THREE = THREE;

const modelsDirectory = "criticalassist/3d/scaled/";
const physModelsDirectory = "criticalassist/3d/phys/";

const loader = new GLTFLoader();

// Graphics
var renderer;
var scene;
var camera;
var plane;
var ambientLight;
var directionalLight;
var controls;

// Physics
var world;
var lastTime;
var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 3;

var sceneObjects = [];

Math.toRadians = (x) => {
  return x*Math.PI / 180;
}

class PhysicsOverlay extends Component {

  constructor(props) {
    super(props);

    this.dice = props.dice;
    this.facets = props.facets;

    this.state = {
      result: 0
    }
  }

  executeRoll = () => {
    
  }

  // Load the dice models
  // Handy: https://itnext.io/promise-loading-with-three-js-78a6297652a5
  loadModels = () => {
    var dice = ['d4', 'd6', 'd8', 'd10', 'd10p', 'd12', 'd20'];
    //dice = ['d20'];

    var that = this;
    var promises = dice.map((die) => {
      return that.loadModel(die);
    });

    return Promise.all(promises);
  };

  // Load a model and instantiate it in the scene
  instantiateModel = (model) => {
    var actualModel = model.scene.children[0];
    var material = actualModel.material;

    // Give it a random dice-like material
    material.color = {r: Math.random(), g: Math.random(), b: Math.random()};
    material.roughness = .4;
    material.metalness = .5;

    // The GLTF loader works like this:
    actualModel.material = material;
    
    actualModel.castShadow = true;

    // Offset the position just so we can see easier during development
    // TODO: remove
    actualModel.position.x = .4 * (Math.random());
    actualModel.position.z = .4 * (Math.random());

    // This is just how GLTF import works, don't question it:
    scene.add(model.scene);

    // Create a gameobject out of the model and add it to the list
    sceneObjects.push({
      obj: model,
      rigidbody: null,
      dieName: model.dieName
    });
  };

  loadModel = (fileName) => {
    var that = this;
    return new Promise(resolve => {
      loader.load(modelsDirectory + fileName + '.glb', (model) => {
        model.dieName = fileName;
        that.instantiateModel(model);
        resolve(model);
      });
    });
  };

  loadPhysModel = (fileName) => {
    return new Promise(resolve => {
      loader.load(physModelsDirectory + fileName + '.glb', (model) => {
        resolve(model);
      });
    });
  };

  componentDidMount() {
    this.createRenderingScene();
  }

  createRenderingScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    camera = new THREE.PerspectiveCamera(75, 1, 0.01, 100);
    ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 1;
    scene.add(ambientLight);
    directionalLight = new THREE.DirectionalLight(0xffffff, 1.4, 0, 1);
    directionalLight.position.set(-1, 4, 1);
    directionalLight.target.position.set(0,0,0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 600);
    renderer.shadowMap.enabled = true;

    controls = new OrbitControls(camera, renderer.domElement);
    this.mount.appendChild(renderer.domElement);

    var planeGeometry = new THREE.PlaneGeometry(60,40,1,1);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0x2222cc});
    plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.receiveShadow = true;
    plane.position.z = 0;
    plane.position.y = -.5;

    scene.add(plane);

    this.loadModels().then(this.createPhysicsScene);
    camera.position.z = 1;
    camera.position.y = .2;
  };

  createPhysicsScene = () => {
    // Setup our world
    world = new CANNON.World();
    world.gravity.set(0, 0, -9.82); // m/s²

    // Create bodies for the dice
    var radius = 1; // m
    console.log(sceneObjects);

    for (var i = 0; i < sceneObjects.length; i++) {
      var gameObject = sceneObjects[i];

      console.log(i);
      //https://computergraphics.stackexchange.com/questions/7519/how-mesh-geometry-data-vertex-coordinates-stored-in-gltf
      //maybe don't even use gltf?? 

      // eslint-disable-next-line no-loop-func
      this.loadPhysModel(gameObject.dieName).then(physModel => {
        var name = physModel.scene.children[0].name.toLowerCase();

        // this is an ugly hack and i'm proud of it
        if (name === "d6_numbered")
          name = "d6";
        else if (name === "d10_percentile")
          name = "d10p";

        var associatedGameObject = sceneObjects.find(x => {return x.dieName === name});
        var geometry = physModel.scene.children[0];
        var polyhedron = threeToCannon(geometry, {type: threeToCannon.Type.MESH});
  
        var body = new CANNON.Body({
          mass: .1, // kg
          position: geometry.position,
          shape: polyhedron
        });

        associatedGameObject.rigidbody = body;
        world.addBody(associatedGameObject.rigidbody);
      });
      /*
        cannonPoints = geometry.vertices.map(function(v) {
            return new CANNON.Vec3( v.x, v.y, v.z )
        })

        cannonFaces = geometry.faces.map(function(f) {
            return [f.a, f.b, f.c]
        })
      */
    }
    console.log(sceneObjects);

    // Create a plane
    var groundBody = new CANNON.Body({
        mass: 0 // mass == 0 makes the body static
    });
    var groundShape = new CANNON.Plane();
    groundBody.addShape(groundShape);
    world.addBody(groundBody);

    // Start the simulation
    this.animate();
  };

  simLoop = (time) => {
    if (lastTime !== undefined){
      var dt = (time - lastTime) / 1000;
      //world.step(fixedTimeStep, dt, maxSubSteps);
      world.step(fixedTimeStep);
    }
    lastTime = time;
  }

  // Sync renderer to physics
  syncRenderer = () => {
    sceneObjects.forEach((gameObject) => {
      var actualObj = gameObject.obj.scene.children[0];
      var body = gameObject.rigidbody;
      if (actualObj == null || body == null)
        return;

      actualObj.position.x = body.position.x;
      actualObj.position.y = body.position.y;
      actualObj.position.z = body.position.z;
      actualObj.quaternion.x = body.quaternion.x;
      actualObj.quaternion.y = body.quaternion.y;
      actualObj.quaternion.z = body.quaternion.z;
      actualObj.quaternion.w = body.quaternion.w;
    });

  }

  animate = () => {

    this.simLoop(requestAnimationFrame(this.animate));

    this.syncRenderer();

    controls.update();

    renderer.render(scene, camera);
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
      <div className="physics-overlay" ref={ref => (this.mount = ref)}>
      </div>
   );
  }
}

export default PhysicsOverlay;