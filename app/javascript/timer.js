document.addEventListener("turbo:load", function () {
  console.log("タイマー機能のjsファイルです！")

  // スタート、ストップボタン(input)を定数に代入
  let start_stop_button = document.querySelector("#startStopButton");
  // タイマー画面に表示される時間
  let timerNow = document.querySelector("#timerNow");
  // 休憩時間に出現する文字
  let intervalComment = document.querySelector("#intervalComment");
  // 最初にスタートボタンを押した時のミリ秒
  let startTime;
  // ポモタイマーストップ、再開するためのインターバルid
  let nIntervId;
  // ポモ残り時間。初期値は25分
  let remainingTime = 1500000;
  // ポモ変数
  let i = 0;
  // ポモドーロ回数
  let pomodoro = document.querySelector("#pomodoro");
  // 学習中、休憩中を判定する変数
  let learningStatus = true;
  // 動物の鳴き声
  let cryAnimals = document.querySelectorAll(".cry");

  // 鳴き声データをランダムで取り出す
  const randomCry = () => {
    let num = Math.floor(Math.random() * cryAnimals.length);
    let cryNotice = cryAnimals.item(num);
    cryNotice.play();
  };

  // timeにはポモドーロの残り時間(ミリ秒)が代入される
  const msecToSecString = (time) => {
    // ミリ秒から秒に変換。コンマは必要ないのでMath.floorで切り捨て
    time = Math.floor(time / 1000);

    const seconds = time % 60;
    const minutes = Math.floor(time / 60);

    let secondStr = (seconds < 10 ? "0" : "") + String(seconds);
    let minuteStr = (minutes < 10 ? "0" : "") + String(minutes);

    return minuteStr + ":" + secondStr;
  }

  // 休憩時間用の時間作成
  const intervalTime = () => {
    startTime = new Date().getTime() + remainingTime;
    nIntervId = setInterval(timerCount, 1000);
  }

  // スタート時間と現在時間の経過を計算する関数
  const timerCount = () => {
    let nowTime = new Date().getTime();
    remainingTime = startTime - nowTime;
    if (remainingTime < 0) {
      clearInterval(nIntervId);
      if (learningStatus) {
        remainingTime = 300000;
        i = i + 1;
        pomodoro.innerHTML = i;
        learningStatus = false;
        intervalComment.innerHTML = "動物鑑賞中...";
        startStopButton.value = "再開";
        intervalTime();
      } else {
        resumeStudying()
      }
      randomCry();
    }
    timerNow.innerHTML = msecToSecString(remainingTime);
  }

  // 学習再開時の処理記入
  const resumeStudying = () => {
    remainingTime = 1500000;
    learningStatus = true;
    intervalComment.innerHTML = "";
    startStopButton.value = "スタート";
  }

  // タイマーのボタンを押した時の処理を記述する
  const timerSwitch = () => {
    randomCry();
    if (start_stop_button.value === "スタート") {
      start_stop_button.value = "ストップ";
      startTime = new Date().getTime() + remainingTime;
      nIntervId = setInterval(timerCount, 1000);
    } else if (start_stop_button.value === "ストップ") {
      // ストップを押した時の処理
      start_stop_button.value = "スタート";
      clearInterval(nIntervId);
    } else {
      // 再開を押した時の処理
      clearInterval(nIntervId);
      resumeStudying();
      timerNow.innerHTML = msecToSecString(remainingTime);
    };
  };

  // スタート、ストップ,再開ボタンが押された時の処理
  start_stop_button.addEventListener('click', timerSwitch);
});