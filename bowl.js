AFRAME.registerComponent("balls", {
    init: function () {
      this.rollBall();
    },
    rollBall: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var ball = document.createElement("a-entity");
          ball.setAttribute("gltf-model", "./models/bowling_ball/scene.gltf");
  
          ball.setAttribute("scale", {  
            x:3,y:3,z:3      
          });
  
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");

          ball.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          ball.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");
          ball.setAttribute("dynamic-body", {
            shape: "sphere",
            mass : "0.8",
          });
          
          ball.addEventListener("collide", this.removeBall);

          scene.appendChild(ball);
        }
      });
    },

    removeBall : function (e) {
      console.log(e.detail.target.el);
      console.log(e.detail.body.el);

      var element = e.detail.target.el;
      var elementHit = e.detail.body.el;

      if(elementHit.id.includes("pin")){
        elementHit.setAttribute("material", {
          opacity: 0.6,
          transparent : true,
        });
        
        var impulse = new CANNON.Vec3(-2, 2, 1);
        var worldPoint = new CANNON.Vec3().copy(
          elementHit.getAttribute("position")
        )
        elementHit.body.applyImpulse(impulse, worldPoint);
        element.removeEventListener("collide", this.bowl);
        var scene = document.querySelector("#scene");
        scene.removeChild(element);
      }
    }
  });