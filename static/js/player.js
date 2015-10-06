function Player(){

  THREE.Object3D.call(this);

}

Player.prototype = Object.create( THREE.Object3D.prototype );


Player.prototype.update = function(){
  var rotateAngle = 0.25;
  var moveDistance = 0.4;
  if(Controls.keys.up){
    this.translateZ( -moveDistance);
    renderer.camera.translateZ( -moveDistance);
  }
  if(Controls.keys.down){
    this.translateZ( moveDistance);
    renderer.camera.translateZ( moveDistance);
  }
  if(Controls.keys.left){
    this.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
    renderer.camera.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
  }
  if(Controls.keys.right){
    this.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
    renderer.camera.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
  }
};
