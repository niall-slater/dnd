import React, { Component } from 'react';
import * as THREE from 'three';

class PhysicsOverlay extends Component {

  constructor(props) {
    super(props);

    this.dice = props.dice;
    this.facets = props.facets;

    this.state = {
      result: 0
    }
  }

  onDrag = (event) => {
    //this drags it like a JPG - either do drags a canvas way or suppress that default handler
    console.log(event);
  }

  executeRoll = () => {
    
  }

  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.mount.appendChild( renderer.domElement );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
      <div className="physics-overlay" draggable="true" onDrag={this.onDrag} ref={ref => (this.mount = ref)}>
      </div>
    );
  }
}

export default PhysicsOverlay;