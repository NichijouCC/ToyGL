import { AtlasAttachmentLoader, CameraSystem, Color, SkeletonJson, SpineComp, SpineSystem, World } from "../../src";
import { Timer } from "../../src/core/timer";

const world = new World(document.getElementById("canvas") as HTMLCanvasElement);

const timer = new Timer();
let spine = new SpineSystem(world, { pathPrefix: "./spine/" });
world.addSystem(spine);
world.addSystem(new CameraSystem(world));

timer.onTick.addEventListener(world.update);
const cam = world.addNewCamera();
cam.backgroundColor = new Color(0.9, 0.9, 0.9, 1.0);

let skeletonFile = "raptor-pro.json";
let atlasFile = "raptor.atlas"
let animation = "walk";
spine.assetMgr.loadJson(skeletonFile);
spine.assetMgr.loadTextureAtlas(atlasFile);
spine.assetMgr.loadAll().then(() => {
    let atlasLoader = new AtlasAttachmentLoader(spine.assetMgr.get(atlasFile));
    let skeletonJson = new SkeletonJson(atlasLoader);
    skeletonJson.scale = 0.4;
    let skeletonData = skeletonJson.readSkeletonData(spine.assetMgr.get(skeletonFile));

    let node = world.addNewChild();
    let comp = node.addComponent(SpineComp);
    comp.skeletonData = skeletonData;
    //设置播放动画
    comp.animationState.setAnimation(0, animation, true);
})