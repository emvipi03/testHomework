import type { LessonCatalogItem } from '../types'

export const courseLessons: LessonCatalogItem[] = [
  {
    id: 'buttons-led-v1', number: 1, title: 'Buttons & LED Display', subtitle: 'Make a heart appear and disappear',
    description: 'Learn how events connect button presses to actions on the micro:bit display.', duration: '20–25 min', difficulty: 'Starter', icon: '♥', color: '#ff5f70', status: 'available', tags: ['Input', 'Basic'],
  },
  {
    id: 'light-sensor-v1', number: 2, title: 'Light Sensor', subtitle: 'Measure the light around you',
    description: 'Explore sensor values and create a light-aware micro:bit project.', duration: '25 min', difficulty: 'Explorer', icon: '☀', color: '#ffbf2f', status: 'coming-soon', tags: ['Input', 'Sensors'],
  },
  {
    id: 'loops-animation-v1', number: 3, title: 'Loops & Animation', subtitle: 'Bring pixel pictures to life',
    description: 'Repeat LED frames in sequence to create a tiny animated story.', duration: '25–30 min', difficulty: 'Explorer', icon: '↻', color: '#7850b4', status: 'coming-soon', tags: ['Loops', 'LED'],
  },
  {
    id: 'radio-messages-v1', number: 4, title: 'Radio Messages', subtitle: 'Send a signal to a friend',
    description: 'Discover wireless messages and make two micro:bits communicate.', duration: '30 min', difficulty: 'Challenge', icon: '⌁', color: '#1688d4', status: 'coming-soon', tags: ['Radio', 'Events'],
  },
]
