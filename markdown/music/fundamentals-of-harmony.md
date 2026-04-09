# The Fundamental Basis of Harmony

Rhythm and pitch are the same thing at different speeds.

A kick drum hitting once per second is a beat. That same kick hitting 440 times per second is the note A. Speed up any repeating pulse enough and it becomes a pitch.

## Rhythm becomes pitch

If one pulse plays 4 times while another plays 5 times, that's a 5:4 polyrhythm. Speed it up into the audible range and you get a major third. The frequency ratio of a major third is 5:4. Same ratio, different speed.

## Polyrhythms as intervals

Every polyrhythm maps to an interval:

```
1:1   polyrhythm = unison
16:15 polyrhythm = minor second
9:8   polyrhythm = major second
6:5   polyrhythm = minor third
5:4   polyrhythm = major third
4:3   polyrhythm = perfect fourth
7:5   polyrhythm = tritone
3:2   polyrhythm = perfect fifth
8:5   polyrhythm = minor sixth
5:3   polyrhythm = major sixth
9:5   polyrhythm = minor seventh
15:8  polyrhythm = major seventh
2:1   polyrhythm = octave
```

Try it yourself. Use the slider to speed up a polyrhythm from a countable beat into an audible pitch:

<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; background: #fafafa;">
<div style="text-align: center; margin-bottom: 15px;">
<label style="font-size: 16px; color: #333;">Speed: <span id="speed-display">2</span> Hz</label><br/>
<input type="range" id="speed-slider" min="1" max="600" value="2" style="width: 80%; margin: 10px 0;">
<div style="display: flex; justify-content: space-between; width: 80%; margin: 0 auto; color: #888; font-size: 12px;">
<span>rhythm</span><span>pitch</span>
</div>
</div>
<div style="text-align: center; margin-bottom: 10px;">
<label style="color: #333;">Ratio: </label>
<select id="ratio-select" style="font-size: 14px; padding: 4px; background: #fff; color: #333; border: 1px solid #ccc;">
<option value="16,15">16:15 (minor second)</option>
<option value="9,8">9:8 (major second)</option>
<option value="6,5">6:5 (minor third)</option>
<option value="5,4" selected>5:4 (major third)</option>
<option value="4,3">4:3 (perfect fourth)</option>
<option value="7,5">7:5 (tritone)</option>
<option value="3,2">3:2 (perfect fifth)</option>
<option value="8,5">8:5 (minor sixth)</option>
<option value="5,3">5:3 (major sixth)</option>
<option value="9,5">9:5 (minor seventh)</option>
<option value="15,8">15:8 (major seventh)</option>
<option value="2,1">2:1 (octave)</option>
</select>
</div>
<div style="text-align: center;">
<button id="play-btn" style="font-size: 16px; padding: 8px 24px; cursor: pointer; background: #fff; color: #333; border: 1px solid #ccc; border-radius: 4px;">Play</button>
</div>
</div>

<script>
(function() {
  var ctx = null;
  var playing = false;
  var timer1 = null, timer2 = null;
  var osc1 = null, osc2 = null, gain = null;
  var slider = document.getElementById('speed-slider');
  var display = document.getElementById('speed-display');
  var ratioSelect = document.getElementById('ratio-select');
  var btn = document.getElementById('play-btn');
  var CROSSOVER = 30;

  function getRatio() {
    return ratioSelect.value.split(',').map(Number);
  }

  function click(time, freq) {
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.frequency.value = freq > 10 ? freq * 8 : 800;
    o.connect(g);
    g.connect(gain);
    g.gain.setValueAtTime(0.3, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    o.start(time);
    o.stop(time + 0.05);
  }

  function scheduleClicks(baseFreq, ratio) {
    var freq1 = baseFreq;
    var freq2 = baseFreq * ratio[0] / ratio[1];
    var interval1 = 1 / freq1;
    var interval2 = 1 / freq2;

    function loop1() {
      click(ctx.currentTime, 800);
      timer1 = setTimeout(loop1, interval1 * 1000);
    }
    function loop2() {
      click(ctx.currentTime, 1200);
      timer2 = setTimeout(loop2, interval2 * 1000);
    }
    loop1();
    loop2();
  }

  function startOscillators(baseFreq, ratio) {
    osc1 = ctx.createOscillator();
    osc2 = ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.value = baseFreq;
    osc2.frequency.value = baseFreq * ratio[0] / ratio[1];
    osc1.connect(gain);
    osc2.connect(gain);
    osc1.start();
    osc2.start();
  }

  function stopSound() {
    if (timer1) clearTimeout(timer1);
    if (timer2) clearTimeout(timer2);
    timer1 = null; timer2 = null;
    if (osc1) { try { osc1.stop(); } catch(e) {} }
    if (osc2) { try { osc2.stop(); } catch(e) {} }
    osc1 = null; osc2 = null;
  }

  function updateSound() {
    var base = parseFloat(slider.value);
    var ratio = getRatio();
    stopSound();
    if (base < CROSSOVER) {
      scheduleClicks(base, ratio);
    } else {
      startOscillators(base, ratio);
    }
  }

  function start() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    gain = ctx.createGain();
    gain.gain.value = 0.15;
    gain.connect(ctx.destination);
    playing = true;
    btn.textContent = 'Stop';
    updateSound();
  }

  function stop() {
    stopSound();
    if (ctx) ctx.close();
    ctx = null;
    playing = false;
    btn.textContent = 'Play';
  }

  btn.addEventListener('click', function() {
    if (playing) stop(); else start();
  });

  slider.addEventListener('input', function() {
    var val = parseFloat(slider.value);
    display.textContent = val;
    if (playing) updateSound();
  });

  ratioSelect.addEventListener('change', function() {
    if (playing) updateSound();
  });
})();
</script>

