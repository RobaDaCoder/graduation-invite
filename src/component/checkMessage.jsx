const fake_db = [
  {
    key: "n21q11t",
    name: "Quốc Thái",
    pronoun: "em iu",
    note: "Em iu nhớ tới nhaaa!"
  },
  {
    key: "l24d10p23l",
    name: "Phúc Lâm",
    pronoun: "bạn tôii",
    note: "Có biết là kiếm hình m cực lắm không hả!!! Nhớ tới nhaaa!"
  },
  {
    key: "l30n12l22c",
    name: "Linh Chi",
    pronoun: "péee",
    note: "Kiếm lòi mắt k thấy hình bé lun á, nhớ tới nhaaa!"
  },
  {
    key: "n23n12n23l",
    name: "Nhật Linh",
    pronoun: "bạn toii",
    note: "Bạn toi nhớ tới chơi với toi nheee! Vác chòng bạn tới lun cũng đc =))"
  },
  {
    key: "p31t12k22t",
    name: "Kiều Trang",
    pronoun: "chenn đanggg",
    note: "Bạn ôi, nhớ tới nhooo! Hẹn gặp bạn ở ngày tốt nghiệp nhaaa!"
  }
];

export function checkMessage(message) {
  const lowerMessage = (message || "").toLowerCase();
  for (const entry of fake_db) {
    if (lowerMessage.includes(entry.key.toLowerCase())) {
      return {
        fetch: true,
        reply: [
          "I have found the appointment's information, please wait a second!",
          "Tôi đã tìm thấy thông tin về cuộc hẹn, vui lòng chờ trong giây lát!"
        ],
        key: entry.key,
        name: entry.name,
        note: entry.note,
        pronoun: entry.pronoun || ""
      };
    }
  }
  return {
    fetch: false,
    reply: [
      "Seems like you haven't made an appointment yet, I will make one for you, please wait a moment!",
      "Có vẻ như bạn chưa đặt lịch hẹn, tôi sẽ đặt lịch hẹn cho bạn, vui lòng chờ một chút!"
    ],
    key: "seeto",
    name: "Những người mà Bảo iu quý",
    note: "Rất mong gặp được cả nhà mình tại ngày tốt nghiệp của Bảo!",
    pronoun: "cả nhà"
  };
}