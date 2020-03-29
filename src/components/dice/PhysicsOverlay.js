import React, { Component } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const modelsDirectory = "criticalassist/3d/";

const loader = new GLTFLoader();
var renderer;
var scene;
var camera;

class PhysicsOverlay extends Component {

  constructor(props) {
    super(props);

    this.dice = props.dice;
    this.facets = props.facets;

    this.sceneObjects = [];

    this.state = {
      result: 0
    }
  }

  executeRoll = () => {
    
  }

  loadModels = (scene) => {
    this.loadModel('d4', scene);
    this.loadModel('d6', scene);
    this.loadModel('d8', scene);
    this.loadModel('d10', scene);
    this.loadModel('d10p', scene);
    this.loadModel('d12', scene);
    this.loadModel('d20', scene);
  }

  loadModel = (fileName, scene) => {
    var objList = this.sceneObjects;
    loader.load(modelsDirectory + fileName + '.glb', function (obj) {
      console.log("Loaded", obj);
      var material = new THREE.MeshPhysicalMaterial( { color: 0xffffff } );
      console.log(material);
      material.color = {r: Math.random(), g: Math.random(), b: Math.random()};
      material.transparent = true;
      material.transparency = 0.1;
      material.roughness = 0.3;
      material.metalness = 0.4;
      obj.scene.children[0].material = material;
      scene.add(obj.scene);
      objList.push(obj);
    }, undefined, function (error) {
      console.error(error);
    });
  }

  componentDidMount() {
    // === THREE.JS CODE START ===
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.01, 100 );
    var light = new THREE.AmbientLight( 0xa0a0a0 ); // soft white light
    scene.add(light);
    light = new THREE.PointLight( 0xaaaaaa, 1, 50 );
    light.position.set( 0, .2, .2 );
    scene.add( light );
    scene.add(new THREE.SpotLight( 0xffffff ));
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( 600, 600 );
    
    this.mount.appendChild( renderer.domElement );

    var planeGeometry = new THREE.PlaneGeometry(60,40,1,1);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.position.z = -1;
    plane.position.y = -1;

    scene.add(plane);

    this.loadModels(scene);
    camera.position.z = 0.04;
    camera.position.y = 0.1;
    camera.rotation.x = -1.2;
    this.animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.sceneObjects.forEach((obj) => {
      obj.scene.children[0].rotation.x += 0.05;
      obj.scene.children[0].rotation.y += 0.02;
    });

    renderer.render( scene, camera );
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