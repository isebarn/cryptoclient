/**
 * Copyright (C) 2018 Luis Bergmann, https://luisbergmann.com/
 */
const CoreAudio = new function () {
  // notes and octaves
  const notes = [0, 2, 3, 5, 7, 10]
  const octaves = [0, 12, 24, 36]

  // sound chain
  // it can get cpu intensive with the reverb
  const reverb = T('reverb', { room: 0.7, damp: 0.2, mix: 0.3 }).play()

  // organism sound chain
  const orgOsc = T('pulse')
  const orgEnv = T('perc', { a: 1, r: 30 })
  const orgOscEnv1 = T('OscGen', { osc: orgOsc, env: orgEnv, mul: 0.1 })
  reverb.append(orgOscEnv1)

  const orgOsc2 = T('sin')
  const orgEnv2 = T('perc', { a: 10, r: 500 })
  const orgOscEnv2 = T('OscGen', { osc: orgOsc2, env: orgEnv2, mul: 0.2 })
  reverb.append(orgOscEnv2)

  // shield sound chain
  const shieldNoiseOsc = T('fnoise', { freq: 50, mul: 0.1 })
  const shieldOsc = T('pulse', { freq: 50, mul: 0.1 })
  const shieldEnv = T('perc', { a: 10, r: 100 }, shieldNoiseOsc, shieldOsc).play()

  // play synth note every time a organism is created
  this.playSynth = function (objPos) {
    // choose and play synth note
    const midicps = T('midicps')
    const note = notes[Math.random() * 5 | 0]
    const octave = octaves[Math.random() * 3 | 0]

    if (Math.random() < 0.7) {
      // for saving cpu not every time there's a organism a oscillator plays
      const playOsc = T('sin', { freq: midicps.at(60 + note + octave), mul: 0.2 })
      const playEnv = T('perc', { r: 3000 }, playOsc).bang()
      const eq = T('eq', { params: { hpf: [200, 1], lpf: [2000, 1] } }, playEnv)
      const tremParam = T('param', { value: 1 }).to(Math.random() * 5 + 5, 3000)
      const tremOsc = T('sin', { freq: tremParam, mul: 0.6 })
      const trem = T('*', eq, tremOsc)
      const panParam = T('param', { value: objPos }).expTo(0.5, 3000)
      const pan = T('pan', { pos: panParam }, trem).play()

      const interval = T('timeout', { timeout: 3000 }).on('ended', function () {
        tremOsc.pause()
        trem.pause()
        pan.pause()
      }).start()
    }
  }

  this.organismDead = function () {
    const midicps = T('midicps')
    const note = notes[Math.random() * 5 | 0]
    const octave = octaves[Math.random() * 3 | 0]

    orgOscEnv1.noteOn((180 + note + octave), 80)
    orgOscEnv2.noteOn((60 + note + octave), 80)

    // low sound
    const lowOsc = T('sin', { freq: Math.random() * 50 + 50, mul: 0.6 })
    const losOscEq = T('eq', { params: { hpf: [150, 1] } }, lowOsc)
    const lowPscEnv = T('perc', { a: 70, r: 100 }, losOscEq).bang().play()
  }

  this.playShield = function () {
    shieldEnv.bang()
  }

  this.playGameOver = function () {
    // var downer = T("param", {value:10000}).to(50, 2000);
    const osc = T('fnoise', { freq: 400, mul: 0.1 })
    const env = T('perc', { a: 10, r: 2000 }, osc).bang().play()
  }

  this.energyUp = function () {
    const energyFreq = T('param', { value: 80 }).to(Math.random() * 500 + 500, '1sec')
    const osc1 = T('sin', { freq: energyFreq, mul: 0.6 })
    const osc1Eq = T('eq', { params: { hpf: [150, 1] } }, osc1)
    const env = T('perc', { a: 50, r: 500 }, osc1Eq).bang().play()
  }

  this.energyDown = function () {
    // sine osc with tremolo
    const downer2 = T('param', { value: (Math.random() * 100 + 100) }).to(10, 1000)
    const osc2 = T('sin', { freq: downer2, mul: 0.1 })
    const osc2Eq = T('eq', { params: { hpf: [150, 1] } }, osc2)
    const downer3 = T('param', { value: (Math.random() * 50 + 50) }).to(30, 1000)
    const osc3 = T('pulse', { freq: downer3, mul: 0.1 })
    const osc3Eq = T('eq', { params: { hpf: [150, 1] } }, osc3)
    const env2 = T('perc', { r: 800 }, osc2Eq, osc3Eq).bang()
    const trem2param = T('param', { value: Math.random() * 5 + 1 }).to(1, 1000)
    const trem2 = T('sin', { freq: trem2param, mul: 0.7 })
    const oscTrem2 = T('*', env2, trem2).play()
  }
}()
