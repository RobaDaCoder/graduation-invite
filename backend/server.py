from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

fake_db = [
    {
        "key": "n21q11t",
        "name": "Quốc Thái",
        "pronoun": "em iu",
        "note": "Em iu nhớ tới nhaaa!"
    },
    {
        "key": "l24d10p23l",
        "name": "Phúc Lâm",
        "pronoun": "bạn tôii",
        "note": "Có biết là kiếm hình m cực lắm không hả!!! Nhớ tới nhaaa!"
    },
    {
        "key": "l30n12l22c",
        "name": "Linh Chi",
        "pronoun": "péee",
        "note": "Kiếm lòi mắt k thấy hình bé lun á, nhớ tới nhaaa!"
    },
    {
        "key": "n23n12n23l",
        "name": "Nhật Linh",
        "pronoun": "bạn toii",
        "note": "Bạn toi nhớ tới chơi với toi nheee! Vác chòng bạn tới lun cũng đc =))"
    },
    {
        "key": "p31t12k22t",
        "name": "Kiều Trang",
        "pronoun": "chenn đanggg",
        "note": "Bạn ôi, nhớ tới nhooo! Hẹn gặp bạn ở ngày tốt nghiệp nhaaa!"
    }
]

@app.route("/api/check-message", methods=["POST"])
def check_message():
    data = request.get_json()
    message = data.get("message", "").lower()
    for entry in fake_db:
        if entry["key"].lower() in message:
            return jsonify({
                "fetch": True,
                "reply": ["I have found the appointment's information, please wait a second!","Tôi đã tìm thấy thông tin về cuộc hẹn, vui lòng chờ trong giây lát!"],
                "key": entry["key"],
                "name": entry["name"],
                "note": entry["note"],
                "pronoun": entry.get("pronoun", "")
            })
    return jsonify({
        "fetch": False,
        "reply": ["Seems like you haven't made an appointment yet, I will make one for you, please wait a moment!","Có vẻ như bạn chưa đặt lịch hẹn, tôi sẽ đặt lịch hẹn cho bạn, vui lòng chờ một chút!"],
        "key": "seeto",
        "name": "Những người mà Bảo iu quý",
        "note": "Rất mong gặp được cả nhà mình tại ngày tốt nghiệp của Bảo!",
        "pronoun": "cả nhà"
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
