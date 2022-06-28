'use strict';
const turuLegNum = 2;
const kameLegNum = 4;
const takoLegNum = 8;
let animalsCheckbox = document.getElementsByName('animals_checkbox');
const makeTuruKameTakoZanButton = document.getElementById('make_turu_kame_tako_zan');
const questionDivided = document.getElementById('question_area');
const answerDivided = document.getElementById('answer_area');
const celebrationDivided = document.getElementById('celebration_area');
const tweetDivided = document.getElementById('tweet_area');

makeTuruKameTakoZanButton.onclick = function () {
    //チェックボックスにチェックの入った動物を配列に入れる
    let checkedAnimalsArray = new Array();
    for (let i = 0; i < animalsCheckbox.length; i++) {
        if (animalsCheckbox.item(i).checked) {
            checkedAnimalsArray.push(animalsCheckbox.item(i).value);
        }
    }
    //チェックボックスのチェックの数が二つでないときにアラートを出す
    if(checkedAnimalsArray.length != 2){
        alert('チェックボックスは二つ選択してください');
        return;
    }
    //Mapに動物とランダムに出した引数を入れる
    let animalsMap = returnAnimalsMap(checkedAnimalsArray);
    //Mapの値から足の合計足本数を出す
    let sumOfLegs = returnSumOfLegs(animalsMap);
    let sumOfHeads = returnSumOfHeads(animalsMap);
    //テスト時答えを見られる
    //console.log(animalsMap);
    //console.log(sumOfHeads);
    //問題文を作る
    let questionSentence = makeQuestionSentence(animalsMap,sumOfHeads,sumOfLegs);

    //問題文からツイート文を作成する
    function makeTweetSentence(){
        return `${questionSentence} を解いて正解しました。挑戦したくなったら → https://bluezhiaar.github.io/turukametako/index.html`;
    }
    //問題文表示エリアの作成
    questionDivided.innerText = '';
    // headerDividedの作成
    const headerDivided = document.createElement('div');
    headerDivided.setAttribute('class','card-header');
    headerDivided.innerText ='問';
   
    //bodyDividedの作成
    const bodyDivided = document.createElement('div');
    bodyDivided.setAttribute('class','card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class','card-text');
    paragraph.innerText = questionSentence;
    //questionDivided.appendChild(paragraph);
    bodyDivided.appendChild(paragraph);

    //questionDividedにBootstrapのスタイルを適用する
    questionDivided.setAttribute('class','card');
    questionDivided.setAttribute('style','max-width: 700px;');

    //headerDividedとbodyDividedをquestionをquestionDividedに差し込む
    questionDivided.appendChild(headerDivided);
    questionDivided.appendChild(bodyDivided);
    //解答入力エリアの作成
    answerDivided.innerText = '';
    const answerInput = document.createElement('input');
    answerDivided.appendChild(answerInput);

    const answerButton = document.createElement('button');
    answerButton.innerText = '回答する';
    answerDivided.appendChild(answerButton);

    //answerButtonのonclickを取得する
    answerButton.onclick = function(){

        
        if(parseInt(answerInput.value) === animalsMap.get(checkedAnimalsArray[0])){
            //console.log(animalsMap.get(checkedAnimalsArray[0]));
            //console.log('正解');
            celebrationDivided.innerText = '';
            const celebrationMessage = document.createElement('h1');
            celebrationMessage.innerText = '正解！！';
            celebrationDivided.appendChild(celebrationMessage);
            //ツイートエリアの作成
            tweetDivided.innerText = '';
            const anchor = document.createElement('a');
            const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" + encodeURIComponent('ツルカメタコ算メーカー') + "&hashtags=" + encodeURIComponent('算数')+"&ref_src=twsrc%5Etfw";
            const tweetSentence = makeTweetSentence();
        

            
            anchor.setAttribute('href',hrefValue);
            anchor.setAttribute('class',"twitter-hashtag-button");
            anchor.setAttribute('data-text',tweetSentence);
            anchor.innerText = 'Tweet #ツルカメタコ算メーカー';
            tweetDivided.appendChild(anchor);
            
           
            const script = document.createElement('script');
            script.setAttribute('src',"https://platform.twitter.com/widgets.js");
            tweetDivided.appendChild(script);
            
            
        }else{
           // console.log(animalsMap.get(checkedAnimalsArray[0]));
            //console.log('不正解');
            celebrationDivided.innerText = '';
            const celebrationMessage = document.createElement('h1');
            celebrationMessage.innerText = '不正解です';
            celebrationDivided.appendChild(celebrationMessage);
            //ツイートエリアのクリア
            tweetDivided.innerText = '';
            
        }
    }

}

//裏の作業として、動物の数を1~100の間でランダムにしたい。
/**
 * 1~100の間のランダムな数を返す
 * @param {}
 * @return {int}
 */
//TODO 0を確認したので0が出ないようにする
function returnRandomNumber1_100() {
    return Math.floor((Math.random() * 100) + 1);
}

//Mapのkeyを動物名、valueをランダムな匹数にして返す
/**
 * @param {array}
 * @return {Map}
 */
function returnAnimalsMap(arr){

    
    let map = new Map();
    for(let i = 0; i < arr.length;i++){
        map.set(arr[i],returnRandomNumber1_100());
    }

    return map;
}

//Mapの値を参照して足の合計本数を返す
/**
 * @param {Map}
 * @return {int}
 */
function returnSumOfLegs(animalmap){
    let legs = 0;
   if(animalmap.get('ツル')){
    legs = legs + animalmap.get('ツル')*2;
   }
   if(animalmap.get('カメ')){
    legs = legs + animalmap.get('カメ')*4;
   }
   if(animalmap.get('タコ')){
    legs = legs + animalmap.get('タコ')*8;
   }

   return legs;
}

//Mapを引数にして合計の頭数を返す
/**
 * @param {map}
 * @return {int}
 */
function returnSumOfHeads(animalsmap){
    let num = 0;
    animalsmap.forEach(function(value,key) {
        num = num + value;
    })
    return num;
}

/**
 * Mapと頭数と総足数から問題文を返す
 * @param {Map,int,int}
 * @return {int}
 */
function makeQuestionSentence(animalsmap,headsnum,legsnum){
    let keyArray = new Array();
    animalsmap.forEach(function(value,key){
        keyArray.push(key);
    })

    return `${keyArray[0]}と${keyArray[1]}が合計で${headsnum}匹います。足の数は合計で${legsnum}本です。${keyArray[0]}は何匹いますか？`;

}


