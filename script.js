let randomNumber;
let winPositions = [];
let lifes = 5;
let smileFaces = 3;

$(document).ready(async () => {
    randomNumber = Math.floor(Math.random() * 999999999999) + 111111111111;
    randomArray = randomNumber.toString().split("");
    randomArray.forEach((n) => {
        const num = Number(n);
        if(winPositions.length < 3 && num > 0 && !winPositions.find(e => e === num)) {
            winPositions.push(num);
        }
    })
    console.log(winPositions);
    const hash = await digestMessage(randomNumber);
    $('#sha').html(hash);

    $('.game-click').click(function (e) {
        const number = $(this).attr("data-number");
        const exists = winPositions.find((e) => Number(e) === Number(number));

        if (exists) {
            $(this).siblings('.game-happy').css('height', '100%');
            $(this).css('display', 'none');
            smileFaces--;
            if (smileFaces === 0) {
                $('.screen-end').css('visibility', 'visible');
                $('.screen-end-lose').css('display', 'none');
                $('.screen-end-win').css('visibility', 'visible');
                $('#pre-hash-number').html('Number: ' + randomNumber);
            }
        } else {
            $(this).siblings('.game-sad').css('height', '100%');
            $(this).css('display', 'none');
            $('#' + 'life-' + lifes.toString()).css('display', 'none');
            lifes--;
            if (lifes === 0) {
                $('.screen-end').css('visibility', 'visible');
                $('.screen-end-lose').css('visibility', 'visible');
                $('.screen-end-win').css('display', 'none');

                $('#pre-hash-number').html('Number: ' + randomNumber);
            }
        }
    });

})

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}
