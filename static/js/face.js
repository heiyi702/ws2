var data=[
        //[Smile][Grimace][Drool][Scowl][CoolGuy][Sob][Shy][Silent]
        {src:'static/img/face/微笑.png',con:'[Smile]'},
        {src:'static/img/face/撇嘴.png',con:'[Grimace]'},
        {src:'static/img/face/色.png',con:'[Drool]'},
        {src:'static/img/face/发呆.png',con:'[Scowl]'},
        {src:'static/img/face/酷.png',con:'[CoolGuy]'},
        {src:'static/img/face/大哭.png',con:'[Sob]'},
        {src:'static/img/face/害羞.png',con:'[Shy]'},
        {src:'static/img/face/住嘴.png',con:'[Silent]'},
        //[Sleep][Cry][Awkward][Angry][Tongue][Grin][Surprise][Frown]
        {src:'static/img/face/睡.png',con:'[Sleep]'},
        {src:'static/img/face/流泪.png',con:'[Cry]'},
        {src:'static/img/face/尴尬.png',con:'[Awkward]'},
        {src:'static/img/face/发怒.png',con:'[Angry]'},
        {src:'static/img/face/调皮.png',con:'[Tongue]'},
        {src:'static/img/face/呲牙.png',con:'[Grin]'},
        {src:'static/img/face/惊讶.png',con:'[Surprise]'},
        {src:'static/img/face/难过.png',con:'[Frown]'},
        //[Blush][Scream][Puke][Chuckle][Joyful][Slight][Smug][Laugh]
        {src:'static/img/face/囧.png',con:'[Blush]'},
        {src:'static/img/face/疯了.png',con:'[Scream]'},
        {src:'static/img/face/吐.png',con:'[Puke]'},  
        {src:'static/img/face/偷笑.png',con:'[Chuckle]'},
        {src:'static/img/face/愉快.png',con:'[Joyful]'},
        {src:'static/img/face/白眼.png',con:'[Slight]'},
        {src:'static/img/face/傲慢.png',con:'[Smug]'},
        {src:'static/img/face/憨笑.png',con:'[Laugh]'},
        //[Rose][ThumbsUp][ThumbsDown][Shake][Fight][Facepalm][Fist][Heart]
        {src:'static/img/face/玫瑰.png',con:'[Rose]'},
        {src:'static/img/face/赞.png',con:'[ThumbsUp]'},
        {src:'static/img/face/踩.png',con:'[ThumbsDown]'},
        {src:'static/img/face/握手.png',con:'[Shake]'},
        {src:'static/img/face/抱拳.png',con:'[Fight]'},
        {src:'static/img/face/捂脸.png',con:'[Facepalm]'},
        {src:'static/img/face/拳头.png',con:'[Fist]'},
        {src:'static/img/face/心.png',con:'[Heart]'},
];

