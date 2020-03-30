import React, { Component } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const modelsDirectory = "criticalassist/3d/scaled/";

const loader = new GLTFLoader();
var renderer;
var scene;
var camera;
var plane;
var ambientLight;
var directionalLight;
var controls;

Math.toRadians = (x) => {
  return x*Math.PI / 180;
}

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
      var material = obj.scene.children[0].material;
      console.log(material);
      material.color = {r: Math.random(), g: Math.random(), b: Math.random()};
      material.roughness = .4;
      material.metalness = .5;
      obj.scene.children[0].material = material;
      obj.scene.children[0].castShadow = true;
      obj.scene.children[0].position.x = .4 * (Math.random());
      obj.scene.children[0].position.z = .4 * (Math.random());
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
    plane.rotation.x = Math.toRadians(-90);

    scene.add(plane);

    this.loadModels(scene);
    camera.position.z = 1;
    camera.position.y = .2;
    camera.rotation.z = 4;
    this.animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    controls.update();

    this.sceneObjects.forEach((obj) => {
      obj.scene.children[0].rotation.x += 0.05;
      obj.scene.children[0].rotation.y += 0.02;
    });

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