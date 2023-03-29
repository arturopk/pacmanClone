import * as me from "melonjs"; // import the melonJS library    
import { Sprite } from "melonjs"; // import the melonJS library	

class CharacterSprite extends Sprite {
    constructor() {
        super(
             me.game.viewport.width / 2,
             me.game.viewport.height / 2,
             {
                image: "character",
             }
        );

        // Enable keyboard input
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        // add a physic body with an ellipse as body shape
        this.body = new me.Body(this, new me.Ellipse(6, 6, this.width - 6, this.height - 6));
        this.body.setMaxVelocity(4, 4);
        this.body.gravityScale = 0;

        // apply a random tint
        this.tint = new me.Color().random(64, 255);

        // as we go out of the viewport coordinates
        this.alwaysUpdate = true;
    }

    update() {
        // world limit check
        if (this.pos.x > me.game.viewport.width) {
            this.body.force.x = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.x);
        }
        if (this.pos.x < 0) {
            this.body.force.x = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.x);
        }
        if (this.pos.y > me.game.viewport.height) {
            this.body.force.y = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.y);
        }
        if (this.pos.y < 0) {
            this.body.force.y = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.y);
        }

        // move the sprite to tyhe left
        if (me.input.isKeyPressed("left")){
            this.body.force.x -= 0.1;
        }
        // move the sprite to the right
        if (me.input.isKeyPressed("right")){
            this.body.force.x += 0.1;
        }
        // move the sprite up
        if (me.input.isKeyPressed("up")){
            this.body.force.y -= 0.1;
        }
        // move the sprite down
        if (me.input.isKeyPressed("down")){
            this.body.force.y += 0.1;
        }
        

        // rotate the sprite based on the current velocity
        this.rotate(this.body.force.x < 0 ? -0.05 : 0.05);

        this.setOpacity(0.5);

        return true;
    }

    // collision handler
    onCollision(response) {

        this.setOpacity(1.0);

        this.pos.sub(response.overlapN);

        if (response.overlapN.x !== 0) {
            this.body.force.x = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.x);
        }
        if (response.overlapN.y !== 0) {
            this.body.force.y = me.Math.randomFloat(-4, 4) * -Math.sign(this.body.force.y);
        }

        return false;
    }
};

export default CharacterSprite;