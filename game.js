// HTML canvas elementini alıyoruz
const canvas = document.getElementById("renderCanvas");

// Bir Babylon.js motoru oluşturuyoruz
const engine = new BABYLON.Engine(canvas, true);

// Sahneyi oluşturan ana fonksiyon
const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // Koyu mavi bir arka plan rengi belirliyoruz
    scene.clearColor = new BABYLON.Color3(0.5, 0.8, 1);

    // Kamera oluşturma: Zıplamayı kontrol etmek için y ekseninde yukarı ve aşağı hareket edecek bir kamera.
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // Dinozorun ve engellerin görünmesi için bir ışık ekliyoruz
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Zemin oluşturma: Sonsuz bir yol gibi görünecek bir düzlem.
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 200, height: 200}, scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.5, 0.3); // Kahverengi zemin
    ground.material = groundMaterial;

    return scene;
};

// Sahneyi oluşturuyoruz
const scene = createScene();

// Oyun döngüsü: her karede sahneyi çiziyoruz
engine.runRenderLoop(function () {
    scene.render();
});

// Pencere boyutu değiştiğinde motorun boyutunu da güncelle
window.addEventListener("resize", function () {
    engine.resize();
});
