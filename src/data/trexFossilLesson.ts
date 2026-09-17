import type { Lesson } from '../types'

export const trexFossilLesson: Lesson = {
  id: 'trex-fossil-v1',
  title: 'T-Rex & Fossil',
  subtitle: 'Explore a moving T-Rex model and code a fossil hunt',
  hero: {
    kicker: 'Mission 07 · T-Rex & Fossil',
    lines: ['Build the past.', 'Find the clues.', 'Code the hunt!'],
    description: 'Study the T-Rex model, discuss what fossils teach us, solve 5 challenges, and code a fossil counter in Microsoft MakeCode.',
    image: './assets/lessons/trex-fossil/completed-model.jpg',
    imageAlt: 'Completed T-Rex and fossil excavation model from the lesson plan',
  },
  reviews: [
    {
      id: 'review-model', eyebrow: 'Card 1 of 2', title: 'A model that moves',
      body: 'The T-Rex uses rotating axles and linked beams to turn motor rotation into repeated leg movement. Each connection must be secure while the joints remain free to pivot.',
      tip: 'A linkage passes motion from one moving part to another.',
      image: { src: './assets/lessons/trex-fossil/leg-linkage.jpg', alt: 'T-Rex leg linkage assembly from the model plan' },
    },
    {
      id: 'review-fossils', eyebrow: 'Card 2 of 2', title: 'Fossils are evidence',
      body: 'Fossils are preserved remains or traces of ancient living things. Scientists study their shapes, locations, and surrounding rock to learn about life and environments long ago.',
      tip: 'A fossil is a clue from the past—not a living dinosaur.',
      image: { src: './assets/lessons/trex-fossil/completed-model.jpg', alt: 'Completed T-Rex excavation model connected to a micro:bit' },
    },
  ],
  questions: [
    {
      id: 'trex-q1', type: 'choice', weight: 2,
      prompt: 'Discussion: What can a fossil help scientists understand?',
      options: [
        { id: 'a', text: 'Evidence about organisms and environments from long ago' },
        { id: 'b', text: 'The exact weather tomorrow' },
        { id: 'c', text: 'How to recharge a micro:bit battery' },
      ],
      correct: 'a', explanation: 'Fossils preserve remains or traces of past life, so they provide evidence about ancient organisms and their environments.',
    },
    {
      id: 'trex-q2', type: 'choice', weight: 2,
      prompt: 'Model discussion: Why must the T-Rex leg joints be able to pivot?',
      options: [
        { id: 'a', text: 'So the linked beams can transfer rotation into leg movement' },
        { id: 'b', text: 'So every piece stays completely fixed' },
        { id: 'c', text: 'Only to change the color of the model' },
      ],
      correct: 'a', explanation: 'The rotating axle pushes and pulls the linkage. Pivoting joints let that motion travel through the beams and move the legs.',
    },
    {
      id: 'trex-q3', type: 'choice', weight: 2,
      prompt: 'Coding: The variable “fossils” starts at 0. Which block records one new discovery?',
      options: [
        { id: 'a', text: 'Add one to the current total', block: { id: 'change-one', label: 'change fossils by 1', kind: 'control', icon: '+1' } },
        { id: 'b', text: 'Erase the total', block: { id: 'set-zero', label: 'set fossils to 0', kind: 'control', icon: '0' } },
        { id: 'c', text: 'Wait without changing it', block: { id: 'pause', label: 'pause (ms) 100', kind: 'basic', icon: '⏱' } },
      ],
      correct: 'a', explanation: '“Change fossils by 1” keeps the old total and adds one for the new fossil.',
    },
    {
      id: 'trex-q4', type: 'match', weight: 2,
      prompt: 'Match each block to its job in a fossil counter.',
      blocks: [
        { id: 'button-a', label: 'on button A pressed', kind: 'input', icon: 'A' },
        { id: 'change-fossils', label: 'change fossils by 1', kind: 'control', icon: '+1' },
        { id: 'show-fossils', label: 'show number fossils', kind: 'basic', icon: '123' },
      ],
      functions: [
        { id: 'f-event', text: 'Start when the explorer presses A' },
        { id: 'f-count', text: 'Increase the discovery total' },
        { id: 'f-display', text: 'Display the current total on the LEDs' },
      ],
      correct: { 'button-a': 'f-event', 'change-fossils': 'f-count', 'show-fossils': 'f-display' },
      explanation: 'The button creates the event, the variable block updates the stored total, and show number displays that total.',
    },
    {
      id: 'trex-q5', type: 'order', weight: 2,
      prompt: 'Put the blocks in order to record and display a fossil when A is pressed.',
      items: [
        { id: 'wait-a', label: 'on button A pressed', kind: 'input', icon: '1' },
        { id: 'add-one', label: 'change fossils by 1', kind: 'control', icon: '2' },
        { id: 'display-total', label: 'show number fossils', kind: 'basic', icon: '3' },
      ],
      correct: ['wait-a', 'add-one', 'display-total'],
      explanation: 'First the A event starts. Then the program increases the variable before displaying its new value.',
    },
  ],
  practice: {
    title: 'Challenge: Fossil Hunt Counter',
    brief: 'Build a Fossil Hunt Counter: press A to add and show one fossil; press B to reset the total to zero.',
    checklist: [
      'Create a variable named “fossils” and set it to 0 on start',
      'When button A is pressed, change fossils by 1',
      'Show the updated fossils number after every A press',
      'When button B is pressed, set fossils to 0 and show 0',
      'Test several discoveries and a reset in the simulator',
    ],
    starterCode: 'let fossils = 0\n// Add button A and button B events in Blocks mode.\n// A should count and show a discovery. B should reset the count.\n',
  },
}
