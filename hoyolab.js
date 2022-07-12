require('dotenv').config();
const fetch = require('node-fetch');
const ACT_ID = 'e202102251931481';

if (process.env.HOYOLAB_COOKIE && process.env.HOYOLAB_COOKIE.length != 0) {
    st(process.env.HOYOLAB_COOKIE);
}

if (process.env.HOYOLAB_COOKIES) {
    JSON.parse(process.env.HOYOLAB_COOKIES).forEach(COOKIE => {
        st(COOKIE);
    });
}

async function st(HOYOLAB_COOKIE) {
    // Check in to the community
    const response1 = await fetch("https://api-os-takumi.mihoyo.com/community/apihub/api/signIn", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "x-rpc-language": "en-us",
            "cookie": `${HOYOLAB_COOKIE}`
        },
        "referrer": "https://www.hoyolab.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"gids\":\"2\"}",
        "method": "POST",
        "mode": "cors"
    });
    const data1 = await response1.json();
    console.log('EXP Check in to the community: ', data1.message);

    // Get list of rewards
    const response2 = await fetch(`https://hk4e-api-os.mihoyo.com/event/sol/home?lang=en-us&act_id=${ACT_ID}`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "cookie": `${HOYOLAB_COOKIE}`
        },
        "referrer": "https://webstatic-sea.mihoyo.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
    });
    const data2 = await response2.json();
    const awards = data2.data.awards;

    // Sign in and claim reward
    const response3 = await fetch("https://hk4e-api-os.mihoyo.com/event/sol/sign?lang=en-us", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "cookie": `${HOYOLAB_COOKIE}`
        },
        "referrer": "https://webstatic-sea.mihoyo.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"act_id\":\"${ACT_ID}\"}`,
        "method": "POST",
        "mode": "cors"
    });

    const data3 = await response3.json();

    // Get Login info from Award Home
    const response4 = await fetch(`https://hk4e-api-os.mihoyo.com/event/sol/info?lang=en-us&act_id=${ACT_ID}`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "cookie": `${HOYOLAB_COOKIE}`
        },
        "referrer": "https://webstatic-sea.mihoyo.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
    });

    const data4 = await response4.json();
    if (data4.data !== null) {
        const totalSignDay = data4.data.total_sign_day;

        let selectedAward = {
            icon: '',
            name: '',
            cnt: ''
        };

        for (let index = 0; index < awards.length; index++) {
            const award = awards[index];

            if (index === (totalSignDay - 1)) {
                selectedAward = award;
            }
        }

        if (data3.retcode !== 0) {
            console.log(`${data3.message} and you already claim ${selectedAward.cnt} ${selectedAward.name}!`);
        } else {
            console.log(`Congrats traveler! You get ${selectedAward.cnt} ${selectedAward.name}!`);
        }
    } else {
        console.log('Login failed! Please make sure the HOYOLAB_COOKIE value is correct!');
    }
}