import type { Lesson } from '../types'

export const lesson: Lesson = {
  id: 'buttons-led-v1',
  title: 'Buttons and the micro:bit LED Display',
  subtitle: 'Control a heart with buttons A and B',
  reviews: [
    {
      id: 'review-buttons', eyebrow: 'Card 1 of 2', title: 'Buttons A and B', illustration: 'buttons',
      body: 'The micro:bit has two buttons on its front. The “on button A pressed” event runs the blocks inside it every time you press A.',
      tip: 'An event is like a gatekeeper: it opens only when the correct button is pressed.',
    },
    {
      id: 'review-led', eyebrow: 'Card 2 of 2', title: 'The 25-LED display', illustration: 'led',
      body: 'The display has a 5 × 5 LED grid. “Show icon” lights LEDs in a ready-made pattern, while “clear screen” turns every LED off.',
      tip: 'Showing an icon and clearing the screen are two different actions.',
    },
  ],
  questions: [
    {
      id: 'q1', type: 'choice', weight: 1,
      prompt: 'Which block starts running code when you press button A?',
      options: [
        { id: 'a', text: 'Button A event', block: { id: 'event-a', label: 'on button A pressed', kind: 'input', icon: 'A' } },
        { id: 'b', text: 'Clear screen', block: { id: 'clear', label: 'clear screen', kind: 'basic', icon: '×' } },
        { id: 'c', text: 'Pause', block: { id: 'pause', label: 'pause (ms) 100', kind: 'basic', icon: '⏱' } },
      ], correct: 'a', explanation: 'The button A event listens for an A press, then runs the blocks placed inside it.',
    },
    {
      id: 'q2', type: 'choice', weight: 1,
      prompt: 'Which block turns off all 25 LEDs?',
      options: [
        { id: 'a', text: 'Show icon', block: { id: 'heart', label: 'show icon ♥', kind: 'basic', icon: '♥' } },
        { id: 'b', text: 'Clear screen', block: { id: 'clear', label: 'clear screen', kind: 'basic', icon: '×' } },
        { id: 'c', text: 'Button B event', block: { id: 'event-b', label: 'on button B pressed', kind: 'input', icon: 'B' } },
      ], correct: 'b', explanation: '“Clear screen” turns off every LED in the 5 × 5 grid.',
    },
    {
      id: 'q3', type: 'choice', weight: 1,
      prompt: 'Where should “show icon ♥” go so the heart appears only after A is pressed?',
      options: [
        { id: 'a', text: 'Inside the button A event', block: { id: 'nested-a', label: 'A → show ♥', kind: 'input', icon: '♥' } },
        { id: 'b', text: 'Inside the button B event', block: { id: 'nested-b', label: 'B → show ♥', kind: 'input', icon: '♥' } },
        { id: 'c', text: 'No event is needed', block: { id: 'start', label: 'on start → show ♥', kind: 'event', icon: '▶' } },
      ], correct: 'a', explanation: 'A block inside an event runs when that event happens, so “show ♥” belongs inside the button A event.',
    },
    {
      id: 'q4', type: 'match', weight: 2,
      prompt: 'Match each block to its correct job.',
      blocks: [
        { id: 'show-heart', label: 'show icon ♥', kind: 'basic', icon: '♥' },
        { id: 'clear-screen', label: 'clear screen', kind: 'basic', icon: '×' },
        { id: 'button-b', label: 'on button B pressed', kind: 'input', icon: 'B' },
      ],
      functions: [
        { id: 'f-clear', text: 'Turn off all 25 LEDs' },
        { id: 'f-heart', text: 'Show a heart on the LED display' },
        { id: 'f-event-b', text: 'Run code when the user presses B' },
      ],
      correct: { 'show-heart': 'f-heart', 'clear-screen': 'f-clear', 'button-b': 'f-event-b' },
      explanation: 'Purple blocks control the display; the dark blue block is an input event from button B.',
    },
    {
      id: 'q5', type: 'order', weight: 2,
      prompt: 'Put these steps in execution order when the user presses A.',
      items: [
        { id: 'wait-a', label: 'wait for button A press', kind: 'input', icon: '1' },
        { id: 'run-handler', label: 'run blocks inside event A', kind: 'control', icon: '2' },
        { id: 'show-led', label: 'display the heart', kind: 'basic', icon: '3' },
      ],
      correct: ['wait-a', 'run-handler', 'show-led'],
      explanation: 'The micro:bit waits for button A, activates the event handler, then runs “show heart”.',
    },
    {
      id: 'q6', type: 'fill', weight: 3,
      prompt: 'Drag the missing block into button B to complete “press B to clear the LEDs”.',
      choices: [
        { id: 'clear', label: 'clear screen', kind: 'basic', icon: '×' },
        { id: 'heart', label: 'show icon ♥', kind: 'basic', icon: '♥' },
        { id: 'pause', label: 'pause (ms) 100', kind: 'basic', icon: '⏱' },
      ],
      correct: 'clear', explanation: 'The button B event needs “clear screen” inside it to turn every LED off after B is pressed.',
    },
  ],
  practice: {
    title: 'Challenge: Control the heart',
    brief: 'In MakeCode, build a program that shows a heart when A is pressed and clears the LEDs when B is pressed.',
    checklist: ['Create an “on button A pressed” event', 'Place “show icon ♥” inside the A event', 'Create a button B event and put “clear screen” inside', 'Press A and B in the simulator to test your program'],
    starterCode: '// Create two events for buttons A and B in Blocks mode.\n',
  },
}