var faceData={
        '[Smug]':'<img class="txtFace" src="static/img/face/傲慢.png" />',
        '[Slight]':'<img class="txtFace" src="static/img/face/白眼.png" />',
        '[Grin]':'<img class="txtFace" src="static/img/face/呲牙.png" />',
        '[Sob]':'<img class="txtFace" src="static/img/face/大哭.png" />',
        '[Scream]':'<img class="txtFace" src="static/img/face/疯了.png" />',
        '[Shy]':'<img class="txtFace" src="static/img/face/害羞.png" />',
        '[Laugh]':'<img class="txtFace" src="static/img/face/憨笑.png" />',
        '[Surprise]':'<img class="txtFace" src="static/img/face/惊讶.png" />',
        '[Cry]':'<img class="txtFace" src="static/img/face/流泪.png" />',
        '[Frown]':'<img class="txtFace" src="static/img/face/难过.png" />',
        '[Grimace]':'<img class="txtFace" src="static/img/face/撇嘴.png" />',
        '[Tongue]':'<img class="txtFace" src="static/img/face/调皮.png" />',
        '[Chuckle]':'<img class="txtFace" src="static/img/face/偷笑.png" />',
        '[Joyful]':'<img class="txtFace" src="static/img/face/愉快.png" />',
        '[Smile]':'<img class="txtFace" src="static/img/face/微笑.png" />',
        '[Silent]':'<img class="txtFace" src="static/img/face/住嘴.png" />',
        '[Awkward]':'<img class="txtFace" src="static/img/face/尴尬.png" />',
        '[Angry]':'<img class="txtFace" src="static/img/face/发怒.png" />',
        '[Scowl]':'<img class="txtFace" src="static/img/face/发呆.png" />',
        '[Drool]':'<img class="txtFace" src="static/img/face/色.png" />',
        '[Sleep]':'<img class="txtFace" src="static/img/face/睡.png" />',
        '[Blush]':'<img class="txtFace" src="static/img/face/囧.png" />',
        '[CoolGuy]':'<img class="txtFace" src="static/img/face/酷.png" />',
        '[Puke]':'<img class="txtFace" src="static/img/face/吐.png" />',
        '[囧]':'<img class="txtFace" src="static/img/face/囧.png" />',
        '[Rose]':'<img class="txtFace" src="static/img/face/玫瑰.png" />',
        '[ThumbsUp]':'<img class="txtFace" src="static/img/face/赞.png" />',
        '[ThumbsDown]':'<img class="txtFace" src="static/img/face/踩.png" />',
        '[Shake]':'<img class="txtFace" src="static/img/face/握手.png" />',
        '[Fight]':'<img class="txtFace" src="static/img/face/抱拳.png" />',
        '[Facepalm]':'<img class="txtFace" src="static/img/face/捂脸.png" />',
        '[Fist]':'<img class="txtFace" src="static/img/face/拳头.png" />',
        '[Heart]':'<img class="txtFace" src="static/img/face/心.png" />',

        '/:,@o':'<img class="txtFace" src="static/img/face/傲慢.png" />',
        '/::d':'<img class="txtFace" src="static/img/face/白眼.png" />',
        '/::D':'<img class="txtFace" src="static/img/face/呲牙.png" />',
        '/::<':'<img class="txtFace" src="static/img/face/大哭.png" />',
        '/::|':'<img class="txtFace" src="static/img/face/发呆.png" />',
        '/::@':'<img class="txtFace" src="static/img/face/发怒.png" />',
        '/::Q':'<img class="txtFace" src="static/img/face/疯了.png" />',
        '/::-|':'<img class="txtFace" src="static/img/face/尴尬.png" />',
        '/::$':'<img class="txtFace" src="static/img/face/害羞.png" />',
        '/::>':'<img class="txtFace" src="static/img/face/憨笑.png" />',
        '/::O':'<img class="txtFace" src="static/img/face/惊讶.png" />',
        '/::-o':'<img class="txtFace" src="static/img/face/囧.png" />',
        '/:8-)':'<img class="txtFace" src="static/img/face/酷.png" />',
        '/::\'(':'<img class="txtFace" src="static/img/face/流泪.png" />',
        '/::(':'<img class="txtFace" src="static/img/face/难过.png" />',
        '/::~':'<img class="txtFace" src="static/img/face/撇嘴.png" />',
        '/::B':'<img class="txtFace" src="static/img/face/色.png" />',
        '/::Z':'<img class="txtFace" src="static/img/face/睡.png" />',
        '/::P':'<img class="txtFace" src="static/img/face/调皮.png" />',
        '/:,@P':'<img class="txtFace" src="static/img/face/偷笑.png" />',
        '/:,@-D':'<img class="txtFace" src="static/img/face/愉快.png" />',
        '/::)':'<img class="txtFace" src="static/img/face/微笑.png" />',
        '/::X':'<img class="txtFace" src="static/img/face/住嘴.png" />',
        '/::T':'<img class="txtFace" src="static/img/face/吐.png" />',
}; 
