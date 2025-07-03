from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import random
import string
import cv2
import numpy as np
import pandas as pd
import base64
from tensorflow.keras.models import load_model
from werkzeug.security import generate_password_hash, check_password_hash
from googleapiclient.discovery import build
import time

app = Flask(__name__)
CORS(app)

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'tune_moods'
mysql = MySQL(app)

# Constants
model = load_model('best_model_over_70.h5')
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']
data = pd.read_csv('data_moods.csv')
quotes_data = pd.read_csv('quotes.csv')
api_key = 'AIzaSyBoaTNljQ-TQv9ZkduE0yDryjD3w18_kZw'  # Use your own API key
mood_column = 'mood'

# Utility
def generate_id():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=10))

def search_youtube(api_key, query):
    youtube = build('youtube', 'v3', developerKey=api_key)
    try:
        request = youtube.search().list(q=query, part='snippet', type='video', maxResults=1)
        response = request.execute()
        return response.get('items', [])
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

def get_songs_for_mood(mood, count=2):
    all_songs = data[data[mood_column] == mood][['name', 'artist']].values.tolist()
    random_songs = random.sample(all_songs, min(count, len(all_songs)))
    urls = []

    for song, artist in random_songs:
        query = f"{song} {artist}"
        results = search_youtube(api_key, query)
        if results:
            video_id = results[0]['id']['videoId']
            video_url = f'https://www.youtube.com/watch?v={video_id}'
            urls.append(video_url)
        time.sleep(1)
    return urls

def get_playlist_for_emotion(emotion):
    playlist = []
    if emotion == 'Angry':
        playlist += get_songs_for_mood('Calm')
        playlist += get_songs_for_mood('Happy')
        playlist += get_songs_for_mood('Energetic')
    elif emotion == 'Disgust':
        playlist += get_songs_for_mood('Happy')
        playlist += get_songs_for_mood('Energetic')
    elif emotion == 'Fear':
        playlist += get_songs_for_mood('Calm')
        playlist += get_songs_for_mood('Happy')
        playlist += get_songs_for_mood('Energetic')
    elif emotion == 'Happy':
        playlist += get_songs_for_mood('Happy')
        playlist += get_songs_for_mood('Energetic')
    elif emotion == 'Sad':
        playlist += get_songs_for_mood('Sad')
        playlist += get_songs_for_mood('Calm')
        playlist += get_songs_for_mood('Happy')
        playlist += get_songs_for_mood('Energetic')
    elif emotion == 'Surprise':
        playlist += get_songs_for_mood('Calm')
        playlist += get_songs_for_mood('Energetic')
    elif emotion == 'Neutral':
        playlist += get_songs_for_mood('Calm')
        playlist += get_songs_for_mood('Happy')
    return playlist[:4]

def get_quotes_for_mood(mood):
    return quotes_data[quotes_data['mood'] == mood]['quote'].tolist()

# Auth Routes
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user_id = generate_id()
    hashed_password = generate_password_hash(data['password'])
    
    cursor = mysql.connection.cursor()
    cursor.execute('''INSERT INTO users (id, first_name, last_name, email, password)
                      VALUES (%s, %s, %s, %s, %s)''',
                   (user_id, data['firstName'], data['lastName'], data['email'], hashed_password))
    mysql.connection.commit()
    cursor.close()
    return jsonify({'message': 'Signup successful'}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    cursor = mysql.connection.cursor()
    cursor.execute('''SELECT id, first_name, last_name, password FROM users WHERE email = %s''', (data['email'],))
    user = cursor.fetchone()
    cursor.close()

    if user and check_password_hash(user[3], data['password']):
        user_id, first_name, last_name = user[:3]
        return jsonify({'message': 'Login successful', 'user': {'id': user_id, 'firstName': first_name, 'lastName': last_name}}), 200
    return jsonify({'message': 'Invalid email or password'}), 401

# Favorites
@app.route('/favorite', methods=['POST'])
def favorite():
    data = request.get_json()
    cursor = mysql.connection.cursor()
    cursor.execute('''INSERT INTO favorites (user_id, video_url) VALUES (%s, %s)''',
                   (data['user_id'], data['video_url']))
    mysql.connection.commit()
    cursor.close()
    return jsonify({'message': 'Song added to favorites'}), 200

@app.route('/get_favorites/<user_id>', methods=['GET'])
def get_favorites(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute('''SELECT video_url FROM favorites WHERE user_id = %s''', (user_id,))
    favorites = cursor.fetchall()
    cursor.close()
    return jsonify({'favorites': [f[0] for f in favorites]}), 200

@app.route('/remove_favorite', methods=['POST'])
def remove_favorite():
    data = request.get_json()
    cursor = mysql.connection.cursor()
    cursor.execute('''DELETE FROM favorites WHERE user_id = %s AND video_url = %s''',
                   (data['user_id'], data['video_url']))
    mysql.connection.commit()
    cursor.close()
    return jsonify({'message': 'Song removed from favorites'}), 200

# Emotion Prediction
@app.route('/predict_emotion', methods=['POST'])
def predict_emotion():
    try:
        start_time = time.time()
        data = request.json
        img_data = base64.b64decode(data['image'])
        np_img = np.frombuffer(img_data, dtype=np.uint8)
        frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        if frame is None:
            return jsonify({'error': 'Invalid image data'}), 400

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.resize(gray, (480, 480))

        faces = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml').detectMultiScale(gray)

        if len(faces) == 0:
            return jsonify({'error': 'No face detected'}), 400

        (x, y, w, h) = faces[0]
        roi_gray = gray[y:y+h, x:x+w]

        if roi_gray.size == 0:
            return jsonify({'error': 'Detected face region is empty'}), 400

        roi_gray = cv2.resize(roi_gray, (48, 48))
        roi_gray = roi_gray.astype('float32') / 255
        roi_gray = np.expand_dims(roi_gray, axis=0)
        roi_gray = np.expand_dims(roi_gray, axis=-1)

        prediction = model.predict(roi_gray)
        max_index = int(np.argmax(prediction))
        predicted_emotion = emotion_labels[max_index]

        suggested_songs = get_playlist_for_emotion(predicted_emotion)
        mood_quotes = get_quotes_for_mood(predicted_emotion)

        # After prediction, before returning JSON response
        face_crop = frame[y:y+h, x:x+w]
        if face_crop is None or face_crop.size == 0:
            return jsonify({'error': 'Face crop is empty or invalid'}), 400

        success, buffer = cv2.imencode('.jpg', face_crop)
        if not success:
            return jsonify({'error': 'Failed to encode face image'}), 500

        face_image_base64 = base64.b64encode(buffer).decode('utf-8')


        return jsonify({
            'emotion': predicted_emotion,
            'songs': suggested_songs,
            'quotes': mood_quotes,
            'face_image': face_image_base64
        })
    except Exception as e:
        print(f"Error in emotion prediction: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
