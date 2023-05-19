import React, {useEffect, useState} from "react";
import IP_URL from "../services/IP";
import {getData} from "./HomePage";






const MakeMove = async (token, sign) => {
    try {
        return fetch(IP_URL + '/games/move/{sign}', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
                gameId: await getData('gameId'),
                sign: sign
            },
        })
            .then((response) => response.json())
    } catch (error) {
        console.log(error.message)
    }
}

const Game