Simpler ratios sound more consonant. 2:1 (octave) sounds almost like the same note. 3:2 (fifth) is open and stable. The more complex the ratio, the more dissonant it gets.

## The harmonic series

These ratios come from physics, not music theory. Any vibrating object, a string, a column of air, a drumhead, even a bridge, produces [overtones at integer multiples of its fundamental frequency](https://en.wikipedia.org/wiki/Harmonic). This happens whether or not anyone is listening.

Pluck a string tuned to C and you don't just hear C:

```
1st harmonic: C   (fundamental)
2nd harmonic: C   (octave)
3rd harmonic: G   (fifth)
4th harmonic: C   (two octaves)
5th harmonic: E   (major third)
6th harmonic: G   (fifth)
7th harmonic: Bb  (minor seventh, slightly flat)
```

A major chord (C, E, G) is just the first few harmonics of a single note. The chord is already inside the note.

This is why power chords through a fuzz pedal sound so huge. A power chord is just a root and a fifth, no third. But when you run it through distortion, the clipping generates overtones, and the 5th harmonic is a major third. The fuzz adds it for you. Kurt Cobain would often add a third to his power chords, but the fuzz and blown-out amps complemented it by reinforcing that same harmonic. The distortion and the played note stack on top of each other, which is part of why Nirvana sounds so thick.

## The fractal part

The harmonic series is self-similar. The overtones have the same ratio relationships to each other that the fundamental has to its overtones. Same pattern at every scale.

Rhythm, pitch, and timbre are all the same thing at different speeds:

```
~1-10 Hz:       rhythm (beats you can count)
~20-20,000 Hz:  pitch (notes you can hear)
~20,000+ Hz:    timbre (the color of a sound)
```

A 3:2 polyrhythm and a perfect fifth are the same ratio. Slow it down and you can tap it. Speed it up and you can sing it. Speed it up more and it becomes the character of the sound itself.

## Why simple ratios sound good

Simple ratio, waveforms line up often. 2:1 lines up every other cycle. 3:2 every 2-3 cycles. That's consonance. Complex ratios like 45:32 (tritone) rarely line up. That's dissonance. Home and tension are baked into the physics.

## Equal temperament

Modern Western music divides the octave into 12 equal half steps, which means every interval except the octave is slightly out of tune compared to pure ratios. A pure major third (5:4) is 386 cents. Equal temperament gives you 400 cents. Close but not exact. The tradeoff is you can play in any key without retuning.

A guitar and a piano playing the same chord will sound slightly different. Pianos are tuned to equal temperament, and guitars are too, but guitars have an extra problem: the frets are straight lines across strings with different thicknesses and tensions. Each string has a slightly different ratio of vibrating length to pitch, so fretting the same fret on different strings doesn't give you perfectly equal half steps. This is why guitars are never truly in tune. You can intonate them close, but it's always a compromise. Some luthiers use fanned or true temperament frets to get closer, but a standard guitar is always a little off. Vocalists don't have frets, so they can tune to pure ratios. This is why barbershop quartets sound so locked in. They're singing the actual harmonic series intervals, not the equal temperament approximations.

## Tuning systems

Equal temperament is one option:

```
Just intonation:     pure ratios, sounds best in one key
Pythagorean tuning:  built on stacked 3:2 fifths
Mean-tone:           pure major thirds, narrower fifths
Equal temperament:   compromise, works in all keys
```

No perfect tuning, just tradeoffs.

## Beyond Western music

The harmonic series is physics. Every culture on earth is working with the same overtones. The octave (2:1) and fifth (3:2) show up almost everywhere. Pentatonic scales appear independently across cultures from China to West Africa to the Andes, probably because they're built from the simplest ratios.

Where cultures diverge is what they do beyond that. [Indian classical music](https://en.wikipedia.org/wiki/Indian_classical_music) uses [microtones](https://en.wikipedia.org/wiki/Microtonality) (shrutis) that sit between Western half steps, closer to just intonation ratios.

The physics is shared, but the choices about which ratios to use, which to ignore, and how to divide the octave are cultural. Western music landed on 12 equal half steps. That's one answer out of many.

## Further watching

["Melody is like the same thing as rhythm man" - an exploration of musical fractals by Adam Neely](https://www.youtube.com/watch?v=J98jwtm5U4E)

