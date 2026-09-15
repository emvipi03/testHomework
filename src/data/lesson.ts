import type { Lesson } from '../types'

export const lesson: Lesson = {
  id: 'buttons-led-v1',
  title: 'Nút nhấn và màn hình LED micro:bit',
  subtitle: 'Điều khiển trái tim bằng hai nút A và B',
  reviews: [
    {
      id: 'review-buttons', eyebrow: 'Thẻ 1 / 2', title: 'Nút A và nút B', illustration: 'buttons',
      body: 'micro:bit có hai nút nhấn ở mặt trước. Khối sự kiện “khi nút A được nhấn” chạy các lệnh bên trong mỗi lần em nhấn A.',
      tip: 'Sự kiện giống như người gác cổng: chỉ mở cửa khi đúng nút được nhấn.',
    },
    {
      id: 'review-led', eyebrow: 'Thẻ 2 / 2', title: 'Màn hình 25 đèn LED', illustration: 'led',
      body: 'Màn hình gồm 5 × 5 đèn. “Hiện biểu tượng” bật các LED theo hình có sẵn; “xóa màn hình” tắt toàn bộ LED.',
      tip: 'Hiện hình và xóa màn hình là hai hành động khác nhau.',
    },
  ],
  questions: [
    {
      id: 'q1', type: 'choice', weight: 1,
      prompt: 'Khối nào bắt đầu chạy lệnh khi em nhấn nút A?',
      options: [
        { id: 'a', text: 'Sự kiện nút A', block: { id: 'event-a', label: 'khi nút A được nhấn', kind: 'input', icon: 'A' } },
        { id: 'b', text: 'Xóa màn hình', block: { id: 'clear', label: 'xóa màn hình', kind: 'basic', icon: '×' } },
        { id: 'c', text: 'Tạm dừng', block: { id: 'pause', label: 'tạm dừng (ms) 100', kind: 'basic', icon: '⏱' } },
      ], correct: 'a', explanation: 'Khối sự kiện nút A lắng nghe thao tác nhấn A rồi mới chạy các lệnh nằm bên trong.',
    },
    {
      id: 'q2', type: 'choice', weight: 1,
      prompt: 'Muốn tắt toàn bộ 25 đèn LED, em dùng khối nào?',
      options: [
        { id: 'a', text: 'Hiện biểu tượng', block: { id: 'heart', label: 'hiện biểu tượng ♥', kind: 'basic', icon: '♥' } },
        { id: 'b', text: 'Xóa màn hình', block: { id: 'clear', label: 'xóa màn hình', kind: 'basic', icon: '×' } },
        { id: 'c', text: 'Nút B', block: { id: 'event-b', label: 'khi nút B được nhấn', kind: 'input', icon: 'B' } },
      ], correct: 'b', explanation: '“Xóa màn hình” tắt tất cả LED đang sáng trên lưới 5 × 5.',
    },
    {
      id: 'q3', type: 'choice', weight: 1,
      prompt: 'Để trái tim chỉ hiện sau khi nhấn A, khối “hiện biểu tượng ♥” đặt ở đâu?',
      options: [
        { id: 'a', text: 'Bên trong sự kiện nút A', block: { id: 'nested-a', label: 'A → hiện ♥', kind: 'input', icon: '♥' } },
        { id: 'b', text: 'Bên trong sự kiện nút B', block: { id: 'nested-b', label: 'B → hiện ♥', kind: 'input', icon: '♥' } },
        { id: 'c', text: 'Không cần sự kiện', block: { id: 'start', label: 'khi bắt đầu → hiện ♥', kind: 'event', icon: '▶' } },
      ], correct: 'a', explanation: 'Lệnh nằm trong sự kiện nào sẽ chạy khi sự kiện đó xảy ra; vì vậy “hiện ♥” phải nằm trong sự kiện nút A.',
    },
    {
      id: 'q4', type: 'match', weight: 2,
      prompt: 'Ghép mỗi khối với đúng chức năng.',
      blocks: [
        { id: 'show-heart', label: 'hiện biểu tượng ♥', kind: 'basic', icon: '♥' },
        { id: 'clear-screen', label: 'xóa màn hình', kind: 'basic', icon: '×' },
        { id: 'button-b', label: 'khi nút B được nhấn', kind: 'input', icon: 'B' },
      ],
      functions: [
        { id: 'f-clear', text: 'Tắt toàn bộ 25 đèn LED' },
        { id: 'f-heart', text: 'Hiện hình trái tim trên LED' },
        { id: 'f-event-b', text: 'Chạy lệnh khi người dùng nhấn B' },
      ],
      correct: { 'show-heart': 'f-heart', 'clear-screen': 'f-clear', 'button-b': 'f-event-b' },
      explanation: 'Khối màu tím điều khiển màn hình; khối màu xanh dương đậm là sự kiện đầu vào từ nút B.',
    },
    {
      id: 'q5', type: 'order', weight: 2,
      prompt: 'Sắp xếp theo thứ tự thực thi khi người dùng nhấn A.',
      items: [
        { id: 'wait-a', label: 'chờ nút A được nhấn', kind: 'input', icon: '1' },
        { id: 'run-handler', label: 'chạy các lệnh trong sự kiện A', kind: 'control', icon: '2' },
        { id: 'show-led', label: 'màn hình hiện trái tim', kind: 'basic', icon: '3' },
      ],
      correct: ['wait-a', 'run-handler', 'show-led'],
      explanation: 'micro:bit chờ tín hiệu nút A, kích hoạt phần lệnh của sự kiện, rồi thực hiện “hiện trái tim”.',
    },
    {
      id: 'q6', type: 'fill', weight: 3,
      prompt: 'Kéo khối còn thiếu vào sự kiện nút B để hoàn thành yêu cầu “nhấn B xóa LED”.',
      choices: [
        { id: 'clear', label: 'xóa màn hình', kind: 'basic', icon: '×' },
        { id: 'heart', label: 'hiện biểu tượng ♥', kind: 'basic', icon: '♥' },
        { id: 'pause', label: 'tạm dừng (ms) 100', kind: 'basic', icon: '⏱' },
      ],
      correct: 'clear', explanation: 'Sự kiện nút B cần chứa “xóa màn hình” để tắt toàn bộ LED ngay sau khi B được nhấn.',
    },
  ],
  practice: {
    title: 'Thử thách: Điều khiển trái tim',
    brief: 'Trong MakeCode, hãy tạo chương trình: nhấn A hiện trái tim, nhấn B xóa LED.',
    checklist: ['Tạo sự kiện “khi nút A được nhấn”', 'Đặt “hiện biểu tượng ♥” vào sự kiện A', 'Tạo sự kiện nút B và đặt “xóa màn hình” bên trong', 'Bấm A và B trên mô phỏng để tự kiểm tra'],
    starterCode: '// Hãy tạo hai sự kiện nút A và nút B ở chế độ Khối.\n',
  },
}
