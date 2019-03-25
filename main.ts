/*****************************************************************************
* | Description :	BitCar extension for micro:bit
* | Developer   :   CH Makered
* | More Info   :	http://chmakered.com/
******************************************************************************/

enum trick {
    //% block="arise"
    getUp,
    //% block=" +left"
    L_forward = AnalogPin.P14,
    //% block=" -right"
    R_backward = AnalogPin.P15,
    //% block=" +right"
    R_forward = AnalogPin.P16,
}


/**
 * Provides access to BitCar blocks for micro: bit functionality.
 */
//% color=190 icon="\uf126" block= "BitCar"
//% groups="['Analog', 'Digital', 'I2C', 'Grove Modules']"
namespace BitCar {

    let L_backward = AnalogPin.P13;
    let L_forward = AnalogPin.P14;
    let R_backward = AnalogPin.P15;
    let R_forward = AnalogPin.P16;

    /**
    * Set the motors' speed of BitCar
    */
    //% blockId=move
    //% block="BitCar left motor $left \\%, right motor$right \\%"
    //% left.shadow="speedPicker"
    //% right.shadow="speedPicker"
    export function move(left: number, right: number) {
        if (left > 0) {
            pins.analogWritePin(L_backward, 0);
            pins.analogWritePin(L_forward, Math.map(left, 0, 100, 0, 1023));
        } else if (left < 0) {
            pins.analogWritePin(L_backward, Math.map(Math.abs(left), 0, 100, 0, 1023));
            pins.analogWritePin(L_forward, 0);
        }
        if (right > 0) {
            pins.analogWritePin(R_backward, 0);
            pins.analogWritePin(R_forward, Math.map(right, 0, 100, 0, 1023));
        } else if (left < 0) {
            pins.analogWritePin(R_backward, Math.map(Math.abs(right), 0, 100, 0, 1023));
            pins.analogWritePin(R_forward, 0);
        }
    }

    /**
    * BitCar stop
    */
    //% blockId=stop
    //% block="BitCar stop"
    export function stop() {
        pins.analogWritePin(L_backward, 0);
        pins.analogWritePin(L_forward, 0);
        pins.analogWritePin(R_backward, 0);
        pins.analogWritePin(R_forward, 0);
    }

    /**
    * When BitCar is still, make it stand up from the ground, try to tweak or increase the charge time(ms) if it failed to arises
    */
    //% blockId=standup_still
    //% block="BitCar stand up, charge time $charge|(ms)"
    //% charge.defl=250
    export function standup_still(charge: number) {
        move(-100, -100);
        basic.pause(200);
        move(100, 100);
        basic.pause(charge);
    }

    /**
    * When BitCar is moving, make it stand up from the ground (when it's still), try to tweak or increase the charge time(ms) if it failed to arises
    */
    //% blockId=standup_moving
    //% block="BitCar stand up on the move, charge time $charge|(ms)"
    //% charge.defl=250
    export function standup_moving(charge: number) {
        stop();
        basic.pause(200);
        move(-100, -100);
        basic.pause(200);
        move(100, 100);
        basic.pause(charge);
    }
}