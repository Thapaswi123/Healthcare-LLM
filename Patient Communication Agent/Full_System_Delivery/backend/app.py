from flask import Flask, request, jsonify
app = Flask(__name__)
@app.route('/messages', methods=['POST'])
def msg():
    return jsonify({"received": request.json})
if __name__ == '__main__':
    app.run(host='0.0.0.0')