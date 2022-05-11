import { CameraSystem, Color, Spine, World } from "../../src";
import { Timer } from "../../src/core/timer";

const world = new World(document.getElementById("canvas") as HTMLCanvasElement);

const timer = new Timer();
let spineSystem = new Spine.SpineSystem(world, { pathPrefix: "./spine/" });
world.addSystem(spineSystem);
world.addSystem(new CameraSystem(world));

timer.onTick.addEventListener(world.update);
const cam = world.addNewCamera();
cam.backgroundColor = new Color(0.9, 0.9, 0.9, 1.0);

let skeletonFile = "raptor-pro.json";
let atlasFile = "raptor.atlas"
let animation = "walk";
spineSystem.assetMgr.loadJson(skeletonFile);
spineSystem.assetMgr.loadTextureAtlas(atlasFile);
spineSystem.assetMgr.loadAll().then(() => {
    let atlasLoader = new Spine.AtlasAttachmentLoader(spineSystem.assetMgr.get(atlasFile));
    let skeletonJson = new Spine.SkeletonJson(atlasLoader);
    skeletonJson.scale = 0.4;
    let skeletonData = skeletonJson.readSkeletonData(spineSystem.assetMgr.get(skeletonFile));

    let node = world.addNewChild();
    let comp = node.addComponent(Spine.SpineComp);
    comp.skeletonData = skeletonData;
    //设置播放动画
    comp.animationState.setAnimation(0, animation, true);
})