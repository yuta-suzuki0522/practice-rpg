
const FONT ="48px monospase";
const HEIGHT     = 480;   //仮想画面高さ
const WIDTH      = 800;   //仮想画面幅
const MAP_HEIGHT = 30;   //マップ高さ
const MAP_WIDTH  = 30;   //マップ幅
const SMOOTH     = 0;     //補間処理
const TILECOLUMN = 8;     //タイル桁数
const TILEROW    = 8;     //タイル行数
const TILESIZE   = 16;    //タイルサイズ（ドット）


let gScreen;            //仮想画面
let gFrame = 0;         //内部カウンタ
let gImaMap;            //画像，マップ
let gWidth;             //実画面の幅
let gHeight;            //実画面の高さ


const gMap = [
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,
    32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,
]


function DrawMain(){    //仮想画面に画像描画
    
    const g = gScreen.getContext("2d")       //仮想2dの描画コンテキストを取得
    
    for( let y = 0; y < 128; y++ ){       //y軸にいくつ画像を貼るかと，その増減
        for( let x = 0; x < 128; x++){   //x軸にいくつ画像を貼るかと，その増減
            DrawTile( g, x*TILESIZE, y*TILESIZE, gMap[ y * MAP_WIDTH + x ]); //マップチップの種類を選択

        }
    }

    g.font  = FONT      //文字フォントの設定
    g.fillText("Hello World", gFrame / 10,64);
};

function DrawTile( g, x, y, idx)
{
    const ix = (idx % TILECOLUMN) * TILESIZE;
    const iy = Math.floor(idx / TILECOLUMN) * TILESIZE;
    g.drawImage( gImgMap,ix, iy, TILESIZE, TILESIZE ,x, y , TILESIZE ,TILESIZE);
}

function WmPaint()　//描画ゾーン
{
    
    DrawMain();//仮想画面に画像描写
    const ca = document.getElementById("main")  //キャンバスの取得
    const g = ca.getContext("2d")       //2dの描画コンテキストを取得
    
    
    g.drawImage(gScreen, 0, 0,gScreen.width, gScreen.height, 0, 0, gWidth, gHeight);//仮想画面のイメージ（gScreen）を実画面に転送
}

//ブラウザサイズ変更イベント
function WmSize(){
const ca = document.getElementById("main");
    ca.width = window.innerWidth;//キャンバス幅をブラウザ幅へ変更
    ca.height = window.innerHeight;//キャンバスの高さをブラウザの高さへ変更

    const g = ca.getContext("2d")       //2dの描画コンテキストを取得
    g.imageSmoothingEnabled = g.imageSmoothingEnabled = SMOOTH; //ドット絵の補間処理

    //実画面サイズを計測。ドットのアスペクト比を維持したままでの最大サイズを計測する↓
    gWidth = ca.width
    gHeight = ca.height
    if(gWidth/WIDTH < gHeight/HEIGHT){
        gHeight = gWidth * HEIGHT / WIDTH
    }else{
        gWidth = gHeight * WIDTH / HEIGHT
    }
}

//タイマーイベント発生時の処理
function WmTimer()
{
    gFrame++;
    WmPaint();
}

    //ブラウザ起動イベント
window.onload = function()
    {
        gImgMap = new Image();  
        gImgMap.src = "mapchip2_0724/mapchip2/mapchip/base.png";
        
        gScreen = document.createElement("canvas") //仮想画面の作成
        gScreen.width = WIDTH;
        gScreen.height = HEIGHT

        WmSize();       //画面サイズ初期化
       window.addEventListener("resize", function(){ WmSize()});//ゲーム中のウィンドウサイズ変更に対応
       setInterval( function(){WmTimer() }, 33);        //33ms間隔でWmtimer（）を呼び出す
    }

