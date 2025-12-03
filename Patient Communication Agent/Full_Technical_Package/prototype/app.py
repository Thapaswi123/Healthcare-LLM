from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/messages', methods=['POST'])
def msg():
    data = request.json
    return jsonify({"status": "received", "data": data})

if __name__ == '__main__':
    app.run()
