import * as me from "melonjs"; // import the melonJS library
import CharacterSprite from "./sprites/CharacterSprite";

me.device.onReady(function () {
    // load assets
    me.loader.load({
        name: "background",
        type: "image",
        src: "assets/background.png"
    });
    // load character sprite
    me.loader.load(
        { name: "character", type: "image", src: "assets/character.png" });
    // initialize the display canvas once the device/browser is ready
    if (!me.video.init(1218, 562, {parent : "screen", scale : "auto"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }


    // add a background from a png file
    me.game.world.addChild(new me.Sprite(0, 0, {   
        image: me.loader.getImage("background")
    }), 1);

    // add a font text display object
    me.game.world.addChild(new CharacterSprite(), 2);

    // update the display
    me.game.world.update(1000);
});