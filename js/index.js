let index = 0;
let attempts = 0;
const answer = "APPLE";
let timer;

function appStart() {
    const displayGameOver = () => {
        const div = document.createElement("div");
        div.innerText = " 게임이 종료됐습니다.";
        div.style =
            "display: flex; justify-content: center; align-items: center; position:absolute; top:30vh; left:40vw; background-color:white; width:200px; height:100px;";
        document.body.appendChild(div);
    };

    const nextLine = (e) => {
        if (attempts == 6) return;
        attempts += 1;
        index = 0;
    };

    const gameover = (e) => {
        window.removeEventListener("keydown", handleKeyDown);
        displayGameOver();
        clearInterval(timer);
    };

    const handleBackspace = (thisBlock) => {
        if (index > 0) {
            const preBlock = document.querySelector(
                `.board-block[data-index='${attempts}${index - 1}']`
            );
            preBlock.innerText = "";
        }
        if (index != 0) index -= 1;
    };

    const handleEnterKey = (event) => {
        let corret_letter = 0;
        for (let i = 0; i < 5; i++) {
            const block = document.querySelector(
                `.board-block[data-index='${attempts}${i}']`
            );
            const letter = block.innerText;
            const answer_letter = answer[i];
            if (letter == answer_letter) {
                block.style.background = "#6AAA64";
                corret_letter += 1;
            } else if (answer.includes(letter)) {
                block.style.background = "#C9B458";
            } else {
                block.style.background = "#787C7E";
            }
            block.style.color = "white";
        }

        if (corret_letter == 5) gameover();
        else nextLine();
    };

    const handleKeyDown = (event) => {
        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(
            `.board-block[data-index='${attempts}${index}']`
        );

        if (keyCode === 8) {
            handleBackspace();
        } else if (index === 5) {
            if (keyCode === 13) {
                handleEnterKey();
            } else {
                return;
            }
        } else if (keyCode >= 65 && keyCode <= 90) {
            thisBlock.innerText = key;
            index += 1;
        }
    };

    const startTimer = (e) => {
        const 시작_시간 = new Date();

        function setTime() {
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
            const timerDiv = document.querySelector("#timer");
            timerDiv.innerText = `${분}:${초}`;
        }

        timer = setInterval(setTime, 1000);
    };

    startTimer();
    window.addEventListener("keydown", handleKeyDown);
}

appStart();
