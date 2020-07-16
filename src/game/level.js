import Snapshot from "../utils/snapshot";
import {Sphere, Body} from "cannon";

var main;

class Level {
  constructor() {
    main = app.main;
  }

  start() {
    let well = main.assets.wellBrotli.scene.clone();
    main.scene.add(well);
    well.scale.multiplyScalar(5);
    well.position.set(6, 0.7, -12);

    let ground = main.objectMaker.addBox({
      x: 0,
      y: 0,
      z: 0,
      wx: 15,
      wy: 3,
      wz: 15,
      color: 0x112233,
      mass: -1,
    });

    this.boxList = [];

    for (let i = 0; i < 50; i++) {
      let x = -5 + 10 * Math.random();
      let z = -5 + 10 * Math.random();
      let box = main.objectMaker.addBox({
        x,
        y: 10,
        z,
        wx: 0.5,
        wy: 1,
        wz: 0.5,
        color: 0x1f600f,
        mass: 5,
      });

      box.body.allowSleep = true;
      box.body.sleepSpeedLimit = 2.5;
      box.body.sleepTimeLimit = 0.5;

      this.boxList.push(box);
    }
    // console.log(this.boxList);

    let geometry = new THREE.SphereGeometry(0.7, 50, 50);
    let material = new THREE.MeshPhongMaterial({color: 0x777879});
    this.ball = new THREE.Mesh(geometry, material);
    this.ball.position.set(0, 0, 0);
    main.scene.add(this.ball);

    this.ball.body = new Body({
      mass: 25,
    });
    let shape = new Sphere(1);
    this.ball.body.addShape(shape);
    main.world.add(this.ball.body);
  }

  update(ratio, delta) {
    this.ball.position.copy(this.ball.body.position);
    this.ball.quaternion.copy(this.ball.body.quaternion);

    if (this.ball.position.y < -5) {
      this.ball.body.position.set(0, 10, 0);
      this.ball.body.velocity.set(0, 0, 0);
      this.ball.body.angularVelocity.set(0, 0, 0);
    }

    let controls = app.controls;

    if (controls.isDown) {
      let dx = controls.mouseX - controls.prevX;
      let dy = controls.mouseY - controls.prevY;

      dx *= 0.1;
      dy *= 0.1;

      if (this.ball.body.sleepState) {
        this.ball.body.wakeUp();
      }

      this.ball.body.velocity.x += dx;
      this.ball.body.velocity.z += dy;
    }

    for (let box of this.boxList) {
      box.position.copy(box.body.position);
      box.quaternion.copy(box.body.quaternion);

      if (box.position.y < -6) {
        let x = -10 + 20 * Math.random();
        let z = -10 + 20 * Math.random();
        box.body.position.set(x, 10, z);
        box.body.velocity.set(0, 0, 0);
      }
    }
  }

  end() {}
}

export default Level;
