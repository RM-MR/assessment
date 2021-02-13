'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * All element of children you picked up are deleted
 * @param {HTMLElement} element HTMLelement
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        //As far as there is same element, it is deleted.
        element.removeChild(resultDivided.firstChild);
    }  
}

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //In tha case the empty name end handling
        return;
    }
    
    //Initialization of the area to show the result of this diagnosis
    removeAllChildren(resultDivided);

    // Making the area to disply the result this diagnosis
    const h3 = document.createElement('h3');
    h3.innerText = 'The result of diagnosis';
    resultDivided.appendChild(h3);
    
    const p = document.createElement('p');
    const result = assessment(userName);
    p.innerText = result;
    resultDivided.appendChild(p);
    
    // TODO make the area to tweet
    removeAllChildren(tweetDivided);
    const a = document.createElement('a');
    const href = 
      "https://twitter.com/intent/tweet?button_hashtag="
      + encodeURIComponent('あなたのいいところ')
      + '&ref_src=twsrc%5Etfw';
    
    a.setAttribute('href',href);
    a.className = 'twitter-hashtag-button';
    a.setAttribute('data-text', result);
    a.innerText = 'Tweet #あなたのいいところ';
    
    tweetDivided.appendChild(a);

    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');

    tweetDivided.appendChild(script);
};

const answers = [
   '{userName} have a good voice.{userName} have a distinctive voice which can stick heart',
   '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
   '{userName} have a passion.{userName}! Your passion gives people influence.',
   '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
   '{userName} have knowleage.博識な{userName}を多くの人が頼りにしています。',
   '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
   '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
   '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
   '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
   '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
   '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
   '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
   '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
   '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
   '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
   '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。st answers = {}',
];

/**
 * function to return the result which diagnosed your name.
 * @param {string} userName user name 
 * @return {string} diagnosis result
 */
function assessment(userName){
  let number = 0;
  for (let i =0; i < userName.length; i++) {
      number += userName.charCodeAt(i);
  }
  let index = number % answers.length;
  return answers[index].replace(/\{userName\}/g, userName);
}

